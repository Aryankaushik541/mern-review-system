# 🌟 MERN Review System - Backend

**Backend API** for a professional, full-featured review management system built with Node.js, Express, and MongoDB. Designed with a premium Booking.com-inspired interface.

> **Note:** Frontend has been moved to a separate repository: [mern-review-system-frontend](https://github.com/Aryankaushik541/mern-review-system-frontend)

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

## 📦 Repositories

- **Backend (this repo):** https://github.com/Aryankaushik541/mern-review-system
- **Frontend:** https://github.com/Aryankaushik541/mern-review-system-frontend

## ✨ Backend Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin/User)
- Password hashing with bcrypt
- Login activity tracking
- Secure password reset with email

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
- Complete dashboard statistics
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
- Node.js (v14+)
- MongoDB Atlas account (or local MongoDB)
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/Aryankaushik541/mern-review-system.git
cd mern-review-system

# Backend setup
cd backend
npm install

# Configure environment (already set up)
# Edit .env if needed for your MongoDB connection

# Start server
npm start
```

**Backend runs on:** `http://localhost:5000`

### Frontend Setup

Clone and set up the frontend separately:

```bash
git clone https://github.com/Aryankaushik541/mern-review-system-frontend.git
cd mern-review-system-frontend
npm install
npm start
```

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
│   │   └── auth.js          # JWT authentication
│   ├── .env                 # Environment variables
│   ├── .env.example         # Environment template
│   └── server.js            # Express server
│
├── EMAIL_SETUP_GUIDE.md     # Email configuration guide
├── SETUP_GUIDE.md           # Detailed setup instructions
├── UPGRADE_GUIDE.md         # Feature documentation
├── FORGOT_PASSWORD_FEATURE.md # Password reset guide
└── README.md                # This file
```

## 🔧 Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **Nodemailer** - Email service

## 📊 API Endpoints

### Public Routes
```
GET  /api/reviews           # Get all reviews
GET  /api/reviews/:id       # Get single review
GET  /api/reviews/:id/replies # Get review replies
```

### Authentication Routes
```
POST /api/auth/signup       # Register user
POST /api/auth/login        # Login user
POST /api/auth/forgot-password # Request password reset
POST /api/auth/reset-password/:token # Reset password
```

### User Routes (Auth Required)
```
POST /api/reviews           # Create review
POST /api/reviews/:id/reply # Add reply
PUT  /api/reviews/:id       # Edit own review
PUT  /api/reviews/:reviewId/reply/:replyId  # Edit own reply
DELETE /api/reviews/:reviewId/reply/:replyId # Delete own reply
```

### Admin Routes (Admin Auth Required)
```
GET    /api/admin/stats     # Dashboard statistics
GET    /api/admin/users     # All users
GET    /api/admin/users/:id # User details
PUT    /api/admin/users/:id # Update user (role change)
DELETE /api/admin/users/:id # Delete user
GET    /api/admin/reviews   # All reviews
PUT    /api/reviews/:id     # Edit any review
DELETE /api/reviews/:id     # Delete any review
```

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# JWT Secret
JWT_SECRET=your_jwt_secret_key

# Email Configuration (for password reset)
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
EMAIL_FROM=noreply@yourapp.com

# Frontend URL (for CORS and email links)
FRONTEND_URL=http://localhost:3000
```

See `.env.example` for a template.

## 🌐 Deployment

### Backend Deployment (Render/Heroku)

1. Create account on [Render](https://render.com/)
2. Connect GitHub repository
3. Set environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `EMAIL_USER`
   - `EMAIL_PASS`
   - `FRONTEND_URL`
4. Deploy

### Frontend Deployment

See the [frontend repository](https://github.com/Aryankaushik541/mern-review-system-frontend) for deployment instructions.

## 🔒 Security Features

- ✅ JWT authentication
- ✅ Password hashing with bcrypt (10 rounds)
- ✅ Role-based access control
- ✅ Input validation
- ✅ Protected admin routes
- ✅ Secure environment variables
- ✅ CORS configuration
- ✅ Password reset tokens with expiration

## 📧 Email Setup

For password reset functionality, configure email settings:

1. Use Gmail or any SMTP service
2. Generate app-specific password
3. Update `.env` with credentials

See `EMAIL_SETUP_GUIDE.md` for detailed instructions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Aryan Kaushik**
- GitHub: [@Aryankaushik541](https://github.com/Aryankaushik541)

## 📞 Support

For issues or questions:
1. Check `SETUP_GUIDE.md`
2. Review `UPGRADE_GUIDE.md`
3. Check `EMAIL_SETUP_GUIDE.md` for email issues
4. Open a GitHub Issue

## 🎉 Features Summary

✅ JWT Authentication
✅ Role-based access control
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

**Ready for production deployment!** 🚀
