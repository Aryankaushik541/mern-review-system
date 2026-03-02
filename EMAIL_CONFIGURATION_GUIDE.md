# 📧 Email Configuration Guide

This guide will help you set up email functionality for password reset and welcome emails in your MERN Review System.

## 🎯 Overview

The system uses **Gmail SMTP** to send emails. You need to:
1. Use a Gmail account
2. Generate an App Password (not your regular Gmail password)
3. Add credentials to your `.env` file

---

## 📝 Step-by-Step Setup

### Step 1: Prepare Your Gmail Account

1. **Use an existing Gmail account** or create a new one
2. **Enable 2-Factor Authentication** (required for App Passwords)
   - Go to: https://myaccount.google.com/security
   - Click on "2-Step Verification"
   - Follow the setup process

### Step 2: Generate App Password

1. Go to: https://myaccount.google.com/apppasswords
2. You might need to sign in again
3. In the "Select app" dropdown, choose **"Mail"**
4. In the "Select device" dropdown, choose **"Other (Custom name)"**
5. Enter a name like: **"MERN Review System"**
6. Click **"Generate"**
7. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)
8. **IMPORTANT**: Remove all spaces from the password before using it

### Step 3: Update Backend .env File

Open `backend/.env` and update these lines:

```env
# Email Configuration (Gmail)
EMAIL_USER=your-actual-email@gmail.com
EMAIL_APP_PASSWORD=abcdefghijklmnop
```

**Example:**
```env
EMAIL_USER=john.doe@gmail.com
EMAIL_APP_PASSWORD=abcdefghijklmnop
```

⚠️ **Important Notes:**
- Use your **actual Gmail address** for `EMAIL_USER`
- Use the **16-character App Password** (without spaces) for `EMAIL_APP_PASSWORD`
- **DO NOT** use your regular Gmail password
- **DO NOT** commit this file to GitHub (it's in .gitignore)

### Step 4: Set Frontend URL

Make sure your `FRONTEND_URL` is set correctly in `backend/.env`:

```env
# For local development
FRONTEND_URL=http://localhost:3000

# For production (Vercel)
FRONTEND_URL=https://booking-review-system.vercel.app
```

### Step 5: Test Email Functionality

1. **Restart your backend server** (important!)
   ```bash
   cd backend
   npm start
   ```

2. **Test password reset:**
   - Go to your frontend
   - Click "Forgot Password"
   - Enter a registered email address
   - Check the email inbox for the reset link

---

## 🔧 Environment Variables Reference

Here's the complete email configuration section for your `backend/.env`:

```env
# Frontend URL (for password reset links)
FRONTEND_URL=https://booking-review-system.vercel.app

# Email Configuration (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-16-character-app-password
```

---

## ✅ How It Works

### Password Reset Flow:

1. **User requests password reset** → Enters their email on forgot password page
2. **Backend generates reset token** → Creates a unique, time-limited token
3. **Email sent to USER's email** → Reset link sent to the email they entered
4. **User clicks link** → Opens reset password page with token
5. **User sets new password** → Password updated in database
6. **Confirmation email sent** → User receives confirmation

### Email Types:

1. **Welcome Email** - Sent when user registers
2. **Password Reset Email** - Sent when user requests password reset
3. **Password Reset Confirmation** - Sent after successful password reset

---

## 🚨 Troubleshooting

### "Email service is not configured"

**Problem:** `EMAIL_USER` or `EMAIL_APP_PASSWORD` is missing

**Solution:**
1. Check `backend/.env` file
2. Make sure both variables are set
3. Restart backend server

### "Email delivery failed"

**Problem:** Invalid credentials or Gmail blocking

**Solutions:**
1. **Verify App Password:**
   - Make sure you're using App Password, not regular password
   - Remove all spaces from the password
   - Generate a new App Password if needed

2. **Check 2FA:**
   - Ensure 2-Factor Authentication is enabled on your Gmail

3. **Check Gmail Settings:**
   - Go to: https://myaccount.google.com/lesssecureapps
   - Make sure "Less secure app access" is OFF (we use App Passwords instead)

4. **Check for Gmail blocks:**
   - Check your Gmail inbox for security alerts
   - You might need to verify it's you trying to send emails

### "Invalid or expired token"

**Problem:** Reset link expired (10 minutes) or already used

**Solution:**
- Request a new password reset link
- Use the link within 10 minutes

### Email not received

**Possible causes:**
1. **Check spam folder** - Gmail might filter it
2. **Wrong email address** - Verify the email is correct
3. **Email quota exceeded** - Gmail has sending limits
4. **Network issues** - Check server logs for errors

---

## 🔒 Security Best Practices

1. **Never commit `.env` file** to GitHub
2. **Use App Passwords** instead of regular passwords
3. **Rotate App Passwords** periodically
4. **Use different App Passwords** for different applications
5. **Revoke unused App Passwords** from Google Account settings

---

## 📊 Vercel Deployment

When deploying to Vercel, add environment variables in Vercel dashboard:

1. Go to your Vercel project
2. Settings → Environment Variables
3. Add:
   - `EMAIL_USER` = your-email@gmail.com
   - `EMAIL_APP_PASSWORD` = your-app-password
   - `FRONTEND_URL` = https://your-frontend-url.vercel.app

---

## 🧪 Testing Checklist

- [ ] 2FA enabled on Gmail
- [ ] App Password generated
- [ ] `.env` file updated with correct credentials
- [ ] Backend server restarted
- [ ] Password reset request successful
- [ ] Email received in inbox (check spam too)
- [ ] Reset link works
- [ ] Password successfully changed
- [ ] Confirmation email received

---

## 📞 Support

If you're still having issues:

1. Check backend console logs for detailed error messages
2. Verify all environment variables are set correctly
3. Try generating a new App Password
4. Make sure your Gmail account is in good standing

---

## 🎉 Success!

Once configured, your users will receive:
- ✅ Welcome emails when they sign up
- ✅ Password reset links sent to **their email address**
- ✅ Confirmation emails after password reset

The reset link will **NOT** appear on the webpage - it will only be sent to the user's email for security.
