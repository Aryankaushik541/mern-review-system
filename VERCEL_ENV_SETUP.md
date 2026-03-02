# 🚀 Vercel Environment Variables Setup

## ⚠️ IMPORTANT: Your email is not working because environment variables are missing on Vercel!

Your backend code is correct, but Vercel doesn't have the email credentials. Follow these steps:

---

## 📝 Steps to Fix

### 1️⃣ Go to Vercel Dashboard

1. Open: https://vercel.com/dashboard
2. Find your project: **mern-review-system** (backend)
3. Click on the project

### 2️⃣ Add Environment Variables

1. Click **Settings** tab
2. Click **Environment Variables** in the left sidebar
3. Add these variables one by one:

#### Required Variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://aryankaushik541_db_user:wiA6zyP8cWjaq5Bu@cluster0.cikdgjg.mongodb.net/feedbackDB?retryWrites=true&w=majority` | Production, Preview, Development |
| `JWT_SECRET` | `4f8e9a6c2d1b7e3a9c5f8a2d6e1b9c4f7a8e2d5c6b1a9f3e8d4c7b5` | Production, Preview, Development |
| `JWT_EXPIRES_IN` | `7d` | Production, Preview, Development |
| `FRONTEND_URL` | `https://booking-review-system.vercel.app` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production, Preview, Development |
| `EMAIL_USER` | `aryankaushik541@gmail.com` | Production, Preview, Development |
| `EMAIL_APP_PASSWORD` | `yjjhugimwdpmakrh` | Production, Preview, Development |

### 3️⃣ How to Add Each Variable

For each variable:
1. Click **"Add New"** button
2. Enter the **Name** (e.g., `EMAIL_USER`)
3. Enter the **Value** (e.g., `aryankaushik541@gmail.com`)
4. Select all environments: ✅ Production, ✅ Preview, ✅ Development
5. Click **"Save"**

### 4️⃣ Redeploy

After adding all variables:
1. Go to **Deployments** tab
2. Click the **three dots (...)** on the latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete (1-2 minutes)

---

## ✅ Verification

After redeployment, test the password reset:

1. Go to: https://booking-review-system.vercel.app/forgot-password
2. Enter email: `aryankaushik541@gmail.com`
3. Click "Send Reset Link"
4. Check your Gmail inbox for the reset email

---

## 🎯 Quick Copy-Paste Values

```
MONGODB_URI=mongodb+srv://aryankaushik541_db_user:wiA6zyP8cWjaq5Bu@cluster0.cikdgjg.mongodb.net/feedbackDB?retryWrites=true&w=majority

JWT_SECRET=4f8e9a6c2d1b7e3a9c5f8a2d6e1b9c4f7a8e2d5c6b1a9f3e8d4c7b5

JWT_EXPIRES_IN=7d

FRONTEND_URL=https://booking-review-system.vercel.app

NODE_ENV=production

EMAIL_USER=aryankaushik541@gmail.com

EMAIL_APP_PASSWORD=yjjhugimwdpmakrh
```

---

## 📸 Visual Guide

### Step 1: Settings → Environment Variables
![Vercel Settings](https://i.imgur.com/example1.png)

### Step 2: Add New Variable
![Add Variable](https://i.imgur.com/example2.png)

### Step 3: Select All Environments
![Select Environments](https://i.imgur.com/example3.png)

---

## 🔍 Troubleshooting

### Still getting 503 error?

1. **Check if all variables are added:**
   - Go to Settings → Environment Variables
   - Verify all 7 variables are present

2. **Redeploy again:**
   - Deployments → Latest deployment → Redeploy

3. **Check deployment logs:**
   - Click on the deployment
   - Check "Build Logs" for errors
   - Check "Function Logs" for runtime errors

4. **Verify email credentials:**
   - Make sure `EMAIL_APP_PASSWORD` has no spaces
   - Should be exactly: `yjjhugimwdpmakrh`

### Email still not sending?

1. **Check Gmail App Password:**
   - Go to: https://myaccount.google.com/apppasswords
   - Verify the password `yjjhugimwdpmakrh` is still active
   - If not, generate a new one and update Vercel

2. **Check 2FA:**
   - Make sure 2-Factor Authentication is enabled on `aryankaushik541@gmail.com`

---

## 🎉 Expected Result

After setup:
- ✅ User enters email on forgot password page
- ✅ Email sent to user's inbox
- ✅ User receives reset link
- ✅ User clicks link and resets password
- ✅ Success! 🎊

---

## 📞 Need Help?

If you're still having issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set
3. Make sure you redeployed after adding variables
4. Test with your email: `aryankaushik541@gmail.com`

---

**Last Updated:** March 2, 2026
**Status:** ⚠️ Waiting for Vercel environment variables setup
