# 🌟 MERN Review System with Authentication

A complete full-stack review management system built with MongoDB, Express, React, and Node.js. Features modern UI design, user authentication, role-based access control, and real-time review management.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![License](https://img.shields.io/badge/license-MIT-blue)

## 📁 Project Structure

```
mern-review-system/
├── backend/                    # Backend Node.js/Express API
│   ├── models/                 # MongoDB models
│   ├── routes/                 # API routes
│   ├── middleware/             # Authentication middleware
│   ├── server.js              # Express server
│   ├── package.json
│   └── .env.example
│
├── client/                     # Frontend React App (use this)
│   ├── public/
│   ├── src/
│   │   ├── pages/             # React pages
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── Documentation files
```

## ✨ Features

### 🔐 Authentication System
- User Registration & Login with JWT tokens
- Role-Based Access Control (User & Admin)
- Protected API routes
- Password encryption with Bcrypt

### 👥 User Features
- Modern Booking.com-inspired UI
- Submit reviews with 1-5 star ratings
- View all reviews with filters
- Category-based ratings
- Real-time statistics

### 👨‍💼 Admin Features
- Comprehensive dashboard
- Review management
- Reply to reviews
- Delete inappropriate reviews
- Visual analytics

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

- Frontend: `http://localhost:3000`
- Backend API: `http://localhost:5000`

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (Protected)

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create review (Protected)
- `PUT /api/reviews/:id/reply` - Add admin reply (Admin only)
- `DELETE /api/reviews/:id` - Delete review (Admin only)

## 📱 Usage

### For Users:
1. Sign up at `/signup` (select "User")
2. Login at `/login`
3. View and submit reviews at `/reviews`

### For Admins:
1. Sign up at `/signup` (select "Admin")
2. Login at `/login`
3. Access dashboard at `/admin/dashboard`
4. Manage reviews, reply, and delete

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

## 🔒 Security

- JWT authentication
- Password hashing (bcrypt)
- Protected routes
- Role-based access
- Input validation
- Environment variables

## 📚 Documentation

- **Backend README:** `backend/README.md`
- **Setup Guide (Hindi):** `SETUP_GUIDE.md`
- **Changelog:** `CHANGELOG.md`

## 🚧 Future Enhancements

- Email verification
- Password reset
- Image uploads
- Review voting
- Analytics dashboard
- Export to CSV/PDF
- Dark mode

## 👨‍💻 Author

**Aryan Kaushik**
- GitHub: [@Aryankaushik541](https://github.com/Aryankaushik541)

## 📝 License

MIT License

---

⭐ Star this repo if you found it helpful!
