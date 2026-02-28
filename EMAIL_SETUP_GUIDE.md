# 📧 Email Setup Guide - Gmail SMTP Integration

Complete guide to set up email functionality for forgot password, welcome emails, and password reset confirmations.

---

## 🎯 Features Included

✅ **Welcome Email** - Sent automatically when user signs up  
✅ **Forgot Password** - Send password reset link via email  
✅ **Password Reset** - Secure token-based password reset (10 min expiry)  
✅ **Reset Confirmation** - Email sent after successful password reset  

---

## 📋 Prerequisites

- Gmail account
- 2-Step Verification enabled on Gmail
- Node.js and npm installed

---

## 🔧 Step-by-Step Setup

### **Step 1: Enable 2-Step Verification on Gmail**

1. Go to [Google Account Settings](https://myaccount.google.com/)
2. Click on **Security** (left sidebar)
3. Scroll down to **2-Step Verification**
4. Click **Get Started** and follow the instructions
5. Complete the setup (you'll need your phone)

---

### **Step 2: Generate Gmail App Password**

1. After enabling 2-Step Verification, go back to **Security**
2. Scroll down to **App passwords** (under 2-Step Verification)
3. Click on **App passwords**
4. You may need to sign in again
5. Select app: **Mail**
6. Select device: **Other (Custom name)**
7. Enter name: `Review System` or any name you prefer
8. Click **Generate**
9. **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)
10. **Important:** Remove all spaces from the password before using it

---

### **Step 3: Update Backend Environment Variables**

1. Navigate to `backend` folder
2. Open `.env` file (create if doesn't exist by copying `.env.example`)
3. Add these lines:

```env
# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=abcdefghijklmnop

# Make sure CLIENT_URL is set correctly
CLIENT_URL=http://localhost:3000
```

**Example:**
```env
EMAIL_USER=aryankaushik541@gmail.com
EMAIL_APP_PASSWORD=abcdefghijklmnop
CLIENT_URL=http://localhost:3000
```

⚠️ **Important Notes:**
- Use your actual Gmail address for `EMAIL_USER`
- Use the 16-character app password (without spaces) for `EMAIL_APP_PASSWORD`
- **DO NOT** use your regular Gmail password
- Never commit `.env` file to GitHub

---

### **Step 4: Install Dependencies**

```bash
cd backend
npm install
```

This will install `nodemailer` and `crypto` packages automatically.

---

### **Step 5: Test the Setup**

#### **Test 1: Start Backend Server**
```bash
cd backend
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

#### **Test 2: Start Frontend**
```bash
cd client
npm start
```

#### **Test 3: Test Signup (Welcome Email)**
1. Go to `http://localhost:3000/signup`
2. Create a new account
3. Check your email inbox for welcome email
4. If you don't see it, check **Spam/Junk** folder

#### **Test 4: Test Forgot Password**
1. Go to `http://localhost:3000/login`
2. Click **Forgot Password?**
3. Enter your email
4. Check your email for password reset link
5. Click the link (valid for 10 minutes)
6. Set new password
7. Check email for confirmation

---

## 🎨 Email Templates

### **1. Welcome Email** (Sent on Signup)
- Beautiful gradient header
- Welcome message with user's name
- List of features
- Login button
- Professional footer

### **2. Password Reset Email** (Forgot Password)
- Security-focused design
- Reset password button
- Direct link (expires in 10 minutes)
- Warning about expiry
- Security notice

### **3. Reset Confirmation Email** (After Reset)
- Success message
- Login button
- Security alert if user didn't make the change

---

## 🔒 Security Features

✅ **Token Expiry:** Reset tokens expire in 10 minutes  
✅ **Hashed Tokens:** Tokens are hashed before storing in database  
✅ **One-Time Use:** Tokens are deleted after successful reset  
✅ **No User Enumeration:** Same message whether email exists or not  
✅ **Secure Password Storage:** Passwords hashed with bcrypt  

---

## 🐛 Troubleshooting

### **Problem 1: Emails not sending**

**Solution:**
- Check if 2-Step Verification is enabled
- Verify app password is correct (16 characters, no spaces)
- Check `.env` file has correct values
- Look at backend console for error messages
- Check Gmail "Less secure app access" is NOT blocking

### **Problem 2: "Invalid credentials" error**

**Solution:**
- Make sure you're using **App Password**, not regular Gmail password
- Remove all spaces from app password
- Regenerate app password if needed

### **Problem 3: Emails going to spam**

**Solution:**
- This is normal for development
- Check spam/junk folder
- Mark as "Not Spam" to train Gmail
- In production, use proper domain and SPF/DKIM records

### **Problem 4: "Connection timeout" error**

**Solution:**
- Check your internet connection
- Verify firewall isn't blocking port 587
- Try using port 465 instead (change in `emailService.js`)

### **Problem 5: Reset link not working**

**Solution:**
- Check if link was clicked within 10 minutes
- Verify `CLIENT_URL` in `.env` matches your frontend URL
- Check browser console for errors
- Make sure token in URL is complete (not truncated)

---

## 📝 API Endpoints

### **POST /api/auth/register**
- Registers new user
- Sends welcome email
- Returns JWT token

### **POST /api/auth/login**
- Authenticates user
- Returns JWT token

### **POST /api/auth/forgot-password**
- Accepts: `{ email }`
- Sends password reset email
- Returns success message

### **POST /api/auth/reset-password/:token**
- Accepts: `{ password }`
- Resets password with token
- Sends confirmation email
- Returns success message

---

## 🎯 Frontend Routes

- `/login` - Login page with "Forgot Password?" link
- `/signup` - Signup page (sends welcome email)
- `/forgot-password` - Request password reset
- `/reset-password/:token` - Reset password with token

---

## 🚀 Production Deployment

When deploying to production:

1. **Update Environment Variables:**
```env
CLIENT_URL=https://your-production-domain.com
NODE_ENV=production
```

2. **Use Custom Domain Email (Optional):**
   - Consider using SendGrid, AWS SES, or Mailgun for production
   - Gmail has daily sending limits (500 emails/day)

3. **Add Email Verification:**
   - Consider adding email verification on signup
   - Prevent spam accounts

4. **Monitor Email Delivery:**
   - Track email delivery rates
   - Monitor bounce rates
   - Check spam complaints

---

## 📊 Email Sending Limits

**Gmail Free Account:**
- 500 emails per day
- 100 recipients per email
- Good for development and small apps

**For Production:**
- Use professional email service (SendGrid, AWS SES, Mailgun)
- Better deliverability
- Higher limits
- Analytics and tracking

---

## 🎨 Customization

### **Change Email Templates:**

Edit `backend/utils/emailService.js`:

```javascript
// Customize colors, text, layout
const mailOptions = {
  from: `"Your App Name" <${process.env.EMAIL_USER}>`,
  to: userEmail,
  subject: 'Your Custom Subject',
  html: `Your custom HTML template`
};
```

### **Change Token Expiry:**

Edit `backend/models/User.js`:

```javascript
// Change from 10 minutes to 30 minutes
this.resetPasswordExpires = Date.now() + 30 * 60 * 1000;
```

---

## ✅ Checklist

Before going live, verify:

- [ ] 2-Step Verification enabled on Gmail
- [ ] App password generated and saved
- [ ] `.env` file configured correctly
- [ ] Dependencies installed (`npm install`)
- [ ] Backend server running without errors
- [ ] Frontend server running
- [ ] Signup sends welcome email
- [ ] Forgot password sends reset email
- [ ] Reset link works and expires after 10 minutes
- [ ] Confirmation email sent after reset
- [ ] All emails have correct branding
- [ ] Links in emails work correctly

---

## 📞 Support

If you encounter issues:

1. Check backend console for error messages
2. Verify all environment variables are set
3. Test with a different email address
4. Check Gmail spam folder
5. Review troubleshooting section above

---

## 🎉 Success!

If everything works:
- ✅ Users can sign up and receive welcome email
- ✅ Users can reset forgotten passwords via email
- ✅ All emails are beautifully designed
- ✅ Security is maintained with token expiry

**Happy coding! 🚀**
