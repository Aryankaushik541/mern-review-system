const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/review-system';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// Review Schema
const reviewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  adminReply: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  repliedAt: {
    type: Date
  }
});

const Review = mongoose.model('Review', reviewSchema);

// Routes

// Get all reviews
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get single review
app.get('/api/reviews/:id', async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }
    res.json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Create new review
app.post('/api/reviews', async (req, res) => {
  try {
    const { name, email, rating, comment } = req.body;
    
    if (!name || !email || !rating || !comment) {
      return res.status(400).json({ 
        success: false, 
        message: 'All fields are required' 
      });
    }

    const newReview = new Review({
      name,
      email,
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

// Update review with admin reply
app.put('/api/reviews/:id/reply', async (req, res) => {
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
      return res.status(404).json({ success: false, message: 'Review not found' });
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

// Delete review
app.delete('/api/reviews/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    
    if (!review) {
      return res.status(404).json({ success: false, message: 'Review not found' });
    }

    res.json({ 
      success: true, 
      message: 'Review deleted successfully' 
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});