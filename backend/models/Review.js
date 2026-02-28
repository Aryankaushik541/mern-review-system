const mongoose = require('mongoose');

// Reply schema for nested comments (Reddit/Facebook style)
const replySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: {
    type: String,
    required: true
  },
  userEmail: {
    type: String,
    required: true
  },
  userRole: {
    type: String,
    enum: ['user', 'admin'],
    required: true
  },
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, 'Reply cannot be empty']
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isEdited: {
    type: Boolean,
    default: false
  }
});

const reviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  comment: {
    type: String,
    required: [true, 'Comment is required'],
    trim: true,
    minlength: [10, 'Comment must be at least 10 characters']
  },
  // Source of the review (local or booking.com)
  source: {
    type: String,
    enum: ['local', 'booking.com'],
    default: 'local'
  },
  // External ID for Booking.com reviews
  externalId: {
    type: String,
    default: null
  },
  // Additional Booking.com specific data
  bookingData: {
    originalScore: Number,
    positiveText: String,
    negativeText: String,
    stayDate: Date,
    reviewDate: Date,
    roomType: String,
    tripType: String,
    country: String
  },
  // Nested replies array (unlimited replies)
  replies: [replySchema],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isEdited: {
    type: Boolean,
    default: false
  }
});

// Update the updatedAt timestamp before saving
reviewSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Review', reviewSchema);
