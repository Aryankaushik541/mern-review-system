# 🚀 Complete Vercel Deployment Setup

## Backend Already Deployed ✅
**URL:** https://mern-review-system.vercel.app

---

## 🔧 Fix Email Service (CRITICAL)

### Problem:
Forgot password returns error: "Error sending password reset email"

### Root Cause:
`EMAIL_APP_PASSWORD` has spaces in Vercel environment variables.

### Solution:

#### Step 1: Update EMAIL_APP_PASSWORD in Vercel

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select project: `mern-review-system`

2. **Settings → Environment Variables**

3. **Find `EMAIL_APP_PASSWORD`** and click Edit

4. **Remove ALL spaces:**
   ```
   Current: yjjh ugim wdpm akrh  ❌
   Correct: yjjhugimwdpmakrh   ✅
   ```

5. **Click Save**

#### Step 2: Add FRONTEND_URL

1. **Add new environment variable:**
   ```
   Name: FRONTEND_URL
   Value: https://booking-review-system.vercel.app
   Environment: Production, Preview, Development (select all)
   ```

2. **Click Save**

#### Step 3: Redeploy

1. **Go to Deployments tab**
2. **Click "..." on latest deployment**
3. **Click "Redeploy"**
4. **Wait 2-3 minutes**

#### Step 4: Verify

Open in browser:
```
https://mern-review-system.vercel.app/api/config/email
```

Should show:
```json
{
  "success": true,
  "emailConfigured": true,
  "config": {
    "EMAIL_USER": "✅ Set",
    "EMAIL_APP_PASSWORD": "✅ Set",
    "FRONTEND_URL": "✅ Set"
  }
}
```

---

## 📧 Alternative: Generate Fresh Gmail App Password

If the above doesn't work, generate a new App Password:

### Step 1: Enable 2-Step Verification

1. Go to: https://myaccount.google.com/security
2. Click **2-Step Verification**
3. Follow the setup process
4. Complete verification

### Step 2: Generate App Password

1. After enabling 2-Step Verification, go back to **Security**
2. Scroll to **2-Step Verification** section
3. Scroll down to **App passwords**
4. Click **App passwords**
5. You may need to sign in again
6. Select:
   - **App:** Mail
   - **Device:** Other (Custom name)
   - Type: "Review System Backend"
7. Click **Generate**
8. **Copy the 16-character password**
   - Example: `abcd efgh ijkl mnop`
   - **Remove ALL spaces:** `abcdefghijklmnop`

### Step 3: Update in Vercel

1. Go to Vercel Dashboard
2. Settings → Environment Variables
3. Edit `EMAIL_APP_PASSWORD`
4. Paste new password (NO SPACES!)
5. Save
6. Redeploy

---

## ✅ Complete Environment Variables Checklist

Make sure ALL these are set in Vercel:

```env
# Database
MONGODB_URI=mongodb+srv://aryankaushik541_db_user:wiA6zyP8cWjaq5Bu@cluster0.cikdgjg.mongodb.net/feedbackDB?retryWrites=true&w=majority

# Security
JWT_SECRET=4f8e9a6c2d1b7e3a9c5f8a2d6e1b9c4f7a8e2d5c6b1a9f3e8d4c7b5
JWT_EXPIRES_IN=7d

# Email (CRITICAL - NO SPACES!)
EMAIL_USER=aryankaushik541@gmail.com
EMAIL_APP_PASSWORD=yjjhugimwdpmakrh

# Frontend
FRONTEND_URL=https://booking-review-system.vercel.app

# Environment
NODE_ENV=production
PORT=5000
```

---

## 🧪 Testing

### Test 1: Check Email Configuration
```bash
curl https://mern-review-system.vercel.app/api/config/email
```

**Expected:**
```json
{
  "success": true,
  "emailConfigured": true
}
```

### Test 2: Check API Health
```bash
curl https://mern-review-system.vercel.app/api/health
```

**Expected:**
```json
{
  "success": true,
  "message": "Server is running"
}
```

### Test 3: Test Forgot Password
```bash
curl -X POST https://mern-review-system.vercel.app/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"ak7482860774@gmail.com"}'
```

**Expected:**
```json
{
  "success": true,
  "message": "Password reset link has been sent to your email."
}
```

### Test 4: Frontend Test

1. Go to: https://booking-review-system.vercel.app/forgot-password
2. Enter email: `ak7482860774@gmail.com`
3. Click "Send Reset Link"
4. Should show success message
5. Check email inbox (and spam folder)

---

## 🐛 Troubleshooting

### Issue 1: Still Getting 500 Error

**Check:**
1. Vercel deployment completed successfully
2. All environment variables are set
3. `EMAIL_APP_PASSWORD` has NO spaces
4. Latest code is deployed

**Solution:**
1. Go to Vercel → Deployments
2. Check deployment logs for errors
3. Look for email-related errors
4. Redeploy if needed

### Issue 2: Email Not Received

**Check:**
1. Spam/Junk folder
2. Email address is correct
3. Gmail account is active
4. App Password is correct

**Solution:**
1. Generate new App Password
2. Update in Vercel
3. Redeploy
4. Test again

### Issue 3: "Email service not configured"

**Check:**
```bash
curl https://mern-review-system.vercel.app/api/config/email
```

If shows `"emailConfigured": false`:
1. Environment variables not set
2. Deployment not completed
3. Need to redeploy

**Solution:**
1. Add missing environment variables
2. Redeploy
3. Wait 2-3 minutes
4. Test again

---

## 📊 Vercel Deployment Logs

### How to Check Logs:

1. **Go to Vercel Dashboard**
2. **Select Project:** mern-review-system
3. **Deployments Tab**
4. **Click on Latest Deployment**
5. **Click "View Function Logs"**

### What to Look For:

✅ **Good Logs:**
```
✅ MongoDB Connected Successfully
✅ Email service is ready to send messages
✅ Password reset email sent to: user@example.com
```

❌ **Bad Logs:**
```
❌ Email transporter verification failed
❌ Error sending password reset email
⚠️ Email not configured
```

---

## 🎯 Quick Fix Summary

1. **Remove spaces from `EMAIL_APP_PASSWORD`** in Vercel
2. **Add `FRONTEND_URL`** environment variable
3. **Redeploy** the application
4. **Wait 2-3 minutes** for deployment
5. **Test** forgot password feature
6. **Check email** inbox

---

## 📞 Still Not Working?

### Generate Fresh App Password:

1. https://myaccount.google.com/apppasswords
2. Login with `aryankaushik541@gmail.com`
3. Generate new password
4. Copy (remove spaces!)
5. Update in Vercel
6. Redeploy

### Check Deployment:

1. Vercel Dashboard → Deployments
2. Latest deployment should be "Ready"
3. Check Function Logs for errors
4. Redeploy if needed

---

**Last Updated:** 2026-03-02

**Status:** 
- Backend: ✅ Deployed
- Email Service: 🔄 Needs Configuration Fix
- Frontend URL: ✅ Added to code
