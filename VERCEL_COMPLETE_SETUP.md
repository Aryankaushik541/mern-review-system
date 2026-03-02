# 🚀 Complete Vercel Setup Guide

## 📋 Your Projects

- **Backend:** https://mern-review-system.vercel.app
- **Frontend:** https://booking-review-system.vercel.app

---

## ⚡ Quick Setup (5 Minutes Total)

### Part 1: Backend Environment Variables (2 Minutes)

#### Project: `mern-review-system` (Backend)

**URL:** https://vercel.com/dashboard → mern-review-system

**Add these environment variables:**

| Variable Name | Value |
|--------------|-------|
| `MONGODB_URI` | `mongodb+srv://aryankaushik541_db_user:wiA6zyP8cWjaq5Bu@cluster0.cikdgjg.mongodb.net/feedbackDB?retryWrites=true&w=majority` |
| `JWT_SECRET` | `4f8e9a6c2d1b7e3a9c5f8a2d6e1b9c4f7a8e2d5c6b1a9f3e8d4c7b5` |
| `JWT_EXPIRES_IN` | `7d` |
| `FRONTEND_URL` | `https://booking-review-system.vercel.app` |
| `NODE_ENV` | `production` |
| `EMAIL_USER` | `aryankaushik541@gmail.com` |
| `EMAIL_APP_PASSWORD` | `yjjhugimwdpmakrh` |

**Steps:**
1. Go to: https://vercel.com/dashboard
2. Click on **mern-review-system** project
3. Settings → Environment Variables
4. Add each variable above (select all 3 environments)
5. Click Save for each

---

### Part 2: Frontend Environment Variables (1 Minute)

#### Project: `booking-review-system` (Frontend)

**URL:** https://vercel.com/dashboard → booking-review-system

**Add this environment variable:**

| Variable Name | Value |
|--------------|-------|
| `REACT_APP_API_URL` | `https://mern-review-system.vercel.app` |

**Steps:**
1. Go to: https://vercel.com/dashboard
2. Click on **booking-review-system** project
3. Settings → Environment Variables
4. Add the variable above (select all 3 environments)
5. Click Save

---

### Part 3: Redeploy Both Projects (2 Minutes)

#### Redeploy Backend:
1. Go to **mern-review-system** project
2. Deployments tab
3. Latest deployment → 3 dots → Redeploy
4. Wait for green tick

#### Redeploy Frontend:
1. Go to **booking-review-system** project
2. Deployments tab
3. Latest deployment → 3 dots → Redeploy
4. Wait for green tick

---

## 📝 Detailed Steps

### Backend Setup (mern-review-system)

1. **Open Backend Project:**
   - https://vercel.com/dashboard
   - Find and click: **mern-review-system**

2. **Go to Settings:**
   - Click **Settings** tab at top

3. **Open Environment Variables:**
   - Left sidebar → **Environment Variables**

4. **Add Variable 1 - MONGODB_URI:**
   - Click **Add New**
   - Name: `MONGODB_URI`
   - Value: `mongodb+srv://aryankaushik541_db_user:wiA6zyP8cWjaq5Bu@cluster0.cikdgjg.mongodb.net/feedbackDB?retryWrites=true&w=majority`
   - Check: ✅ Production ✅ Preview ✅ Development
   - Click **Save**

5. **Add Variable 2 - JWT_SECRET:**
   - Click **Add New**
   - Name: `JWT_SECRET`
   - Value: `4f8e9a6c2d1b7e3a9c5f8a2d6e1b9c4f7a8e2d5c6b1a9f3e8d4c7b5`
   - Check: ✅ Production ✅ Preview ✅ Development
   - Click **Save**

6. **Add Variable 3 - JWT_EXPIRES_IN:**
   - Click **Add New**
   - Name: `JWT_EXPIRES_IN`
   - Value: `7d`
   - Check: ✅ Production ✅ Preview ✅ Development
   - Click **Save**

7. **Add Variable 4 - FRONTEND_URL:**
   - Click **Add New**
   - Name: `FRONTEND_URL`
   - Value: `https://booking-review-system.vercel.app`
   - Check: ✅ Production ✅ Preview ✅ Development
   - Click **Save**

8. **Add Variable 5 - NODE_ENV:**
   - Click **Add New**
   - Name: `NODE_ENV`
   - Value: `production`
   - Check: ✅ Production ✅ Preview ✅ Development
   - Click **Save**

9. **Add Variable 6 - EMAIL_USER:**
   - Click **Add New**
   - Name: `EMAIL_USER`
   - Value: `aryankaushik541@gmail.com`
   - Check: ✅ Production ✅ Preview ✅ Development
   - Click **Save**

10. **Add Variable 7 - EMAIL_APP_PASSWORD:**
    - Click **Add New**
    - Name: `EMAIL_APP_PASSWORD`
    - Value: `yjjhugimwdpmakrh`
    - Check: ✅ Production ✅ Preview ✅ Development
    - Click **Save**

