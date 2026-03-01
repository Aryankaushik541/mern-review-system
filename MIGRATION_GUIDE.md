# Frontend Migration Guide

The frontend has been moved to a separate repository for better organization and deployment flexibility.

## 📦 New Repository Structure

- **Backend:** https://github.com/Aryankaushik541/mern-review-system (this repo)
- **Frontend:** https://github.com/Aryankaushik541/mern-review-system-frontend

## 🔄 Migration Steps

### Option 1: Fresh Clone (Recommended)

If you're starting fresh, simply clone both repositories:

```bash
# Clone backend
git clone https://github.com/Aryankaushik541/mern-review-system.git
cd mern-review-system/backend
npm install
npm start

# Clone frontend (in a new terminal)
git clone https://github.com/Aryankaushik541/mern-review-system-frontend.git
cd mern-review-system-frontend
npm install
npm start
```

### Option 2: Update Existing Repository

If you already have this repository cloned:

```bash
# Navigate to your existing repo
cd mern-review-system

# Remove the client folder (frontend has moved)
git rm -r client
git commit -m "Remove frontend - moved to separate repository"
git push origin main

# Clone the new frontend repository
cd ..
git clone https://github.com/Aryankaushik541/mern-review-system-frontend.git
```

### Option 3: Keep Both Locally

If you want to keep the old structure locally but update from remote:

```bash
# Backup your client folder
cp -r client ../client-backup

# Pull latest changes (this will remove client folder)
git pull origin main

# If you need the frontend, clone it separately
git clone https://github.com/Aryankaushik541/mern-review-system-frontend.git ../frontend
```

## 🚀 Running the Application

### Backend
```bash
cd mern-review-system/backend
npm install
npm start
# Runs on http://localhost:5000
```

### Frontend
```bash
cd mern-review-system-frontend
npm install
npm start
# Runs on http://localhost:3000
```

## 📝 Why Separate Repositories?

1. **Better Organization** - Clear separation of concerns
2. **Independent Deployment** - Deploy frontend and backend separately
3. **Easier Collaboration** - Different teams can work on frontend/backend
4. **Flexible Scaling** - Scale frontend and backend independently
5. **Cleaner Git History** - Separate commit histories for each part

## 🔗 Important Links

- **Backend Repo:** https://github.com/Aryankaushik541/mern-review-system
- **Frontend Repo:** https://github.com/Aryankaushik541/mern-review-system-frontend
- **Backend README:** [README.md](./README.md)
- **Frontend README:** [Frontend README](https://github.com/Aryankaushik541/mern-review-system-frontend/blob/main/README.md)

## ⚙️ Configuration Changes

### Backend (.env)
No changes needed. Keep your existing configuration.

### Frontend (.env)
Make sure `REACT_APP_API_URL` points to your backend:
```env
REACT_APP_API_URL=http://localhost:5000
```

For production:
```env
REACT_APP_API_URL=https://your-backend-url.com
```

## 🐛 Troubleshooting

### Issue: "Client folder not found"
**Solution:** The client folder has been moved to a separate repository. Clone the frontend repo separately.

### Issue: "Cannot connect to backend"
**Solution:** Make sure:
1. Backend is running on port 5000
2. Frontend `.env` has correct `REACT_APP_API_URL`
3. CORS is configured in backend

### Issue: "Old commits reference client folder"
**Solution:** This is normal. Git history is preserved. The client folder was removed in recent commits.

## 📞 Support

If you encounter any issues during migration:
1. Check this guide
2. Review the README files in both repositories
3. Open an issue on the respective repository

---

**Happy Coding!** 🚀
