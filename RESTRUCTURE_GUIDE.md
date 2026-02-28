# 📁 Repository Restructure Guide

## ✅ New Folder Structure

The repository has been reorganized into separate `backend` and `frontend` folders for better organization:

```
mern-review-system/
├── backend/                    # Backend Node.js/Express API
│   ├── models/
│   │   ├── User.js
│   │   └── Review.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── reviews.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/                   # Frontend React App
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Login.js
│   │   │   ├── Signup.js
│   │   │   ├── ReviewPage.js
│   │   │   ├── Dashboard.js
│   │   │   ├── Auth.css
│   │   │   ├── ReviewPage.css
│   │   │   └── Dashboard.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   └── README.md
│
├── README.md                   # Main documentation
├── SETUP_GUIDE.md             # Hindi setup guide
├── CHANGELOG.md               # All changes documented
└── RESTRUCTURE_GUIDE.md       # This file
```

## 🚀 Quick Setup (New Structure)

### 1. Clone Repository
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

# Create .env file
cp .env.example .env

# Edit .env and add your MongoDB URI and JWT secret
# MONGODB_URI=mongodb://localhost:27017/review-system
# PORT=5000
# JWT_SECRET=your-secret-key

# Run backend
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup (New Terminal)
```bash
# Navigate to frontend folder (from root)
cd frontend

# Install dependencies
npm install

# Run frontend
npm start
```

Frontend will run on `http://localhost:3000`

## 📋 What Changed?

### Before (Old Structure):
```
mern-review-system/
├── models/
├── routes/
├── middleware/
├── client/
│   └── src/
├── server.js
└── package.json
```

### After (New Structure):
```
mern-review-system/
├── backend/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    └── package.json
```

## ✨ Benefits of New Structure

1. **Clear Separation** - Backend and frontend are completely separate
2. **Independent Deployment** - Deploy backend and frontend separately
3. **Better Organization** - Each folder has its own README and dependencies
4. **Easier Collaboration** - Team members can work on backend/frontend independently
5. **Scalability** - Easy to add microservices or additional frontends

## 🔄 Migration Steps (If you have old code)

If you were using the old structure, here's how to migrate:

### 1. Move Backend Files
```bash
# Create backend folder
mkdir backend

# Move backend files
mv models backend/
mv routes backend/
mv middleware backend/
mv server.js backend/
mv package.json backend/
mv .env.example backend/
```

### 2. Move Frontend Files
```bash
# Rename client to frontend
mv client frontend

# Or if you want to keep client name:
# Just update the folder name in documentation
```

### 3. Update package.json scripts

**Backend package.json:**
```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

**Frontend package.json:**
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "proxy": "http://localhost:5000"
}
```

## 🛠️ Development Workflow

### Running Both Servers

**Option 1: Two Terminals**
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

**Option 2: Using concurrently (Optional)**

Create a root `package.json`:
```json
{
  "name": "mern-review-system",
  "scripts": {
    "install-all": "cd backend && npm install && cd ../frontend && npm install",
    "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm start\"",
    "start": "cd backend && npm start"
  },
  "devDependencies": {
    "concurrently": "^8.0.1"
  }
}
```

Then run:
```bash
npm install
npm run install-all
npm run dev
```

## 📝 Important Notes

### Environment Variables
- **Backend:** Create `.env` in `backend/` folder
- **Frontend:** No .env needed (uses proxy)

### API Calls
Frontend makes API calls to `http://localhost:5000` via proxy configuration.

### Deployment
- **Backend:** Deploy to Heroku, Railway, Render, etc.
- **Frontend:** Deploy to Vercel, Netlify, etc.
- Update frontend API URL for production

## 🔗 Useful Commands

### Backend
```bash
cd backend
npm install          # Install dependencies
npm run dev          # Run with nodemon
npm start            # Run production
```

### Frontend
```bash
cd frontend
npm install          # Install dependencies
npm start            # Run development server
npm run build        # Build for production
```

## 📚 Documentation

- **Main README:** `/README.md` - Complete project documentation
- **Backend README:** `/backend/README.md` - Backend API documentation
- **Frontend README:** `/frontend/README.md` - Frontend documentation
- **Setup Guide:** `/SETUP_GUIDE.md` - Hindi setup guide
- **Changelog:** `/CHANGELOG.md` - All changes documented

## 🎯 Next Steps

1. ✅ Clone the repository
2. ✅ Setup backend (install dependencies, create .env)
3. ✅ Setup frontend (install dependencies)
4. ✅ Run both servers
5. ✅ Test the application
6. ✅ Start developing!

## 🤝 Contributing

With the new structure:
- Backend changes go in `backend/` folder
- Frontend changes go in `frontend/` folder
- Update respective READMEs when adding features

## 📞 Need Help?

- Check individual README files in backend/frontend folders
- Refer to SETUP_GUIDE.md for detailed Hindi instructions
- Check CHANGELOG.md for recent updates

---

Happy Coding! 🚀