11. **Redeploy:**
    - Go to **Deployments** tab
    - Latest deployment → **...** → **Redeploy**
    - Wait for completion

---

### Frontend Setup (booking-review-system)

1. **Open Frontend Project:**
   - https://vercel.com/dashboard
   - Find and click: **booking-review-system**

2. **Go to Settings:**
   - Click **Settings** tab at top

3. **Open Environment Variables:**
   - Left sidebar → **Environment Variables**

4. **Add Variable - REACT_APP_API_URL:**
   - Click **Add New**
   - Name: `REACT_APP_API_URL`
   - Value: `https://mern-review-system.vercel.app`
   - Check: ✅ Production ✅ Preview ✅ Development
   - Click **Save**

5. **Redeploy:**
   - Go to **Deployments** tab
   - Latest deployment → **...** → **Redeploy**
   - Wait for completion

---

## ✅ Verification

### Test Backend:
1. Open: https://mern-review-system.vercel.app/api/health
2. Should see: `{"status":"ok"}`

### Test Frontend:
1. Open: https://booking-review-system.vercel.app
2. Should load properly

### Test Email:
1. Go to: https://booking-review-system.vercel.app/forgot-password
2. Enter email: `aryankaushik541@gmail.com`
3. Click "Send Reset Link"
4. **Expected:** Email sent to inbox (no URL on page)
5. Check Gmail inbox for reset email ✅

---

## 📋 Copy-Paste Values

### Backend Variables:

```
MONGODB_URI
mongodb+srv://aryankaushik541_db_user:wiA6zyP8cWjaq5Bu@cluster0.cikdgjg.mongodb.net/feedbackDB?retryWrites=true&w=majority

JWT_SECRET
4f8e9a6c2d1b7e3a9c5f8a2d6e1b9c4f7a8e2d5c6b1a9f3e8d4c7b5

JWT_EXPIRES_IN
7d

FRONTEND_URL
https://booking-review-system.vercel.app

NODE_ENV
production

EMAIL_USER
aryankaushik541@gmail.com

EMAIL_APP_PASSWORD
yjjhugimwdpmakrh
```

### Frontend Variables:

```
REACT_APP_API_URL
https://mern-review-system.vercel.app
```

---

## 🎯 Expected Results

### Before Setup:
- ❌ 503 error on forgot password
- ❌ Reset URL showing on page
- ❌ Email not sent

### After Setup:
- ✅ No 503 error
- ✅ Email sent to user's inbox
- ✅ No URL shown on page
- ✅ Professional password reset flow

---

## 🔍 Troubleshooting

### Backend Issues:

**"Email service not configured"**
- Check if `EMAIL_USER` and `EMAIL_APP_PASSWORD` are added
- Make sure you redeployed after adding variables
- Check deployment logs for errors

**"CORS error"**
- Make sure `FRONTEND_URL` is set correctly
- Should be: `https://booking-review-system.vercel.app`

### Frontend Issues:

**"Network error" or "Failed to fetch"**
- Check if `REACT_APP_API_URL` is set
- Should be: `https://mern-review-system.vercel.app`
- Make sure you redeployed frontend

**"API not responding"**
- Test backend directly: https://mern-review-system.vercel.app/api/health
- If backend is down, check backend deployment logs

---

## ✅ Success Checklist

### Backend (mern-review-system):
- [ ] MONGODB_URI added
- [ ] JWT_SECRET added
- [ ] JWT_EXPIRES_IN added
- [ ] FRONTEND_URL added
- [ ] NODE_ENV added
- [ ] EMAIL_USER added
- [ ] EMAIL_APP_PASSWORD added
- [ ] Backend redeployed
- [ ] Deployment successful (green tick)

### Frontend (booking-review-system):
- [ ] REACT_APP_API_URL added
- [ ] Frontend redeployed
- [ ] Deployment successful (green tick)

### Testing:
- [ ] Backend health check works
- [ ] Frontend loads properly
- [ ] Forgot password tested
- [ ] Email received in inbox
- [ ] Password reset works

---

## 🎉 Final Result

After completing all steps:

1. **Frontend:** https://booking-review-system.vercel.app
   - ✅ Fully functional
   - ✅ Connected to backend
   - ✅ Password reset working

2. **Backend:** https://mern-review-system.vercel.app
   - ✅ All APIs working
   - ✅ Email service configured
   - ✅ Database connected

3. **Email Service:**
   - ✅ Password reset emails sent to user's inbox
   - ✅ Welcome emails on signup
   - ✅ Confirmation emails after password reset

---

**Time Required:** 5 minutes total
**Difficulty:** Easy (just copy-paste)
**Result:** Fully working production app! 🚀

---

**Last Updated:** March 2, 2026
**Status:** ⏳ Ready for setup
