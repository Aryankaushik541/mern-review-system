# ⚡ Quick Fix - Email Service Setup (Hindi)

## 🎯 Problem: Email nahi ja raha

**Reason:** Vercel pe environment variables nahi hain

**Solution:** 5 minute mein fix ho jayega!

---

## 📝 Kya Karna Hai

### Step 1: Backend Setup (2 Minutes)

**Project:** mern-review-system  
**URL:** https://vercel.com/dashboard

1. **mern-review-system** project kholo
2. **Settings → Environment Variables**
3. **Ye 2 variables add karo:**

```
EMAIL_USER = aryankaushik541@gmail.com
EMAIL_APP_PASSWORD = yjjhugimwdpmakrh
```

4. Dono mein **teeno environments** select karo (Production, Preview, Development)
5. **Save** karo
6. **Deployments → Redeploy** karo

---

### Step 2: Frontend Setup (1 Minute)

**Project:** booking-review-system  
**URL:** https://vercel.com/dashboard

1. **booking-review-system** project kholo
2. **Settings → Environment Variables**
3. **Ye variable add karo:**

```
REACT_APP_API_URL = https://mern-review-system.vercel.app
```

4. **Teeno environments** select karo
5. **Save** karo
6. **Deployments → Redeploy** karo

---

### Step 3: Test Karo (30 Seconds)

1. Jao: https://booking-review-system.vercel.app/forgot-password
2. Email enter karo: `aryankaushik541@gmail.com`
3. "Send Reset Link" click karo
4. **Gmail inbox check karo** - email aa jayega! ✅

---

## 📋 Backend Variables (Copy-Paste)

```
Variable 1:
Name: EMAIL_USER
Value: aryankaushik541@gmail.com

Variable 2:
Name: EMAIL_APP_PASSWORD
Value: yjjhugimwdpmakrh
```

**Optional (agar already nahi hain toh):**

```
Variable 3:
Name: FRONTEND_URL
Value: https://booking-review-system.vercel.app

Variable 4:
Name: MONGODB_URI
Value: mongodb+srv://aryankaushik541_db_user:wiA6zyP8cWjaq5Bu@cluster0.cikdgjg.mongodb.net/feedbackDB?retryWrites=true&w=majority

Variable 5:
Name: JWT_SECRET
Value: 4f8e9a6c2d1b7e3a9c5f8a2d6e1b9c4f7a8e2d5c6b1a9f3e8d4c7b5
```

---

## 📋 Frontend Variables (Copy-Paste)

```
Variable 1:
Name: REACT_APP_API_URL
Value: https://mern-review-system.vercel.app
```

---

## ✅ Success!

**Pehle:**
```
❌ 503 error
❌ Email nahi ja raha
⚠️ Reset URL page pe dikh raha tha
```

**Baad mein:**
```
✅ No error
✅ Email inbox mein jayega
✅ Professional experience
```

---

## 🎯 Important Notes

1. **Dono projects mein variables add karo** (backend + frontend)
2. **Dono ko redeploy karo** (automatic nahi hota)
3. **Deployment complete hone ka wait karo** (green tick)
4. **Tab test karo**

---

## 📞 Help

Agar problem hai toh:
- `VERCEL_COMPLETE_SETUP.md` dekho (detailed guide)
- Screenshot bhejo kya error aa raha hai

---

**Time:** 5 minutes  
**Difficulty:** Easy  
**Result:** Email service working! 🚀
