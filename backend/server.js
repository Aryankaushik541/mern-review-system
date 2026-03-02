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

// Connect to MongoDB with better error handling
let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = db.connections[0].readyState === 1;
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.log('❌ MongoDB Connection Error:', err);
    throw err;
  }
};

// Connect to database
connectDB();

// Import Routes
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/reviews');
const adminRoutes = require('./routes/admin');
const testEmailRoutes = require('./routes/test-email');
const { isEmailConfigured } = require('./utils/emailService');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/test-email', testEmailRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Email configuration check
app.get('/api/config/email', (req, res) => {
  const emailConfigured = isEmailConfigured();
  res.json({
    success: true,
    emailConfigured,
    message: emailConfigured 
      ? 'Email service is configured and ready' 
      : 'Email service is not configured. Set EMAIL_USER and EMAIL_APP_PASSWORD environment variables.',
    config: {
      EMAIL_USER: process.env.EMAIL_USER ? '✅ Set' : '❌ Not set',
      EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD ? '✅ Set' : '❌ Not set',
      FRONTEND_URL: process.env.FRONTEND_URL || 'Not set (using default)'
    }
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    success: true, 
    message: 'MERN Review System API',
    version: '2.0.0',
    endpoints: {
      health: '/api/health',
      emailConfig: '/api/config/email',
      testEmail: '/api/test-email',
      auth: '/api/auth',
      reviews: '/api/reviews',
      admin: '/api/admin'
    },
    features: {
      authentication: '✅ JWT-based auth',
      reviews: '✅ CRUD operations',
      nestedComments: '✅ Unlimited depth',
      starRatings: '✅ 1-5 stars',
      adminDashboard: '✅ Full management',
      emailService: isEmailConfigured() ? '✅ Configured' : '⚠️ Not configured'
    }
  });
});

// For Vercel serverless
if (process.env.VERCEL) {
  module.exports = app;
} else {
  // For local development
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📧 Email service: ${isEmailConfigured() ? '✅ Configured' : '⚠️ Not configured'}`);
  });
}
