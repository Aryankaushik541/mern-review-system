# Backend - MERN Review System

Backend API for the MERN Review System with authentication.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Create a `.env` file in the backend directory:
```env
MONGODB_URI=mongodb://localhost:27017/review-system
PORT=5000
JWT_SECRET=your-secret-key-here
```

### 3. Run the Server

**Development mode (with nodemon):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on `http://localhost:5000`

## 📁 Project Structure

```
backend/
├── models/
│   ├── User.js          # User model with authentication
│   └── Review.js        # Review model
├── routes/
│   ├── auth.js          # Authentication routes
│   └── reviews.js       # Review CRUD routes
├── middleware/
│   └── auth.js          # JWT authentication middleware
├── server.js            # Express server setup
├── package.json
└── .env.example
```

## 🔌 API Endpoints

### Authentication Routes

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"  // or "admin"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>
```

### Review Routes

#### Get All Reviews
```http
GET /api/reviews
```

#### Get Single Review
```http
GET /api/reviews/:id
```

#### Create Review (Protected - User)
```http
POST /api/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Great service!"
}
```

#### Add Admin Reply (Protected - Admin)
```http
PUT /api/reviews/:id/reply
Authorization: Bearer <token>
Content-Type: application/json

{
  "adminReply": "Thank you for your feedback!"
}
```

#### Delete Review (Protected - Admin)
```http
DELETE /api/reviews/:id
Authorization: Bearer <token>
```

## 🔒 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### How it works:
1. User registers or logs in
2. Server returns a JWT token
3. Client stores the token (localStorage)
4. Client sends token in Authorization header for protected routes
5. Server validates token and grants/denies access

### Token Format:
```
Authorization: Bearer <your-jwt-token>
```

## 📦 Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **cors** - Cross-origin resource sharing
- **dotenv** - Environment variables
- **body-parser** - Request body parsing

## 🛠️ Development

### Run with auto-reload:
```bash
npm run dev
```

### Test API endpoints:
Use Postman, Thunder Client, or curl to test the endpoints.

### MongoDB Connection:
- **Local:** `mongodb://localhost:27017/review-system`
- **Atlas:** Get connection string from MongoDB Atlas

## 🐛 Common Issues

### MongoDB Connection Error
- Ensure MongoDB is running locally
- Check connection string in .env file
- For Atlas, whitelist your IP address

### JWT Error
- Ensure JWT_SECRET is set in .env
- Check token format in Authorization header

### Port Already in Use
- Change PORT in .env file
- Or kill the process using port 5000

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/review-system |
| PORT | Server port | 5000 |
| JWT_SECRET | Secret key for JWT | your-secret-key |

## 🔐 Security Features

- Password hashing with bcrypt (10 salt rounds)
- JWT token authentication
- Protected routes with middleware
- Role-based access control
- Input validation
- Error handling

## 📄 License

MIT
