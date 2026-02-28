# 🚀 Quick Setup Guide (Hindi)

## Step 1: Repository Clone Karo

```bash
git clone https://github.com/Aryankaushik541/mern-review-system.git
cd mern-review-system
```

## Step 2: Backend Setup

### Dependencies Install Karo
```bash
npm install
```

### Environment Variables Setup
```bash
# .env file banao root directory mein
cp .env.example .env
```

`.env` file mein ye add karo:
```env
MONGODB_URI=mongodb://localhost:27017/review-system
PORT=5000
JWT_SECRET=apna-secret-key-yahan-daalo
```

**Note:** Agar MongoDB Atlas use kar rahe ho, to connection string wahan se copy karo.

## Step 3: Frontend Setup

```bash
cd client
npm install
cd ..
```

## Step 4: MongoDB Start Karo

### Local MongoDB ke liye:
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

### MongoDB Atlas ke liye:
- Atlas account banao
- Cluster create karo
- Connection string copy karke .env mein paste karo

## Step 5: Application Run Karo

### Option 1: Dono separately run karo

**Terminal 1 - Backend:**
```bash
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm start
```

### Option 2: Ek saath run karo
```bash
npm run dev:full
```

## Step 6: Application Access Karo

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000

## 🎯 First Time Use

### User Account Banao
1. Browser mein `http://localhost:3000` kholo
2. "Sign up here" link pe click karo
3. Details bharo:
   - Name
   - Email
   - Password (minimum 6 characters)
   - Account Type: **User** select karo
4. "Sign Up" button click karo
5. Automatically login ho jaoge aur reviews page pe redirect ho jaoge

### Admin Account Banao
1. Signup page pe jao
2. Details bharo
3. Account Type: **Admin** select karo
4. Sign up karo
5. Admin dashboard pe redirect ho jaoge

## 📱 Features Test Karo

### User ke liye:
1. Login karo
2. "Write a Review" button click karo
3. Rating select karo (1-5 stars)
4. Review likho
5. Submit karo
6. Filters use karke reviews dekho

### Admin ke liye:
1. Admin login karo
2. Dashboard pe statistics dekho
3. Reviews ko reply karo
4. Inappropriate reviews delete karo

## ⚠️ Common Issues & Solutions

### Issue 1: MongoDB connection error
**Solution:** 
- Check karo MongoDB running hai ya nahi
- Connection string sahi hai ya nahi .env mein

### Issue 2: Port already in use
**Solution:**
```bash
# Backend port change karo .env mein
PORT=5001

# Ya running process ko kill karo
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue 3: Dependencies install nahi ho rahe
**Solution:**
```bash
# Cache clear karo
npm cache clean --force

# Phir se install karo
npm install
```

### Issue 4: JWT token error
**Solution:**
- .env file mein JWT_SECRET set karo
- Server restart karo

## 🔧 Development Tips

### Backend changes ke liye:
- `nodemon` automatically restart karega server ko
- Console mein errors check karo

### Frontend changes ke liye:
- React automatically reload karega
- Browser console mein errors check karo

### Database check karne ke liye:
```bash
# MongoDB shell open karo
mongosh

# Database select karo
use review-system

# Collections dekho
show collections

# Users dekho
db.users.find().pretty()

# Reviews dekho
db.reviews.find().pretty()
```

## 📞 Help Chahiye?

Agar koi problem aa rahi hai to:
1. Error message carefully padho
2. Console logs check karo (browser aur terminal dono)
3. .env file sahi se configured hai check karo
4. MongoDB running hai check karo
5. Dependencies properly installed hain check karo

## 🎉 Success!

Agar sab kuch sahi se setup ho gaya hai to:
- ✅ Backend running on port 5000
- ✅ Frontend running on port 3000
- ✅ MongoDB connected
- ✅ Login/Signup working
- ✅ Reviews submit ho rahe hain
- ✅ Admin dashboard accessible hai

Happy Coding! 🚀
