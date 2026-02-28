# 🌟 Premium MERN Review System

A professional, full-featured review management system built with the MERN stack, designed with a premium Booking.com-inspired interface. Perfect for hotels, restaurants, services, or any business needing customer reviews.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)

## ✨ Key Features

### 🎯 **Public Review Dashboard**
- ✅ **No login required** to view reviews
- ✅ Browse all customer reviews freely
- ✅ Filter by rating and sort options
- ✅ Beautiful Booking.com-style interface

### ⭐ **Star Rating System**
- ✅ Visual 5-star rating display
- ✅ Interactive star selection
- ✅ Color-coded ratings (Excellent, Good, Average, Poor)
- ✅ Category-wise ratings breakdown

### 💬 **Nested Comments (Reddit/Facebook Style)**
- ✅ **Unlimited replies** on any review
- ✅ Threaded conversations
- ✅ Edit and delete your own replies
- ✅ Admin can manage all replies
- ✅ Visual distinction for admin vs user replies
- ✅ Timestamps and "edited" indicators

### 👑 **Premium Admin Dashboard**

#### **Overview Tab** 📊
- Total users, active users, admins
- Total reviews and average rating
- Total replies across platform
- Login statistics
- Recent activity feeds

#### **Reviews Management** ⭐
- View all reviews with full details
- Edit any review (rating + comment)
- Unlimited reply capability
- Edit/delete any reply
- Visual star ratings
- Edited indicators

#### **User Management** 👥
- Complete user information table
- View login counts and activity
- Active/inactive status
- Delete users
- Role management

### 📈 **Activity Tracking**
- Login count per user
- Last login timestamp
- Active/inactive user status
- Total platform analytics

## 🎨 Design Highlights

- **Booking.com-inspired** premium interface
- **Gradient backgrounds** and modern shadows
- **Smooth animations** and transitions
- **Responsive design** for all devices
- **Color-coded ratings** for quick insights
- **Professional typography** and spacing

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
npm start

# Frontend setup (new terminal)
cd client
npm install
npm start
```

**That's it!** Environment files are already configured. 

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

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
│   ├── .env                 # Environment variables (configured)
│   └── server.js            # Express server
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── ReviewPage.js    # Public review page
│   │   │   ├── Dashboard.js     # Admin dashboard
│   │   │   ├── Login.js         # Login page
│   │   │   └── Signup.js        # Signup page
│   │   └── App.js
│   └── .env                 # Frontend config (configured)
│
├── SETUP_GUIDE.md           # Detailed setup instructions
├── UPGRADE_GUIDE.md         # Feature documentation
└── README.md                # This file
```

## 🔧 Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **CSS3** - Styling (Booking.com design)
- **Fetch API** - HTTP requests

## 🎯 Usage Guide

### For Visitors (No Login Required)
1. Visit the homepage
2. Browse all reviews
3. Filter by rating
4. Sort by date or rating

### For Users
1. **Sign Up** - Create an account
2. **Login** - Access your account
3. **Write Review** - Submit reviews with star ratings
4. **Reply** - Engage in conversations
5. **Edit/Delete** - Manage your replies

### For Admins
1. **Login** - Use admin credentials
2. **Dashboard** - Access admin panel
3. **Overview** - View statistics
4. **Manage Reviews** - Edit, reply, delete
5. **Manage Users** - View and control users

## 🔐 Security Features

- ✅ JWT authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control
- ✅ Input validation
- ✅ Protected admin routes
- ✅ Secure environment variables

## 📊 API Endpoints

### Public Routes
```
GET  /api/reviews           # Get all reviews
GET  /api/reviews/:id       # Get single review
```

### User Routes (Auth Required)
```
POST /api/auth/signup       # Register user
POST /api/auth/login        # Login user
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
PUT    /api/admin/users/:id # Update user
DELETE /api/admin/users/:id # Delete user
GET    /api/admin/reviews   # All reviews
PUT    /api/reviews/:id     # Edit any review
DELETE /api/reviews/:id     # Delete any review
```

## 🌐 Deployment

### Backend (Render/Heroku)
1. Create account on [Render](https://render.com/)
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Create account on [Vercel](https://vercel.com/)
2. Connect GitHub repository
3. Set `REACT_APP_API_URL` to backend URL
4. Deploy

**Detailed deployment guide:** See `SETUP_GUIDE.md`

## 📸 Screenshots

### Public Review Page
- Premium Booking.com-style interface
- Star ratings and category breakdown
- Filter and sort options
- Nested comment threads

### Admin Dashboard
- Overview with statistics
- Reviews management interface
- User management table
- Premium design throughout

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
- Email: aryankaushik541@gmail.com

## 🙏 Acknowledgments

- Design inspired by Booking.com
- Built with MERN stack
- Icons and emojis for better UX

## 📞 Support

For issues or questions:
1. Check `SETUP_GUIDE.md`
2. Review `UPGRADE_GUIDE.md`
3. Open a GitHub Issue
4. Contact: aryankaushik541@gmail.com

## 🎉 Features Summary

✅ Public review viewing (no login)
✅ Star rating system (5 stars)
✅ Unlimited nested comments
✅ Complete admin dashboard
✅ User management
✅ Activity tracking
✅ Premium Booking.com design
✅ Fully responsive
✅ Production ready
✅ Easy deployment

---

**Made with ❤️ using MERN Stack**

**Ready for production deployment!** 🚀
