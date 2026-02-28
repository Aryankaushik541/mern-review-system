const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });
};

// Send welcome email on signup
const sendWelcomeEmail = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Review System" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: '🎉 Welcome to Review System!',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome to Review System!</h1>
            </div>
            <div class="content">
              <h2>Hello ${userName}! 👋</h2>
              <p>Thank you for joining our Review System. We're excited to have you on board!</p>
              
              <p><strong>What you can do:</strong></p>
              <ul>
                <li>✍️ Write and share your reviews</li>
                <li>⭐ Rate products and services</li>
                <li>💬 Reply to other reviews</li>
                <li>📊 Track your review history</li>
              </ul>
              
              <p>Get started by logging in and sharing your first review!</p>
              
              <a href="${process.env.CLIENT_URL}/login" class="button">Login Now</a>
              
              <p>If you have any questions, feel free to reach out to us.</p>
              
              <p>Best regards,<br>Review System Team</p>
            </div>
            <div class="footer">
              <p>This email was sent to ${userEmail}</p>
              <p>&copy; 2024 Review System. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent to:', userEmail);
    return { success: true };
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return { success: false, error: error.message };
  }
};

// Send password reset email
const sendPasswordResetEmail = async (userEmail, userName, resetToken) => {
  try {
    const transporter = createTransporter();
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    
    const mailOptions = {
      from: `"Review System" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: '🔐 Password Reset Request',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #f5576c; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .warning { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🔐 Password Reset Request</h1>
            </div>
            <div class="content">
              <h2>Hello ${userName}! 👋</h2>
              <p>We received a request to reset your password for your Review System account.</p>
              
              <p>Click the button below to reset your password:</p>
              
              <a href="${resetUrl}" class="button">Reset Password</a>
              
              <p>Or copy and paste this link in your browser:</p>
              <p style="background: #fff; padding: 10px; border: 1px solid #ddd; word-break: break-all;">${resetUrl}</p>
              
              <div class="warning">
                <strong>⚠️ Important:</strong>
                <ul>
                  <li>This link will expire in <strong>10 minutes</strong></li>
                  <li>If you didn't request this, please ignore this email</li>
                  <li>Your password won't change until you create a new one</li>
                </ul>
              </div>
              
              <p>Best regards,<br>Review System Team</p>
            </div>
            <div class="footer">
              <p>This email was sent to ${userEmail}</p>
              <p>&copy; 2024 Review System. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset email sent to:', userEmail);
    return { success: true };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error: error.message };
  }
};

// Send password reset confirmation email
const sendPasswordResetConfirmation = async (userEmail, userName) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"Review System" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: '✅ Password Successfully Reset',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #11998e; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✅ Password Reset Successful</h1>
            </div>
            <div class="content">
              <h2>Hello ${userName}! 👋</h2>
              <p>Your password has been successfully reset.</p>
              
              <p>You can now login with your new password.</p>
              
              <a href="${process.env.CLIENT_URL}/login" class="button">Login Now</a>
              
              <p><strong>⚠️ Security Notice:</strong><br>
              If you didn't make this change, please contact us immediately.</p>
              
              <p>Best regards,<br>Review System Team</p>
            </div>
            <div class="footer">
              <p>This email was sent to ${userEmail}</p>
              <p>&copy; 2024 Review System. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Password reset confirmation sent to:', userEmail);
    return { success: true };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendPasswordResetConfirmation
};
