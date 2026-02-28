# 🏨 Booking.com Reviews Only - Setup Guide

Complete guide to show ONLY Booking.com reviews (local reviews disabled).

---

## 🎯 What's Changed

✅ **ONLY Booking.com Reviews** - Local review system disabled  
✅ **Reply System** - Users can reply to Booking.com reviews  
✅ **Admin Management** - Admins can manage replies  
✅ **Beautiful UI** - Booking.com branded design  
✅ **Detailed Reviews** - Shows positive/negative feedback, stay dates, room types  

---

## 📁 Files Structure

### **Backend:**
- `backend/routes/reviews.js` - Updated to fetch ONLY Booking.com reviews
- `backend/utils/bookingApiService.js` - Booking.com API integration
- `backend/models/Review.js` - Stores replies for Booking.com reviews
- `backend/.env` - Configuration

### **Frontend:**
- `client/src/pages/ReviewPage_Booking.js` - NEW review page (Booking.com only)
- `client/src/pages/BookingReviewStyles.css` - Booking.com specific styles
- `client/src/App.js` - Routes configuration

---

## 🚀 Setup Instructions

### **Step 1: Install Dependencies**

```bash
cd backend
npm install
```

This installs `axios` for Booking.com API calls.

---

### **Step 2: Get Your Booking.com Hotel ID**

1. Login to your Booking.com Extranet
2. Go to Property Settings
3. Find your **Hotel ID** (Property ID)
4. Example: `123456`

**Where to find it:**
- URL: `https://admin.booking.com/hotel/hoteladmin/properties/123456`
- Property ID = `123456`

---

### **Step 3: Configure Environment Variables**

Edit `backend/.env`:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
CLIENT_URL=http://localhost:3000

# IMPORTANT: Booking.com Hotel ID (REQUIRED)
BOOKING_HOTEL_ID=123456

# Email Configuration (for user authentication)
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-password
```

**⚠️ IMPORTANT:** `BOOKING_HOTEL_ID` is REQUIRED. Without it, the app will show an error.

---

### **Step 4: Update Frontend to Use New ReviewPage**

**Option A: Replace existing ReviewPage**

```bash
cd client/src/pages
mv ReviewPage.js ReviewPage_OLD.js
mv ReviewPage_Booking.js ReviewPage.js
```

**Option B: Update App.js to use new component**

Edit `client/src/App.js`:

```javascript
import ReviewPage from './pages/ReviewPage_Booking';  // Use Booking.com version
```

---

### **Step 5: Import Booking.com Styles**

Edit `client/src/pages/ReviewPage_Booking.js` (or ReviewPage.js):

Add at the top:
```javascript
import './ReviewPage.css';
import './BookingReviewStyles.css';  // Add this line
```

---

### **Step 6: Start the Application**

**Backend:**
```bash
cd backend
npm start
```

You should see:
```
Server running on port 5000
MongoDB connected successfully
```

**Frontend:**
```bash
cd client
npm start
```

Visit: `http://localhost:3000`

---

## 🎨 Features

### **1. Booking.com Reviews Display**
- Fetches reviews from Booking.com API
- Shows guest name, rating, comment
- Displays positive/negative feedback
- Shows stay date, room type, trip type, country

### **2. Reply System**
- Any logged-in user can reply
- Replies stored in your database
- Edit/delete own replies
- Admins can manage all replies

### **3. Statistics**
- Average rating from Booking.com
- Rating distribution (1-5 stars)
- Category ratings (calculated)
- Total review count

### **4. Filters & Sorting**
- Filter by star rating (1-5)
- Sort by: Recent, Highest, Lowest
- Real-time filtering

---

## 📊 API Endpoints

### **GET /api/reviews**
Get all Booking.com reviews

