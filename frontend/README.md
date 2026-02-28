# Frontend - MERN Review System

React frontend for the MERN Review System with authentication.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Application

**Development mode:**
```bash
npm start
```

Application will run on `http://localhost:3000`

**Build for production:**
```bash
npm run build
```

## 📁 Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── pages/
│   │   ├── Login.js          # Login page
│   │   ├── Signup.js         # Signup page
│   │   ├── ReviewPage.js     # User review page
│   │   ├── Dashboard.js      # Admin dashboard
│   │   ├── Auth.css          # Auth pages styles
│   │   ├── ReviewPage.css    # Review page styles
│   │   └── Dashboard.css     # Dashboard styles
│   ├── App.js                # Main app with routes
│   ├── App.css               # App styles
│   ├── index.js              # Entry point
│   └── index.css             # Global styles
├── package.json
└── README.md
```

## 🎨 Features

### Authentication Pages
- **Login** - User/Admin login with JWT
- **Signup** - User registration with role selection

### User Pages
- **Review Page** - View and submit reviews
  - Modern Booking.com-inspired design
  - Category ratings
  - Filters and sorting
  - Review submission modal

### Admin Pages
- **Dashboard** - Admin panel
  - Statistics cards
  - Review management
  - Reply to reviews
  - Delete reviews

## 🔌 API Integration

The frontend connects to the backend API at `http://localhost:5000`

### Proxy Configuration
The `package.json` includes a proxy setting:
```json
"proxy": "http://localhost:5000"
```

This allows you to make API calls without CORS issues during development.

## 🎨 Design System

### Colors
- Primary Gradient: `#667eea` to `#764ba2`
- Success: `#4caf50`
- Warning: `#ff8c00`
- Error: `#d32f2f`
- Info: `#0071c2`

### Typography
- Font Family: System fonts (Apple, Segoe UI, Roboto, etc.)
- Headings: Bold, gradient text
- Body: Regular weight

### Components
- Cards with shadows
- Gradient buttons
- Smooth animations
- Responsive layout

## 📱 Responsive Design

- **Desktop:** 1200px+
- **Tablet:** 768px - 1199px
- **Mobile:** < 768px

## 🛠️ Available Scripts

### `npm start`
Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm test`
Launches the test runner in interactive watch mode.

## 📦 Dependencies

- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Routing
- **react-scripts** - Create React App scripts

## 🔒 Authentication Flow

1. User visits login/signup page
2. Submits credentials
3. Backend returns JWT token
4. Token stored in localStorage
5. Token sent with each API request
6. Protected routes check for valid token

## 🐛 Common Issues

### Port 3000 already in use
```bash
# Kill the process
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
```

### API connection error
- Ensure backend is running on port 5000
- Check proxy configuration in package.json

## 📄 License

MIT
