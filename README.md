# 🌟 MERN Review System

A complete review management system built with MongoDB, Express, React, and Node.js.

![MERN Stack](https://img.shields.io/badge/Stack-MERN-green)
![License](https://img.shields.io/badge/License-MIT-blue)
![MongoDB](https://img.shields.io/badge/Database-MongoDB%20Atlas-green)

## ✨ Features

### 👥 User Features (Review Page)
- ✅ Submit reviews with name, email, rating (1-5 stars), and comments
- ✅ View all submitted reviews in real-time
- ✅ See admin replies on reviews
- ✅ Beautiful, responsive UI with gradient design

### 👨‍💼 Admin Features (Dashboard)
- ✅ View all reviews with comprehensive statistics
- ✅ Reply to user reviews
- ✅ Delete inappropriate reviews
- ✅ Real-time updates
- ✅ Analytics dashboard showing:
  - Total reviews count
  - Number of replied reviews
  - Average rating

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - ODM for MongoDB
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Modern CSS** - Styling with gradients and animations

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (already configured)
- npm or yarn

### Backend Setup

1. Clone the repository:
\`\`\`bash
git clone https://github.com/Aryankaushik541/mern-review-system.git
cd mern-review-system
\`\`\`

2. Install backend dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a \`.env\` file in the root directory:
\`\`\`env
MONGODB_URI=mongodb+srv://aryankaushik541_db_user:wiA6zyP8cWjaq5Bu@cluster0.cikdgjg.mongodb.net/feedbackDB?retryWrites=true&w=majority
PORT=5000
\`\`\`

**Note:** MongoDB Atlas is already configured and ready to use! The database name is `feedbackDB`.

4. Start the backend server:
\`\`\`bash
npm start
# or for development with auto-reload
npm run dev
\`\`\`

The server will run on **http://localhost:5000**

### Frontend Setup

1. Navigate to the client folder:
\`\`\`bash
cd client
\`\`\`

2. Install frontend dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the React app:
\`\`\`bash
npm start
\`\`\`

The app will run on **http://localhost:3000**

### Quick Install (Both Backend & Frontend)
\`\`\`bash
npm run install-all
\`\`\`

## 🚀 API Endpoints

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews` | Get all reviews |
| GET | `/api/reviews/:id` | Get single review |
| POST | `/api/reviews` | Create new review |
| PUT | `/api/reviews/:id/reply` | Add admin reply |
| DELETE | `/api/reviews/:id` | Delete review |

### Health Check
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Server health check |

## 📁 Project Structure

\`\`\`
mern-review-system/
├── server.js              # Express server and API routes
├── package.json           # Backend dependencies
├── .env                   # Environment variables (create this)
├── .env.example           # Environment variables example
├── .gitignore            # Git ignore file
├── README.md             # Project documentation
└── client/               # React frontend
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── pages/
    │   │   ├── ReviewPage.js      # User review page
    │   │   ├── ReviewPage.css
    │   │   ├── Dashboard.js       # Admin dashboard
    │   │   └── Dashboard.css
    │   ├── App.js                 # Main app component
    │   ├── App.css
    │   ├── index.js
    │   └── index.css
    └── package.json               # Frontend dependencies
\`\`\`

## 💻 Usage

### For Users
1. Navigate to the home page (Reviews)
2. Fill in the review form with your details
3. Select a rating (1-5 stars)
4. Write your comment
5. Submit the review
6. Your review will appear in the reviews list immediately
7. Check back later to see if admin has replied

### For Admins
1. Navigate to the Admin Dashboard
2. View all submitted reviews
3. Check the statistics at the top (Total, Replied, Average Rating)
4. Reply to reviews using the text area
5. Delete inappropriate reviews if needed
6. Replies will automatically appear on the review page

## 🗄️ MongoDB Schema

\`\`\`javascript
{
  name: String (required),
  email: String (required),
  rating: Number (1-5, required),
  comment: String (required),
  adminReply: String (default: ''),
  createdAt: Date (auto-generated),
  repliedAt: Date
}
\`\`\`

## 🎨 Screenshots

### Review Page
Users can submit reviews and see all reviews with admin replies.

### Admin Dashboard
Admins can manage reviews, reply to users, and view statistics.

## 🔒 Environment Variables

Create a \`.env\` file in the root directory:

\`\`\`env
MONGODB_URI=mongodb+srv://aryankaushik541_db_user:wiA6zyP8cWjaq5Bu@cluster0.cikdgjg.mongodb.net/feedbackDB?retryWrites=true&w=majority
PORT=5000
\`\`\`

**Database Details:**
- **Cluster:** cluster0.cikdgjg.mongodb.net
- **Database Name:** feedbackDB
- **User:** aryankaushik541_db_user
- **Connection:** MongoDB Atlas (Cloud)

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)
1. Set environment variables in your hosting platform:
   - \`MONGODB_URI\`: Use the MongoDB Atlas connection string
   - \`PORT\`: 5000 (or platform default)
2. Deploy the root directory
3. MongoDB Atlas is already configured and accessible from anywhere

### Frontend Deployment (Vercel/Netlify)
1. Build the React app: \`cd client && npm run build\`
2. Deploy the \`client/build\` folder
3. Update API URL in frontend to point to deployed backend

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Aryan Kaushik**
- GitHub: [@Aryankaushik541](https://github.com/Aryankaushik541)
- Email: aryankaushik541@gmail.com

## 🙏 Acknowledgments

- Built with MERN Stack
- MongoDB Atlas for cloud database
- Inspired by modern review systems
- UI design with gradient aesthetics

---

⭐ Star this repo if you find it helpful!