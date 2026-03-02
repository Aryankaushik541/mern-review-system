# ⚡ Quick Email Setup (5 Minutes)

## 🎯 What You Need

- A Gmail account
- 5 minutes of your time

---

## 📝 Setup Steps

### 1️⃣ Enable 2-Factor Authentication (2FA)

1. Go to: https://myaccount.google.com/security
2. Click **"2-Step Verification"**
3. Follow the setup wizard
4. ✅ Done!

### 2️⃣ Generate App Password

1. Go to: https://myaccount.google.com/apppasswords
2. Sign in if prompted
3. Select app: **"Mail"**
4. Select device: **"Other (Custom name)"**
5. Enter name: **"MERN Review System"**
6. Click **"Generate"**
7. **Copy the 16-character password** (example: `abcd efgh ijkl mnop`)
8. **Remove spaces** → `abcdefghijklmnop`

### 3️⃣ Update Backend .env

Open `backend/.env` and add:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=abcdefghijklmnop

# Frontend URL
FRONTEND_URL=https://booking-review-system.vercel.app
```

**Replace:**
- `your-email@gmail.com` → Your actual Gmail
- `abcdefghijklmnop` → Your App Password (no spaces!)

### 4️⃣ Restart Backend

```bash
cd backend
npm start
```

### 5️⃣ Test It!

1. Go to your app
2. Click **"Forgot Password"**
3. Enter your email
4. Check your inbox! 📧

---

## ✅ Checklist

- [ ] 2FA enabled on Gmail
- [ ] App Password generated
- [ ] `EMAIL_USER` added to `.env`
- [ ] `EMAIL_APP_PASSWORD` added to `.env`
- [ ] `FRONTEND_URL` set correctly
- [ ] Backend restarted
- [ ] Password reset tested
- [ ] Email received ✨

---

## 🚨 Common Issues

### "Email service not configured"
→ Check `.env` file has both `EMAIL_USER` and `EMAIL_APP_PASSWORD`
→ Restart backend server

### "Email delivery failed"
→ Make sure you're using **App Password**, not regular password
→ Remove all spaces from App Password
→ Check 2FA is enabled

### Email not received
→ Check spam folder
→ Verify email address is correct
→ Check backend console for errors

---

## 🎉 That's It!

Your password reset emails will now be sent to **user's email address** instead of showing on the page!

**Need detailed help?** See `EMAIL_CONFIGURATION_GUIDE.md`

---

**Quick Links:**
- 🔐 2FA Setup: https://myaccount.google.com/security
- 🔑 App Passwords: https://myaccount.google.com/apppasswords
- 📖 Full Guide: `EMAIL_CONFIGURATION_GUIDE.md`
