const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const { protect, adminOnly } = require('../middleware/auth');

// @route   GET /api/reviews
// @desc    Get all reviews
// @access  Public
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/reviews/:id
// @desc    Get single review
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('userId', 'name email');
    
    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: 'Review not found' 
      });
    }
    
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/reviews
// @desc    Create new review
// @access  Private (User must be logged in)
router.post('/', protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;
    
    if (!rating || !comment) {
      return res.status(400).json({ 
        success: false, 
        message: 'Rating and comment are required' 
      });
    }

    const newReview = new Review({
      userId: req.user._id,
      name: req.user.name,
      email: req.user.email,
      rating,
      comment
    });

    await newReview.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Review submitted successfully',
      data: newReview 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/reviews/:id/reply
// @desc    Add admin reply to review
// @access  Private (Admin only)
router.put('/:id/reply', protect, adminOnly, async (req, res) => {
  try {
    const { adminReply } = req.body;
    
    if (!adminReply) {
      return res.status(400).json({ 
        success: false, 
        message: 'Admin reply is required' 
      });
    }

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { 
        adminReply,
        repliedAt: new Date()
      },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: 'Review not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Reply added successfully',
      data: review 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete review
// @access  Private (Admin only)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    
    if (!review) {
      return res.status(404).json({ 
        success: false, 
        message: 'Review not found' 
      });
    }

    res.json({ 
      success: true, 
      message: 'Review deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
