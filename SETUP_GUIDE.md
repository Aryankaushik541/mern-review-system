# 🚀 MERN Review System - Complete Setup Guide

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MongoDB Atlas Account** (or local MongoDB) - [Sign Up](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)

## 📦 Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/Aryankaushik541/mern-review-system.git
cd mern-review-system
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Environment configuration is already set up in .env file
# The .env file includes:
# - MongoDB connection string
# - JWT secret key
# - Server port (5000)
# - CORS configuration

# Start the backend server
npm start
```

**Backend will run on:** `http://localhost:5000`

### 3. Frontend Setup

Open a **new terminal** window:

```bash
# Navigate to client folder
cd client

# Install dependencies
npm install

# Environment configuration is already set up in .env file
# The .env file includes:
# - Backend API URL
# - Feature flags
# - UI configuration

# Start the frontend
npm start
```

**Frontend will run on:** `http://localhost:3000`

## 🔧 Environment Configuration

### Backend (.env)

The backend `.env` file is already configured with:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://aryankaushik541_db_user:wiA6zyP8cWjaq5Bu@cluster0.cikdgjg.mongodb.net/feedbackDB?retryWrites=true&w=majority

# Server Configuration
PORT=5000
JWT_SECRET=4f8e9a6c2d1b7e3a9c5f8a2d6e1b9c4f7a8e2d5c6b1a9f3e8d4c7b5
JWT_EXPIRES_IN=7d

# CORS
CLIENT_URL=http://localhost:3000

# Environment
NODE_ENV=development
```

### Frontend (.env)

The frontend `.env` file is already configured with:

```env
# Backend API
REACT_APP_API_URL=http://localhost:5000

# App Info
REACT_APP_NAME=MERN Review System
REACT_APP_VERSION=2.0.0

# Features
REACT_APP_ENABLE_STAR_RATING=true
REACT_APP_ENABLE_NESTED_COMMENTS=true
REACT_APP_ENABLE_PUBLIC_REVIEWS=true

# UI Settings
REACT_APP_REVIEWS_PER_PAGE=10
REACT_APP_MIN_COMMENT_LENGTH=10
REACT_APP_MAX_COMMENT_LENGTH=1000
```

## 🗄️ Database Setup

### Option 1: Using Existing MongoDB Atlas (Recommended)

The project is already configured with a MongoDB Atlas connection. **No additional setup needed!**

### Option 2: Using Your Own MongoDB Atlas

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user
4. Get your connection string
5. Update `MONGODB_URI` in `backend/.env`

### Option 3: Using Local MongoDB

1. Install MongoDB locally
2. Update `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/feedbackDB
```

## 👤 Creating Admin Account

### Method 1: Using MongoDB Compass or Atlas

1. Connect to your database
2. Go to `users` collection
3. Create a new document:

```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "$2a$10$YourHashedPasswordHere",
  "role": "admin",
  "isActive": true,
  "loginCount": 0,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### Method 2: Using Signup + Manual Role Change

1. Sign up normally through the app
2. Go to MongoDB and change the user's `role` from `"user"` to `"admin"`

### Method 3: Using Node.js Script

Create `backend/createAdmin.js`:

```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  const hashedPassword = await bcrypt.hash('admin123', 10);
  
  const admin = new User({
    name: 'Admin',
    email: 'admin@example.com',
    password: hashedPassword,
    role: 'admin',
    isActive: true,
    loginCount: 0
  });
  
  await admin.save();
  console.log('Admin created successfully!');
  process.exit(0);
}

createAdmin();
```

Run: `node backend/createAdmin.js`

## 🎯 Testing the Application

### 1. Test Public Access
- Open `http://localhost:3000`
- You should see reviews without logging in ✅

### 2. Test User Registration
- Click "Sign Up"
- Create a new account
- Login with credentials

### 3. Test Review Submission
- Login as a user
- Click "Write a Review"
- Select star rating
- Write comment (minimum 10 characters)
- Submit

### 4. Test Nested Comments
- Login as any user
- Reply to any review
- Edit your reply
- Delete your reply

### 5. Test Admin Dashboard
- Login as admin
- Click "Admin Dashboard"
- Test all 3 tabs:
  - **Overview**: View statistics
  - **Reviews Management**: Edit/delete reviews and replies
  - **User Management**: View and manage users

## 📁 Project Structure

```
mern-review-system/
├── backend/
│   ├── models/
│   │   ├── User.js          # User model with activity tracking
│   │   └── Review.js        # Review model with nested replies
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── reviews.js       # Review CRUD routes
│   │   └── admin.js         # Admin management routes
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── .env                 # Environment variables (configured)
│   ├── .env.example         # Environment template
│   ├── server.js            # Express server
│   └── package.json
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── ReviewPage.js    # Public review page
│   │   │   ├── Dashboard.js     # Admin dashboard
│   │   │   ├── Login.js         # Login page
│   │   │   └── Signup.js        # Signup page
│   │   ├── App.js
│   │   └── index.js
│   ├── .env                 # Frontend environment (configured)
│   ├── .env.example         # Frontend template
│   └── package.json
│
├── SETUP_GUIDE.md           # This file
├── UPGRADE_GUIDE.md         # Feature documentation
└── README.md                # Project overview
```

## 🔒 Security Notes

1. **JWT Secret**: Already configured, but change in production
2. **MongoDB Credentials**: Already configured, but use your own for production
3. **CORS**: Configured for localhost, update for production
4. **Password Hashing**: Automatically handled by bcrypt
5. **Environment Files**: `.env` files are in `.gitignore`

## 🚀 Deployment

### Backend Deployment (Render/Heroku)

1. Create account on [Render](https://render.com/) or [Heroku](https://heroku.com/)
2. Create new Web Service
3. Connect your GitHub repository
4. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `CLIENT_URL` (your frontend URL)
   - `NODE_ENV=production`
5. Deploy

### Frontend Deployment (Vercel/Netlify)

1. Create account on [Vercel](https://vercel.com/) or [Netlify](https://netlify.com/)
2. Connect your GitHub repository
3. Set build command: `npm run build`
4. Set publish directory: `build`
5. Set environment variable:
   - `REACT_APP_API_URL` (your backend URL)
6. Deploy

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB connection string is correct
- Ensure port 5000 is not in use
- Run `npm install` again

### Frontend won't start
- Check if backend is running
- Ensure port 3000 is not in use
- Run `npm install` again
- Clear browser cache

### Can't login
- Check MongoDB connection
- Verify user exists in database
- Check JWT_SECRET is set

### Reviews not showing
- Check backend console for errors
- Verify MongoDB connection
- Check browser console for errors

## 📞 Support

For issues or questions:
1. Check this guide first
2. Review `UPGRADE_GUIDE.md` for features
3. Check GitHub Issues
4. Contact: aryankaushik541@gmail.com

## ✅ Quick Start Checklist

- [ ] Node.js installed
- [ ] Repository cloned
- [ ] Backend dependencies installed (`cd backend && npm install`)
- [ ] Frontend dependencies installed (`cd client && npm install`)
- [ ] Environment files configured (already done!)
- [ ] Backend running (`cd backend && npm start`)
- [ ] Frontend running (`cd client && npm start`)
- [ ] Admin account created
- [ ] Tested public review viewing
- [ ] Tested user registration
- [ ] Tested review submission
- [ ] Tested admin dashboard

## 🎉 You're All Set!

Your MERN Review System is now running with:
- ✅ Public review viewing
- ✅ Star rating system
- ✅ Unlimited nested comments
- ✅ Complete admin dashboard
- ✅ User management
- ✅ Activity tracking

Enjoy! 🚀
