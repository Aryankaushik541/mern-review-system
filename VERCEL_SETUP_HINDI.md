# 🚀 Vercel Environment Variables Setup (Hindi)

## ⚠️ ZARURI: Ye karo warna email nahi jayega!

Tumhara code bilkul sahi hai, bas Vercel ko batana hai ki email credentials kya hain.

---

## 📝 Ye Karo (Sirf 2 Minute)

### Step 1: Vercel Dashboard Kholo

1. Is link pe jao: **https://vercel.com/dashboard**
2. Login karo (agar nahi kiya toh)
3. Apna project dhundo: **mern-review-system** ya jo bhi naam hai backend ka

### Step 2: Settings Mein Jao

1. Project pe click karo
2. Upar **"Settings"** tab pe click karo
3. Left side mein **"Environment Variables"** pe click karo

### Step 3: Ye 2 Variables Add Karo

#### Variable 1: EMAIL_USER

1. **"Add New"** button pe click karo
2. **Name** mein likho: `EMAIL_USER`
3. **Value** mein likho: `aryankaushik541@gmail.com`
4. Neeche **checkboxes** mein teeno ko tick karo:
   - ✅ Production
   - ✅ Preview  
   - ✅ Development
5. **"Save"** pe click karo

#### Variable 2: EMAIL_APP_PASSWORD

1. Phir se **"Add New"** button pe click karo
2. **Name** mein likho: `EMAIL_APP_PASSWORD`
3. **Value** mein likho: `yjjhugimwdpmakrh`
4. Teeno checkboxes tick karo:
   - ✅ Production
   - ✅ Preview
   - ✅ Development
5. **"Save"** pe click karo

### Step 4: Redeploy Karo

**IMPORTANT:** Environment variables add karne ke baad automatic redeploy NAHI hota!

1. Upar **"Deployments"** tab pe jao
2. Sabse upar wali deployment (latest) pe **3 dots (...)** pe click karo
3. **"Redeploy"** select karo
4. Confirm karo
5. 1-2 minute wait karo deployment complete hone tak

### Step 5: Test Karo

1. Apni website pe jao: **https://booking-review-system.vercel.app/forgot-password**
2. Email enter karo: `aryankaushik541@gmail.com`
3. **"Send Reset Link"** pe click karo
4. **Gmail inbox check karo** - email aa jayega! ✅

---

## 🎯 Copy-Paste Ke Liye Values

Agar typing mein galti ho sakti hai toh ye copy karo:

```
EMAIL_USER
aryankaushik541@gmail.com

EMAIL_APP_PASSWORD
yjjhugimwdpmakrh
```

---

## ❓ Agar Problem Aaye

### "Email service not configured" error aa raha hai

**Solution:**
1. Check karo dono variables add hue ya nahi (Settings → Environment Variables)
2. Redeploy kiya ya nahi? (Deployments → Redeploy)
3. Deployment complete hone ka wait karo (green tick dikhna chahiye)

### Email nahi aa raha

**Check karo:**
1. Spam folder check karo
2. Email address sahi hai ya nahi
3. Vercel deployment logs check karo (Deployment → View Function Logs)

### Variables add karne mein problem

**Dhyan do:**
- `EMAIL_APP_PASSWORD` mein **spaces nahi hone chahiye**
- Exactly ye likho: `yjjhugimwdpmakrh`
- Teeno environments select karo (Production, Preview, Development)

---

## 🎬 Video Tutorial (Agar Chahiye)

Agar text se samajh nahi aa raha toh:
1. YouTube pe search karo: "How to add environment variables in Vercel"
2. Ya mujhe bolo main detailed screenshots add kar doon

---

## ✅ Checklist

- [ ] Vercel dashboard khola
- [ ] Settings → Environment Variables pe gaya
- [ ] `EMAIL_USER` add kiya
- [ ] `EMAIL_APP_PASSWORD` add kiya
- [ ] Dono variables mein teeno environments select kiye
- [ ] Redeploy kiya
- [ ] Deployment complete hone ka wait kiya
- [ ] Password reset test kiya
- [ ] Email inbox check kiya

---

## 🎉 Success!

Jab sab kuch sahi ho jayega:
- ✅ User forgot password page pe email enter karega
- ✅ Email **user ke inbox** mein jayega (admin ke nahi!)
- ✅ User email mein reset link pe click karega
- ✅ Password reset ho jayega
- ✅ Confirmation email bhi ayega

---

## 📞 Help Chahiye?

Agar abhi bhi problem hai toh:
1. Screenshot bhejo kya error aa raha hai
2. Vercel deployment logs check karo
3. Batao kis step pe atke ho

---

**Last Updated:** 2 March 2026  
**Status:** ⏳ Waiting for Vercel setup (2 minutes ka kaam)
