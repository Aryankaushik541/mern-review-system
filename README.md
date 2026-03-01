# 🚀 MERN Review System - Backend API

**Professional RESTful API** for a full-featured review management system built with Node.js, Express, and MongoDB.

> **Frontend Repository:** [mern-review-system-frontend](https://github.com/Aryankaushik541/mern-review-system-frontend)

![Node.js](https://img.shields.io/badge/Node.js-v14+-green)
![Express](https://img.shields.io/badge/Express-v4.18-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-success)
![License](https://img.shields.io/badge/License-MIT-blue)

## 📦 Repository Links

- **Backend (this repo):** https://github.com/Aryankaushik541/mern-review-system
- **Frontend:** https://github.com/Aryankaushik541/mern-review-system-frontend

## ✨ Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin/User)
- Password hashing with bcrypt
- Login activity tracking
- Password reset via email

### ⭐ Review Management
- CRUD operations for reviews
- Star rating system (1-5 stars)
- Category-wise ratings
- Booking.com integration support
- Review editing with history tracking

### 💬 Nested Comments System
- Unlimited reply depth
- Edit and delete replies
- Admin moderation capabilities
- Timestamp tracking
- User/Admin distinction

### 👑 Admin Features
- Dashboard statistics API
- User management (view, update, delete)
- Review moderation
- Activity analytics
- Role management

### 📊 Analytics & Statistics
- Total users, reviews, replies
- Average ratings calculation
- Category-wise score aggregation
- Login tracking
- Recent activity feeds

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/Aryankaushik541/mern-review-system.git
cd mern-review-system

# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI and other settings

# Start server
npm start
```

**Server runs on:** `http://localhost:5000`

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
│   ├── .env                 # Environment variables
│   ├── .env.example         # Environment template
│   ├── package.json         # Dependencies
│   └── server.js            # Express server entry point
├── .gitignore
├── LICENSE
└── README.md                # This file
```

## 🔧 Technology Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - JSON Web Tokens for auth
- **bcrypt** - Password hashing
- **Nodemailer** - Email service
- **CORS** - Cross-origin resource sharing

## 📊 API Endpoints

### Public Routes
```
GET  /api/reviews              # Get all reviews
GET  /api/reviews/:id          # Get single review
GET  /api/reviews/:id/replies  # Get review replies
```

### Authentication Routes
```
POST /api/auth/signup                    # Register new user
POST /api/auth/login                     # Login user
POST /api/auth/forgot-password           # Request password reset
POST /api/auth/reset-password/:token     # Reset password
```

### User Routes (Authentication Required)
```
POST   /api/reviews                      # Create review
POST   /api/reviews/:id/reply            # Add reply to review
PUT    /api/reviews/:id                  # Edit own review
PUT    /api/reviews/:reviewId/reply/:replyId    # Edit own reply
DELETE /api/reviews/:reviewId/reply/:replyId    # Delete own reply
```

### Admin Routes (Admin Authentication Required)
```
GET    /api/admin/stats        # Dashboard statistics
GET    /api/admin/users        # Get all users
GET    /api/admin/users/:id    # Get user details
PUT    /api/admin/users/:id    # Update user (role change)
DELETE /api/admin/users/:id    # Delete user
GET    /api/admin/reviews      # Get all reviews
PUT    /api/reviews/:id        # Edit any review
DELETE /api/reviews/:id        # Delete any review
```

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secret_jwt_key_here

# Email Configuration (for password reset)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
EMAIL_FROM=noreply@yourapp.com

# Frontend URL (for CORS and email links)
FRONTEND_URL=http://localhost:3000
```

See `.env.example` for a complete template.

## 🌐 Deployment

### Deploy to Render

1. Create account on [Render](https://render.com/)
2. Create new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`
5. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `FRONTEND_URL`
6. Deploy!

### Deploy to Heroku

```bash
# Install Heroku CLI
heroku login

# Create app
heroku create your-app-name

# Set environment variables
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
heroku config:set EMAIL_USER=your_email
heroku config:set EMAIL_PASS=your_password
heroku config:set FRONTEND_URL=your_frontend_url

# Deploy
git push heroku main
```

## 🔒 Security Features

- ✅ JWT authentication with secure tokens
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Role-based access control (RBAC)
- ✅ Input validation and sanitization
- ✅ Protected admin routes
- ✅ Secure environment variables
- ✅ CORS configuration
- ✅ Password reset tokens with expiration
- ✅ HTTP-only cookies support

## 📧 Email Configuration

For password reset functionality:

1. **Gmail Setup:**
   - Enable 2-factor authentication
   - Generate app-specific password
   - Use in `EMAIL_PASS` variable

2. **Other SMTP Services:**
   - Update Nodemailer configuration in auth routes
   - Set appropriate SMTP settings

## 🧪 Testing

```bash
# Run tests (if configured)
npm test

# Test API endpoints
# Use Postman, Thunder Client, or curl
curl http://localhost:5000/api/reviews
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aryan Kaushik**
- GitHub: [@Aryankaushik541](https://github.com/Aryankaushik541)

## 📞 Support

For issues or questions:
1. Check the documentation
2. Review API endpoints above
3. Open a GitHub Issue
4. Check the frontend repository for UI-related issues

## 🎯 Features Summary

✅ RESTful API architecture  
✅ JWT authentication  
✅ Role-based authorization  
✅ Star rating system  
✅ Nested comments/replies  
✅ Admin dashboard API  
✅ User management  
✅ Activity tracking  
✅ Password reset via email  
✅ Booking.com integration support  
✅ Production ready  
✅ Easy deployment  

---

**Made with ❤️ using Node.js, Express & MongoDB**

**Ready for production!** 🚀
