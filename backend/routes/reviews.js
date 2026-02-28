const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { auth, isAdmin } = require('../middleware/auth');
const { fetchBookingReviews, mergeReviews, getBookingStats } = require('../utils/bookingApiService');

// @route   GET /api/reviews
// @desc    Get ONLY Booking.com reviews (local reviews disabled)
// @access  Public
router.get('/', async (req, res) => {
  try {
    // Get hotel ID from environment or query parameter
    const hotelId = process.env.BOOKING_HOTEL_ID || req.query.hotelId;

    if (!hotelId) {
      return res.status(400).json({
        success: false,
        message: 'Hotel ID not configured. Please set BOOKING_HOTEL_ID in environment variables.'
      });
    }

    // Fetch ONLY Booking.com reviews
    const bookingResult = await fetchBookingReviews(hotelId);
    
    if (!bookingResult.success) {
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch Booking.com reviews',
        error: bookingResult.error,
        data: []
      });
    }

    const bookingStats = getBookingStats(bookingResult.data);

    res.json({
      success: true,
      count: bookingResult.data.length,
      data: bookingResult.data,
      stats: {
        total: bookingResult.data.length,
        source: 'booking.com'
      },
      bookingStats: bookingStats
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
      data: []
    });
  }
});

// @route   GET /api/reviews/booking/:hotelId
// @desc    Get Booking.com reviews for specific hotel
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
// @desc    Get single review (from Booking.com or database)
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const reviewId = req.params.id;
    
    // Check if it's a Booking.com review ID
    if (reviewId.startsWith('booking_')) {
      // Fetch from Booking.com API
      const hotelId = process.env.BOOKING_HOTEL_ID;
      if (!hotelId) {
        return res.status(400).json({
          success: false,
          message: 'Hotel ID not configured'
        });
      }

      const bookingResult = await fetchBookingReviews(hotelId);
      if (bookingResult.success) {
        const review = bookingResult.data.find(r => r._id === reviewId);
        if (review) {
          return res.json({
            success: true,
            data: review
          });
        }
      }
    }

    // Try to find in database (for replies storage)
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

// @route   POST /api/reviews/:id/reply
// @desc    Add a reply to a Booking.com review
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

    const reviewId = req.params.id;
    
    // For Booking.com reviews, create/update database entry to store replies
    let review = await Review.findOne({ externalId: reviewId });

    // If not found, create a placeholder entry for Booking.com review
    if (!review) {
      // Fetch the actual review from Booking.com to get details
      const hotelId = process.env.BOOKING_HOTEL_ID;
      const bookingResult = await fetchBookingReviews(hotelId);
      
      let bookingReview = null;
      if (bookingResult.success) {
        bookingReview = bookingResult.data.find(r => r._id === reviewId || r.externalId === reviewId);
      }

      if (!bookingReview) {
        return res.status(404).json({
          success: false,
          message: 'Review not found'
        });
      }

      // Create database entry for this Booking.com review to store replies
      review = new Review({
        userId: 'booking_user',
        name: bookingReview.name || 'Booking.com Guest',
        email: 'booking@guest.com',
        rating: bookingReview.rating || 3,
        comment: bookingReview.comment || '[Booking.com Review]',
        source: 'booking.com',
        externalId: reviewId,
        bookingData: bookingReview.bookingData || {},
        replies: []
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

    // Find by externalId for Booking.com reviews
    const review = await Review.findOne({ 
      $or: [
        { _id: req.params.reviewId },
        { externalId: req.params.reviewId }
      ]
    });

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
    // Find by externalId for Booking.com reviews
    const review = await Review.findOne({ 
      $or: [
        { _id: req.params.reviewId },
        { externalId: req.params.reviewId }
      ]
    });

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

// @route   GET /api/reviews/:reviewId/replies
// @desc    Get all replies for a specific review
// @access  Public
router.get('/:reviewId/replies', async (req, res) => {
  try {
    // Find by externalId for Booking.com reviews
    const review = await Review.findOne({ 
      $or: [
        { _id: req.params.reviewId },
        { externalId: req.params.reviewId }
      ]
    });

    if (!review) {
      return res.json({
        success: true,
        count: 0,
        data: []
      });
    }

    res.json({
      success: true,
      count: review.replies.length,
      data: review.replies
    });
  } catch (error) {
    console.error('Error fetching replies:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
