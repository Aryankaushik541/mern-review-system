# 🌟 MERN Review System with Authentication

A complete full-stack review management system built with MongoDB, Express, React, and Node.js. Features modern UI design, user authentication, role-based access control, and real-time review management.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## ✨ Features

### 🔐 Authentication System
- **User Registration & Login** - Secure signup and login with JWT tokens
- **Role-Based Access Control** - Separate user and admin roles
- **Protected Routes** - Secure API endpoints with middleware
- **Password Encryption** - Bcrypt hashing for secure password storage

### 👥 User Features
- Modern, responsive review interface
- Submit reviews with ratings (1-5 stars)
- View all reviews with filters and sorting
- Category-based rating display
- Real-time statistics and analytics
- Beautiful gradient UI design

### 👨‍💼 Admin Features
- Comprehensive admin dashboard
- Review management with statistics
- Reply to customer reviews
- Delete inappropriate reviews
- Track pending and replied reviews
- Visual analytics with stat cards

### 🎨 Modern UI/UX
- Booking.com-inspired design
- Responsive layout for all devices
- Smooth animations and transitions
- Gradient color schemes
- Interactive filters and sorting
- Modal-based review submission

## 🚀 Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **CSS3** - Styling with gradients and animations
- **Fetch API** - HTTP requests

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Aryankaushik541/mern-review-system.git
cd mern-review-system
```

### 2. Backend Setup

```bash
# Install backend dependencies
npm install

# Create .env file in root directory
touch .env
```

Add the following to your `.env` file:
```env
MONGODB_URI=mongodb://localhost:27017/review-system
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/review-system

PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 3. Frontend Setup

```bash
# Navigate to client directory
cd client

# Install frontend dependencies
npm install
```

### 4. Run the Application

**Option 1: Run Backend and Frontend Separately**

Terminal 1 (Backend):
```bash
# From root directory
npm run dev
```

Terminal 2 (Frontend):
```bash
# From client directory
cd client
npm start
```

**Option 2: Run Both Concurrently**
```bash
# From root directory
npm run dev:full
```

The application will be available at:
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000`

## 📱 Usage Guide

### For Users

1. **Sign Up**
   - Navigate to `/signup`
   - Fill in your details
   - Select "User" as account type
   - Click "Sign Up"

2. **Login**
   - Go to `/login`
   - Enter your credentials
   - You'll be redirected to the reviews page

3. **Submit a Review**
   - Click "Write a Review" button
   - Select rating (1-5 stars)
   - Write your review
   - Submit

4. **View Reviews**
   - Browse all reviews on the main page
   - Use filters to sort by rating
   - See admin replies to reviews

### For Admins

1. **Sign Up as Admin**
   - Navigate to `/signup`
   - Fill in your details
   - Select "Admin" as account type
   - Click "Sign Up"

2. **Access Dashboard**
   - Login with admin credentials
   - You'll be redirected to `/admin/dashboard`

3. **Manage Reviews**
   - View all reviews with statistics
   - Reply to customer reviews
   - Delete inappropriate reviews
   - Track pending replies

## 🗂️ Project Structure

```
mern-review-system/
├── client/                 # Frontend React app
│   ├── public/
│   └── src/
│       ├── pages/
│       │   ├── Login.js           # Login page
│       │   ├── Signup.js          # Signup page
│       │   ├── ReviewPage.js      # User review page
│       │   ├── Dashboard.js       # Admin dashboard
│       │   ├── Auth.css           # Auth pages styles
│       │   ├── ReviewPage.css     # Review page styles
│       │   └── Dashboard.css      # Dashboard styles
│       ├── App.js                 # Main app with routes
│       └── index.js
├── models/
│   ├── User.js            # User model with auth
│   └── Review.js          # Review model
├── routes/
│   ├── auth.js            # Authentication routes
│   └── reviews.js         # Review routes
├── middleware/
│   └── auth.js            # Auth middleware
├── server.js              # Express server
├── package.json
└── README.md
```

## 🔑 API Endpoints

### Authentication
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login       - Login user
GET    /api/auth/me          - Get current user (Protected)
```

### Reviews
```
GET    /api/reviews          - Get all reviews
GET    /api/reviews/:id      - Get single review
POST   /api/reviews          - Create review (Protected - User)
PUT    /api/reviews/:id/reply - Add admin reply (Protected - Admin)
DELETE /api/reviews/:id      - Delete review (Protected - Admin)
```

## 🎨 Design Features

### Color Scheme
- Primary Gradient: `#667eea` to `#764ba2`
- Success: `#4caf50`
- Warning: `#ff8c00`
- Error: `#d32f2f`
- Info: `#0071c2`

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based access control
- Input validation
- CORS enabled
- Environment variables for sensitive data

## 🚧 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Image upload for reviews
- [ ] Review voting system
- [ ] Advanced analytics dashboard
- [ ] Export reviews to CSV/PDF
- [ ] Multi-language support
- [ ] Dark mode theme

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aryan Kaushik**
- GitHub: [@Aryankaushik541](https://github.com/Aryankaushik541)

## 🙏 Acknowledgments

- Design inspiration from Booking.com
- MERN Stack community
- All contributors and users

---

⭐ If you found this project helpful, please give it a star!
