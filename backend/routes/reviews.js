const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { auth, isAdmin } = require('../middleware/auth');
const { fetchBookingReviews, mergeReviews, getBookingStats } = require('../utils/bookingApiService');

// @route   GET /api/reviews
// @desc    Get all reviews (LOCAL + BOOKING.COM merged)
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Fetch local reviews from database
    const localReviews = await Review.find()
      .sort({ createdAt: -1 });

    // Get hotel ID from environment or query parameter
    const hotelId = process.env.BOOKING_HOTEL_ID || req.query.hotelId;

    let allReviews = localReviews;
    let bookingStats = null;

    // If hotel ID is configured, fetch Booking.com reviews
    if (hotelId) {
      const bookingResult = await fetchBookingReviews(hotelId);
      
      if (bookingResult.success && bookingResult.data.length > 0) {
        // Merge Booking.com reviews with local reviews
        allReviews = mergeReviews(localReviews, bookingResult.data);
        bookingStats = getBookingStats(bookingResult.data);
      }
    }

    res.json({
      success: true,
      count: allReviews.length,
      data: allReviews,
      stats: {
        local: localReviews.length,
        booking: bookingStats ? bookingStats.totalReviews : 0,
        total: allReviews.length
      },
      bookingStats: bookingStats
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/reviews/booking/:hotelId
// @desc    Get only Booking.com reviews for specific hotel
// @access  Public
router.get('/booking/:hotelId', async (req, res) => {
  try {
    const { hotelId } = req.params;
    
    const bookingResult = await fetchBookingReviews(hotelId);
    
    if (!bookingResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch Booking.com reviews',
        error: bookingResult.error
      });
    }

    const stats = getBookingStats(bookingResult.data);

    res.json({
      success: true,
      count: bookingResult.data.length,
      data: bookingResult.data,
      stats: stats
    });
  } catch (error) {
    console.error('Error fetching Booking.com reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   GET /api/reviews/:id
// @desc    Get single review
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      data: review
    });
  } catch (error) {
    console.error('Error fetching review:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/reviews
// @desc    Create a new review (requires login)
// @access  Private (User)
router.post('/', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    // Validation
    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide rating and comment'
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    if (comment.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Comment must be at least 10 characters'
      });
    }

    // Create review
    const review = new Review({
      userId: req.user._id,
      name: req.user.name,
      email: req.user.email,
      rating,
      comment,
      source: 'local', // Mark as local review
      replies: []
    });

    await review.save();

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: review
    });
  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/reviews/:id
// @desc    Update a review (Admin can edit any, User can edit own)
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Cannot edit Booking.com reviews
    if (review.source === 'booking.com') {
      return res.status(403).json({
        success: false,
        message: 'Cannot edit Booking.com reviews'
      });
    }

    // Check if user is admin or review owner
    if (req.user.role !== 'admin' && review.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to edit this review'
      });
    }

    // Update fields
    if (rating) {
      if (rating < 1 || rating > 5) {
        return res.status(400).json({
          success: false,
          message: 'Rating must be between 1 and 5'
        });
      }
      review.rating = rating;
    }

    if (comment) {
      if (comment.trim().length < 10) {
        return res.status(400).json({
          success: false,
          message: 'Comment must be at least 10 characters'
        });
      }
      review.comment = comment;
    }

    review.isEdited = true;
    review.updatedAt = Date.now();

    await review.save();

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: review
    });
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/reviews/:id/reply
// @desc    Add a reply to a review (Works for BOTH local and Booking.com reviews)
// @access  Private (Any logged-in user)
router.post('/:id/reply', auth, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Reply text is required'
      });
    }

    // For Booking.com reviews, we need to handle differently
    // Check if this is a Booking.com review ID format
    const reviewId = req.params.id;
    
    // Try to find in local database first
    let review = await Review.findById(reviewId);

    // If not found and looks like a Booking.com ID, create a placeholder
    if (!review && reviewId.startsWith('booking_')) {
      // Create a temporary review entry to store replies for Booking.com reviews
      review = new Review({
        _id: reviewId,
        userId: 'booking_user',
        name: 'Booking.com Guest',
        email: 'booking@guest.com',
        rating: 0,
        comment: '[Booking.com Review - See original on Booking.com]',
        source: 'booking.com',
        externalId: reviewId,
        replies: []
      });
    }

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Add reply to the review
    const newReply = {
      userId: req.user._id,
      userName: req.user.name,
      userEmail: req.user.email,
      userRole: req.user.role,
      text: text.trim(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      isEdited: false
    };

    review.replies.push(newReply);
    await review.save();

    res.json({
      success: true,
      message: 'Reply added successfully',
      data: review
    });
  } catch (error) {
    console.error('Error adding reply:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   PUT /api/reviews/:reviewId/reply/:replyId
// @desc    Edit a reply (Admin can edit any, User can edit own)
// @access  Private
router.put('/:reviewId/reply/:replyId', auth, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Reply text is required'
      });
    }

    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    const reply = review.replies.id(req.params.replyId);

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: 'Reply not found'
      });
    }

    // Check if user is admin or reply owner
    if (req.user.role !== 'admin' && reply.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to edit this reply'
      });
    }

    reply.text = text.trim();
    reply.isEdited = true;
    reply.updatedAt = Date.now();

    await review.save();

    res.json({
      success: true,
      message: 'Reply updated successfully',
      data: review
    });
  } catch (error) {
    console.error('Error updating reply:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/reviews/:reviewId/reply/:replyId
// @desc    Delete a reply (Admin can delete any, User can delete own)
// @access  Private
router.delete('/:reviewId/reply/:replyId', auth, async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    const reply = review.replies.id(req.params.replyId);

    if (!reply) {
      return res.status(404).json({
        success: false,
        message: 'Reply not found'
      });
    }

    // Check if user is admin or reply owner
    if (req.user.role !== 'admin' && reply.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this reply'
      });
    }

    reply.remove();
    await review.save();

    res.json({
      success: true,
      message: 'Reply deleted successfully',
      data: review
    });
  } catch (error) {
    console.error('Error deleting reply:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete a review (Admin only, cannot delete Booking.com reviews)
// @access  Private (Admin)
router.delete('/:id', auth, isAdmin, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Cannot delete Booking.com reviews
    if (review.source === 'booking.com') {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete Booking.com reviews'
      });
    }

    await review.deleteOne();

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
