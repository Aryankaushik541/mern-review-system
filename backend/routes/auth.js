const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const { auth } = require('../middleware/auth');
const { sendWelcomeEmail, sendPasswordResetEmail, sendPasswordResetConfirmation, isEmailConfigured } = require('../utils/emailService');

// Generate JWT token
const generateToken = (userId) => {
  const secret = process.env.JWT_SECRET;
  
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables');
  }
  
  return jwt.sign({ userId }, secret, {
    expiresIn: '30d'
  });
};

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'User already exists with this email'
      });
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      role: role || 'user',
      isActive: true,
      loginCount: 0
    });

    await user.save();

    // Send welcome email (don't wait for it)
    if (isEmailConfigured()) {
      sendWelcomeEmail(user.email, user.name).catch(err => 
        console.error('Failed to send welcome email:', err)
      );
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: {
        token,
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration',
      error: error.message
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update login info
    await user.updateLoginInfo();

    // Generate token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        userId: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during login',
      error: error.message
    });
  }
});

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    console.log('📧 Forgot password request for:', email);

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    console.log('👤 User found:', user ? 'Yes' : 'No');

    if (!user) {
      // Don't reveal if user exists or not for security
      console.log('⚠️ User not found, returning generic success message');
      return res.json({
        success: true,
        message: 'If an account exists with this email, a password reset link has been sent.'
      });
    }

    // Generate reset token
    const resetToken = user.generatePasswordResetToken();
    await user.save();

    console.log('🔑 Reset token generated for user:', user.email);

    // Check if email is configured
    if (!isEmailConfigured()) {
      console.log('⚠️ Email service not configured');
      return res.json({
        success: true,
        message: 'Password reset token generated successfully.',
        warning: 'Email service is not configured. Please contact administrator for password reset.',
        // Only show token in development
        ...(process.env.NODE_ENV === 'development' && { resetToken })
      });
    }

    // Try to send password reset email
    try {
      console.log('📤 Attempting to send email to:', user.email);
      const emailResult = await sendPasswordResetEmail(user.email, user.name, resetToken);

      console.log('📧 Email send result:', emailResult);

      if (!emailResult.success) {
        console.error('❌ Email service error:', emailResult.error);
        
        return res.json({
          success: true,
          message: 'Password reset requested.',
          warning: 'Email delivery is currently experiencing issues. Please try again later or contact support.',
          // Only show token in development
          ...(process.env.NODE_ENV === 'development' && { resetToken })
        });
      }

      console.log('✅ Password reset email sent successfully');
      res.json({
        success: true,
        message: 'Password reset link has been sent to your email.'
      });
    } catch (emailError) {
      console.error('❌ Email sending failed:', emailError);
      
      // Still return success to not reveal if user exists
      res.json({
        success: true,
        message: 'Password reset requested.',
        warning: 'Email service is currently unavailable. Please try again later.',
        // Only show token in development
        ...(process.env.NODE_ENV === 'development' && { resetToken })
      });
    }

  } catch (error) {
    console.error('❌ Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
});

// @route   POST /api/auth/reset-password/:token
// @desc    Reset password with token
// @access  Public
router.post('/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters long'
      });
    }

    // Hash the token from URL
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    // Find user with valid reset token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired password reset token'
      });
    }

    // Set new password
    user.password = password;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    // Send confirmation email (don't wait for it)
    if (isEmailConfigured()) {
      sendPasswordResetConfirmation(user.email, user.name).catch(err =>
        console.error('Failed to send confirmation email:', err)
      );
    }

    res.json({
      success: true,
      message: 'Password has been reset successfully. You can now login with your new password.'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
      error: error.message
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

module.exports = router;
