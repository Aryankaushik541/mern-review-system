# 🌟 MERN Review System with Authentication

A complete full-stack review management system built with MongoDB, Express, React, and Node.js. Features modern UI design, user authentication, role-based access control, and real-time review management.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## 📁 Project Structure

```
mern-review-system/
├── backend/                    # Backend Node.js/Express API
│   ├── models/
│   │   ├── User.js            # User model with authentication
│   │   └── Review.js          # Review model
│   ├── routes/
│   │   ├── auth.js            # Authentication routes
│   │   └── reviews.js         # Review CRUD routes
│   ├── middleware/
│   │   └── auth.js            # JWT authentication middleware
│   ├── server.js              # Express server
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── client/                     # Frontend React App
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js       # Login page
│   │   │   ├── Signup.js      # Signup page
│   │   │   ├── ReviewPage.js  # User review page
│   │   │   ├── Dashboard.js   # Admin dashboard
│   │   │   ├── Auth.css
│   │   │   ├── ReviewPage.css
│   │   │   └── Dashboard.css
│   │   ├── App.js             # Main app with routes
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
└── Documentation
    ├── README.md              # This file
    ├── SETUP_GUIDE.md         # Hindi setup guide
    ├── CHANGELOG.md           # All changes
    └── LICENSE
```

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

## 🚀 Quick Setup

### 1. Clone Repository
```bash
git clone https://github.com/Aryankaushik541/mern-review-system.git
cd mern-review-system
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `backend/.env`:
```env
MONGODB_URI=mongodb://localhost:27017/review-system
PORT=5000
JWT_SECRET=your-secret-key-here
```

### 3. Frontend Setup

```bash
# Navigate to client folder (from root)
cd client

# Install dependencies
npm install
```

### 4. Run Application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

**Access:**
- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

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

## 📱 Usage Guide

### For Users:
1. **Sign Up** - Navigate to `/signup`, select "User" as account type
2. **Login** - Go to `/login` with your credentials
3. **Submit Review** - Click "Write a Review", rate and submit
4. **View Reviews** - Browse all reviews with filters

### For Admins:
1. **Sign Up** - Navigate to `/signup`, select "Admin" as account type
2. **Login** - Access admin dashboard at `/admin/dashboard`
3. **Manage Reviews** - Reply to reviews, delete inappropriate content

## 🎨 Tech Stack

**Backend:**
- Node.js, Express.js
- MongoDB, Mongoose
- JWT, Bcrypt
- CORS, Body-parser

**Frontend:**
- React 18
- React Router v6
- CSS3 with gradients
- Fetch API

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected API routes
- Role-based access control
- Input validation
- Environment variables for sensitive data

## 📚 Documentation

- **Backend README:** `backend/README.md` - Backend API documentation
- **Setup Guide (Hindi):** `SETUP_GUIDE.md` - Detailed Hindi setup guide
- **Changelog:** `CHANGELOG.md` - All updates and changes

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

## 👨‍💻 Author

**Aryan Kaushik**
- GitHub: [@Aryankaushik541](https://github.com/Aryankaushik541)
- Repository: [mern-review-system](https://github.com/Aryankaushik541/mern-review-system)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

⭐ If you found this project helpful, please give it a star!
