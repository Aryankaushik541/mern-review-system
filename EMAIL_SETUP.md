# 📧 Email Setup Guide

## Gmail SMTP Configuration for Password Reset

### 🔧 Quick Setup (5 minutes)

The password reset feature requires Gmail SMTP to send emails. Follow these steps:

### Step 1: Enable 2-Step Verification

1. Go to **Google Account Settings**: https://myaccount.google.com/
2. Click **Security** (left sidebar)
3. Find **2-Step Verification**
4. Click **Get Started** and follow the prompts
5. Complete the setup

### Step 2: Generate App Password

1. After enabling 2-Step Verification, go back to **Security**
2. Scroll down to **2-Step Verification**
3. Scroll to bottom and find **App passwords**
4. Click **App passwords**
5. Select:
   - **App:** Mail
   - **Device:** Other (Custom name) → Type "Review System"
6. Click **Generate**
7. **Copy the 16-character password** (format: xxxx xxxx xxxx xxxx)

### Step 3: Add to Vercel Environment Variables

1. Go to **Vercel Dashboard**: https://vercel.com/dashboard
2. Select your project: `mern-review-system`
3. Go to **Settings** → **Environment Variables**
4. Add these variables:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-16-char-app-password
```

**Important:** 
- Use the **16-character app password**, NOT your regular Gmail password
- Remove spaces from the app password (e.g., `abcd efgh ijkl mnop` → `abcdefghijklmnop`)

### Step 4: Redeploy

1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger deployment

### Step 5: Test

1. Go to your frontend: https://your-frontend.vercel.app
2. Click **Forgot Password**
3. Enter your email
4. Check your inbox for the reset link

---

## 🐛 Troubleshooting

### Error: "Error sending password reset email"

**Possible causes:**
1. ❌ EMAIL_USER or EMAIL_APP_PASSWORD not set in Vercel
2. ❌ Using regular Gmail password instead of App Password
3. ❌ 2-Step Verification not enabled
4. ❌ App password has spaces

**Solutions:**
1. ✅ Verify environment variables in Vercel Settings
2. ✅ Generate new App Password (see Step 2)
3. ✅ Enable 2-Step Verification (see Step 1)
4. ✅ Remove all spaces from app password

### Error: "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solution:** You're using your regular Gmail password. Generate an App Password (Step 2).

### Email not received

**Check:**
1. ✅ Spam/Junk folder
2. ✅ Email address is correct
3. ✅ Gmail account has sending limits (500 emails/day for free accounts)
4. ✅ Check Vercel deployment logs for errors

---

## 📊 Current Configuration

### Environment Variables Required

```env
# Gmail SMTP
EMAIL_USER=aryankaushik541@gmail.com
EMAIL_APP_PASSWORD=yjjhugimwdpmakrh

# Frontend URL (for email links)
FRONTEND_URL=https://your-frontend.vercel.app
```

### Email Features

- ✅ Welcome email on signup
- ✅ Password reset email with link
- ✅ Password reset confirmation
- ✅ Professional HTML templates
- ✅ Booking.com-inspired design

---

## 🔒 Security Best Practices

1. **Never commit `.env` file** to Git
2. **Use App Passwords** instead of regular passwords
3. **Rotate App Passwords** periodically
4. **Monitor email sending** for suspicious activity
5. **Set up alerts** in Gmail for unusual activity

---

## 🚀 Alternative Email Services

If you don't want to use Gmail, you can configure other SMTP services:

### SendGrid (Recommended for Production)

```javascript
// backend/utils/emailService.js
const transporter = nodemailer.createTransporter({
  host: 'smtp.sendgrid.net',
  port: 587,
  auth: {
    user: 'apikey',
    pass: process.env.SENDGRID_API_KEY
  }
});
```

### Mailgun

```javascript
const transporter = nodemailer.createTransporter({
  host: 'smtp.mailgun.org',
  port: 587,
  auth: {
    user: process.env.MAILGUN_USERNAME,
    pass: process.env.MAILGUN_PASSWORD
  }
});
```

### AWS SES

```javascript
const transporter = nodemailer.createTransporter({
  host: 'email-smtp.us-east-1.amazonaws.com',
  port: 587,
  auth: {
    user: process.env.AWS_SES_USERNAME,
    pass: process.env.AWS_SES_PASSWORD
  }
});
```

---

## 📝 Testing Locally

```bash
# 1. Create .env file in backend directory
cd backend
cp .env.example .env

# 2. Add your Gmail credentials
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-password

# 3. Start server
npm start

# 4. Test forgot password endpoint
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

---

## ✅ Verification Checklist

- [ ] 2-Step Verification enabled on Gmail
- [ ] App Password generated
- [ ] EMAIL_USER added to Vercel
- [ ] EMAIL_APP_PASSWORD added to Vercel
- [ ] FRONTEND_URL added to Vercel
- [ ] Deployment redeployed
- [ ] Password reset tested
- [ ] Email received successfully

---

**Need help?** Check the [main README](README.md) or open an issue on GitHub.

**Last Updated:** 2026-03-02
