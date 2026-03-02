const express = require('express');
const router = express.Router();
const { sendPasswordResetEmail, isEmailConfigured } = require('../utils/emailService');

// @route   POST /api/test-email
// @desc    Test email service (for debugging only)
// @access  Public (should be protected in production)
router.post('/', async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    console.log('🧪 Testing email service...');
    console.log('📧 Target email:', email);
    console.log('📧 Email configured:', isEmailConfigured());

    if (!isEmailConfigured()) {
      return res.json({
        success: false,
        message: 'Email service is not configured',
        config: {
          EMAIL_USER: process.env.EMAIL_USER ? '✅ Set' : '❌ Not set',
          EMAIL_APP_PASSWORD: process.env.EMAIL_APP_PASSWORD ? '✅ Set' : '❌ Not set',
          passwordLength: process.env.EMAIL_APP_PASSWORD ? process.env.EMAIL_APP_PASSWORD.length : 0
        }
      });
    }

    // Generate a test token
    const testToken = 'test-token-' + Date.now();

    // Try to send email
    const result = await sendPasswordResetEmail(
      email,
      name || 'Test User',
      testToken
    );

    if (result.success) {
      return res.json({
        success: true,
        message: 'Test email sent successfully!',
        messageId: result.messageId,
        config: {
          EMAIL_USER: process.env.EMAIL_USER,
          passwordLength: process.env.EMAIL_APP_PASSWORD.length
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Failed to send test email',
        error: result.error,
        config: {
          EMAIL_USER: process.env.EMAIL_USER,
          passwordLength: process.env.EMAIL_APP_PASSWORD.length
        }
      });
    }

  } catch (error) {
    console.error('❌ Test email error:', error);
    res.status(500).json({
      success: false,
      message: 'Error testing email service',
      error: error.message,
      stack: error.stack
    });
  }
});

module.exports = router;