**Response:**
```json
{
  "success": true,
  "count": 15,
  "data": [
    {
      "_id": "booking_1234567890_0.123",
      "name": "John Doe",
      "email": "booking@guest.com",
      "rating": 4,
      "comment": "Great hotel!",
      "source": "booking.com",
      "bookingData": {
        "originalScore": 8.5,
        "positiveText": "Great location",
        "negativeText": "WiFi slow",
        "stayDate": "2024-02-15",
        "roomType": "Deluxe Room",
        "tripType": "Business",
        "country": "United States"
      },
      "replies": [],
      "createdAt": "2024-02-20T10:30:00Z"
    }
  ],
  "stats": {
    "total": 15,
    "source": "booking.com"
  },
  "bookingStats": {
    "totalReviews": 15,
    "averageRating": "4.2",
    "ratingDistribution": {
      "1": 0, "2": 1, "3": 3, "4": 6, "5": 5
    }
  }
}
```

---

### **POST /api/reviews/:id/reply**
Add reply to Booking.com review

**Request:**
```json
{
  "text": "Thank you for your feedback!"
}
```

**Headers:**
```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

**Response:**
```json
{
  "success": true,
  "message": "Reply added successfully",
  "data": {
    "_id": "...",
    "replies": [
      {
        "_id": "...",
        "userId": "...",
        "userName": "Admin",
        "userRole": "admin",
        "text": "Thank you for your feedback!",
        "createdAt": "2024-02-21T10:00:00Z"
      }
    ]
  }
}
```

---

### **GET /api/reviews/:reviewId/replies**
Get all replies for a review

**Response:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "...",
      "userName": "Admin",
      "userRole": "admin",
      "text": "Thank you!",
      "createdAt": "2024-02-21T10:00:00Z"
    }
  ]
}
```

---

## 🎨 UI Components

### **Review Card Structure:**

```
┌─────────────────────────────────────────┐
│ 👤 Guest Name                    [4.5]  │
│ 🏨 Booking.com Guest                    │
│ ⭐⭐⭐⭐⭐                                │
│ Reviewed: February 20, 2024             │
│                                         │
│ "Great hotel with excellent service..." │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ 👍 Liked:                           │ │
│ │ Great location and friendly staff   │ │
│ │                                     │ │
│ │ 👎 Disliked:                        │ │
│ │ WiFi could be better                │ │
│ │                                     │ │
│ │ 📅 Stayed: Feb 15, 2024             │ │
│ │ 🏠 Room: Deluxe Room                │ │
│ │ ✈️ Trip: Business                   │ │
│ │ 🌍 From: United States              │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ 💬 Replies (2)                          │
│ ┌─────────────────────────────────────┐ │
│ │ 👤 Admin (Admin Badge)              │ │
│ │ "Thank you for your feedback!"      │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ [Write a reply...]                      │
│ [Add Reply Button]                      │
└─────────────────────────────────────────┘
```

---

## 🔒 Permissions

### **Public (Not Logged In):**
- ✅ View all Booking.com reviews
- ✅ View all replies
- ❌ Cannot add replies

### **Logged In Users:**
- ✅ View all reviews and replies
- ✅ Add replies to any review
- ✅ Edit own replies
- ✅ Delete own replies
- ❌ Cannot edit Booking.com reviews

### **Admins:**
- ✅ Everything users can do
- ✅ Edit any reply
- ✅ Delete any reply
- ❌ Cannot edit Booking.com review content

---

## 🐛 Troubleshooting

### **Problem 1: "Hotel ID not configured" error**

**Solution:**
- Check `BOOKING_HOTEL_ID` is set in `backend/.env`
- Restart backend server after adding it
- Verify the hotel ID is correct

---

### **Problem 2: No reviews showing**

**Solutions:**
1. Check backend console for errors
2. Verify hotel ID is correct
3. Test API directly:
   ```bash
   curl http://localhost:5000/api/reviews
   ```
4. Check if Booking.com API is accessible
5. Verify internet connection

---

### **Problem 3: Cannot add replies**

**Solutions:**
1. Make sure you're logged in
2. Check JWT token is valid
3. Verify backend is running
4. Check browser console for errors
5. Test login/signup functionality

---

### **Problem 4: Replies not showing**

**Solutions:**
1. Refresh the page
2. Check backend console for errors
3. Verify MongoDB connection
4. Test replies endpoint:
   ```bash
   curl http://localhost:5000/api/reviews/REVIEW_ID/replies
   ```

