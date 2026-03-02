# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. ❌ Error 500: "Error sending password reset email"

**Symptoms:**
- Forgot password returns 500 error
- Network tab shows: `forgot-password` → Status 500

**Root Cause:**
Email service is not configured in Vercel environment variables.

**Solution:**

#### Step 1: Check Email Configuration
Visit: https://mern-review-system.vercel.app/api/config/email

You should see:
```json
{
  "success": true,
  "emailConfigured": true,
  "config": {
    "EMAIL_USER": "✅ Set",
    "EMAIL_APP_PASSWORD": "✅ Set"
  }
}
```

If you see `❌ Not set`, follow Step 2.

#### Step 2: Add Environment Variables to Vercel

1. **Go to Vercel Dashboard:**
   - https://vercel.com/dashboard
   - Select project: `mern-review-system`

2. **Settings → Environment Variables**

3. **Add these variables:**
   ```
   EMAIL_USER=aryankaushik541@gmail.com
   EMAIL_APP_PASSWORD=yjjhugimwdpmakrh
   ```

4. **Click "Save"**

5. **Redeploy:**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"

#### Step 3: Verify Fix

1. Visit: https://mern-review-system.vercel.app/api/config/email
2. Should show: `"emailConfigured": true`
3. Test forgot password again

---

### 2. ❌ Gmail App Password Not Working

**Symptoms:**
- Email configured but still getting errors
- "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solutions:**

#### Option A: Generate New App Password

1. **Enable 2-Step Verification:**
   - https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate App Password:**
   - Security → App passwords
   - App: Mail
   - Device: Other (type "Review System")
   - Click "Generate"
   - Copy 16-character password (remove spaces)

3. **Update Vercel:**
   ```
   EMAIL_APP_PASSWORD=your-new-16-char-password
   ```

4. **Redeploy**

#### Option B: Check Gmail Settings

1. **Less Secure Apps:**
   - Gmail may block "less secure apps"
   - Use App Password instead of regular password

2. **Account Restrictions:**
   - Check if account has sending restrictions
   - Verify account is not suspended

---

### 3. ❌ MongoDB Connection Error

**Symptoms:**
- API returns 500 errors
- "MongoDB Connection Error" in logs

**Solutions:**

1. **Check MongoDB URI:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname
   ```

2. **Whitelist IP in MongoDB Atlas:**
   - Go to MongoDB Atlas
   - Network Access → IP Whitelist
   - Add: `0.0.0.0/0` (allow from anywhere)
   - Or add Vercel's IP ranges

3. **Verify Database User:**
   - Database Access → Database Users
   - Ensure user has read/write permissions

---

### 4. ❌ CORS Error

**Symptoms:**
- Frontend can't connect to backend
- "CORS policy" error in browser console

**Solutions:**

1. **Update Backend CORS:**
   ```javascript
   // backend/server.js
   app.use(cors({
     origin: process.env.FRONTEND_URL || '*',
     credentials: true
   }));
   ```

2. **Set FRONTEND_URL in Vercel:**
   ```env
   FRONTEND_URL=https://your-frontend.vercel.app
   ```

3. **Redeploy backend**

---

### 5. ❌ JWT Token Errors

**Symptoms:**
- "JWT_SECRET is not defined"
- Authentication fails

**Solutions:**

1. **Add JWT_SECRET to Vercel:**
   ```env
   JWT_SECRET=your-super-secret-random-key-here
   ```

2. **Generate Secure Secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

3. **Redeploy**

---

### 6. ❌ Password Reset Link Expired

**Symptoms:**
- "Invalid or expired password reset token"

**Cause:**
Reset tokens expire after 10 minutes.

**Solutions:**

1. **Request new reset link**
2. **Use link within 10 minutes**
3. **Check email spam folder**

---

### 7. ❌ Email Not Received

**Checklist:**

- [ ] Check spam/junk folder
- [ ] Verify email address is correct
- [ ] Check email configuration: `/api/config/email`
- [ ] Check Vercel deployment logs
- [ ] Verify Gmail account is active
- [ ] Check Gmail sending limits (500/day for free)

---

## 🔍 Debugging Tools

### 1. Check API Health
```bash
curl https://mern-review-system.vercel.app/api/health
```

Expected:
```json
{
  "success": true,
  "message": "Server is running",
  "timestamp": "2026-03-02T..."
}
```

### 2. Check Email Configuration
```bash
curl https://mern-review-system.vercel.app/api/config/email
```

Expected:
```json
{
  "success": true,
  "emailConfigured": true,
  "config": {
    "EMAIL_USER": "✅ Set",
    "EMAIL_APP_PASSWORD": "✅ Set"
  }
}
```

### 3. Check API Root
```bash
curl https://mern-review-system.vercel.app/
```

Should show all features and their status.

### 4. Test Forgot Password
```bash
curl -X POST https://mern-review-system.vercel.app/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

Expected (if email configured):
```json
{
  "success": true,
  "message": "Password reset link has been sent to your email."
}
```

---

## 📊 Vercel Deployment Logs

### View Logs:

1. **Go to Vercel Dashboard**
2. **Select Project**
3. **Deployments → Latest Deployment**
4. **Click "View Function Logs"**

### Common Log Messages:

✅ **Good:**
```
✅ MongoDB Connected Successfully
✅ Email service: Configured
✅ Password reset email sent to: user@example.com
```

❌ **Bad:**
```
❌ MongoDB Connection Error
⚠️ Email not configured
❌ Error sending password reset email
```

---

## 🚀 Quick Fix Checklist

When something breaks, check in this order:

1. [ ] **API Health:** `/api/health` returns 200
2. [ ] **Email Config:** `/api/config/email` shows configured
3. [ ] **MongoDB:** Connection successful in logs
4. [ ] **Environment Variables:** All set in Vercel
5. [ ] **Deployment:** Latest code deployed
6. [ ] **Browser Console:** No CORS errors
7. [ ] **Network Tab:** Check actual error response

---

## 📞 Still Having Issues?

### Before Opening an Issue:

1. ✅ Check all environment variables
2. ✅ Verify email configuration
3. ✅ Test API endpoints with curl
4. ✅ Check Vercel deployment logs
5. ✅ Review browser console errors

### Open GitHub Issue:

Include:
- Error message (exact text)
- Steps to reproduce
- API endpoint URL
- Response from `/api/config/email`
- Browser console screenshot
- Vercel deployment logs (if accessible)

---

**Last Updated:** 2026-03-02