---

### **Problem 5: API timeout**

**Solutions:**
1. Check internet connection
2. Increase timeout in `bookingApiService.js`:
   ```javascript
   timeout: 30000 // 30 seconds
   ```
3. Check firewall settings
4. Verify Booking.com API is accessible

---

## 📝 Data Flow

```
User Opens Page
      ↓
Frontend calls GET /api/reviews
      ↓
Backend fetches from Booking.com API
      ↓
Transform data to our format
      ↓
For each review, fetch replies from DB
      ↓
Merge reviews with replies
      ↓
Return to frontend
      ↓
Display reviews with reply forms
      ↓
User adds reply
      ↓
POST /api/reviews/:id/reply
      ↓
Create/Update DB entry for review
      ↓
Add reply to review.replies array
      ↓
Save to MongoDB
      ↓
Return updated review
      ↓
Refresh reviews list
```

---

## 🎯 Key Differences from Local Reviews

| Feature | Local Reviews | Booking.com Only |
|---------|--------------|------------------|
| Review Source | Your database | Booking.com API |
| Add Reviews | Users can add | Cannot add (read-only) |
| Edit Reviews | Users/Admins can edit | Cannot edit |
| Delete Reviews | Admins can delete | Cannot delete |
| Reply to Reviews | ✅ Yes | ✅ Yes |
| Manage Replies | ✅ Yes | ✅ Yes |
| Additional Data | Basic info | Positive/Negative, Stay dates, etc. |
| Storage | Full review in DB | Only replies in DB |

---

## ✅ Testing Checklist

- [ ] Backend starts without errors
- [ ] `BOOKING_HOTEL_ID` is configured
- [ ] Reviews load from Booking.com
- [ ] Reviews display correctly
- [ ] Booking.com badge shows
- [ ] Positive/negative feedback displays
- [ ] Stay date, room type, etc. shows
- [ ] Statistics calculate correctly
- [ ] Filters work (star rating)
- [ ] Sorting works (recent, highest, lowest)
- [ ] Login/signup works
- [ ] Can add reply when logged in
- [ ] Reply saves to database
- [ ] Reply displays immediately
- [ ] Can edit own reply
- [ ] Can delete own reply
- [ ] Admin can manage all replies
- [ ] Cannot edit Booking.com review content

---

## 🚀 Production Deployment

### **1. Environment Variables:**
```env
BOOKING_HOTEL_ID=your_production_hotel_id
MONGODB_URI=your_production_mongodb_uri
CLIENT_URL=https://your-domain.com
NODE_ENV=production
```

### **2. Caching (Recommended):**

Add Redis caching to reduce API calls:

```javascript
// In bookingApiService.js
const redis = require('redis');
const client = redis.createClient();

const CACHE_TTL = 3600; // 1 hour

const fetchBookingReviews = async (hotelId) => {
  const cacheKey = `booking_reviews_${hotelId}`;
  
  // Try cache first
  const cached = await client.get(cacheKey);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Fetch from API
  const reviews = await fetchFromBookingAPI(hotelId);
  
  // Cache the result
  await client.setex(cacheKey, CACHE_TTL, JSON.stringify(reviews));
  
  return reviews;
};
```

### **3. Rate Limiting:**

```javascript
const rateLimit = require('express-rate-limit');

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100
});

app.use('/api/', apiLimiter);
```

---

## 🎉 Success!

If everything works:
- ✅ Booking.com reviews display beautifully
- ✅ Users can reply to reviews
- ✅ Admins can manage replies
- ✅ Statistics show correctly
- ✅ Filters and sorting work
- ✅ Mobile responsive design

**Your review system now shows ONLY Booking.com reviews! 🏨✨**

---

## 📞 Support

For issues:
1. Check backend console logs
2. Verify `BOOKING_HOTEL_ID` is correct
3. Test API endpoints directly
4. Review troubleshooting section
5. Check MongoDB connection

---

**Happy reviewing! 🌟**
