# 🏨 Booking.com API Integration Guide

Complete guide to integrate Booking.com reviews with your MERN Review System.

---

## 🎯 What's Integrated

✅ **Automatic Review Fetching** - Fetch reviews from Booking.com API  
✅ **Merged Display** - Show Booking.com + Local reviews together  
✅ **Reply to External Reviews** - Users can reply to Booking.com reviews  
✅ **Source Badges** - Visual indicators for review source  
✅ **Smart Conversion** - Auto-convert Booking.com scores to 5-star rating  
✅ **Statistics** - Separate stats for local and Booking.com reviews  

---

## 📋 Features

### **1. Review Merging**
- Fetches reviews from Booking.com API
- Merges with local database reviews
- Sorts by date (newest first)
- Maintains separate source tracking

### **2. Reply System**
- Users can reply to ANY review (local or Booking.com)
- Replies stored in your database
- Admin and users can manage their replies

### **3. Data Transformation**
- Booking.com score (0-10) → 5-star rating
- Preserves original Booking.com data
- Stores additional metadata (stay date, room type, etc.)

---

## 🔧 Setup Instructions

### **Step 1: Install Dependencies**

```bash
cd backend
npm install
```

This installs `axios` for API calls.

---

### **Step 2: Get Your Booking.com Hotel ID**

1. Go to your Booking.com property dashboard
2. Find your **Hotel ID** (usually in URL or property settings)
3. Example: `https://admin.booking.com/hotel/hoteladmin/properties/123456`
   - Hotel ID = `123456`

---

### **Step 3: Configure Environment**

Edit `backend/.env`:

```env
# Add your Booking.com Hotel ID
BOOKING_HOTEL_ID=123456
```

**Note:** Leave empty to disable Booking.com integration.

---

### **Step 4: Test the Integration**

#### **Start Backend:**
```bash
cd backend
npm start
```

#### **Test API Endpoints:**

**1. Get All Reviews (Merged):**
```bash
curl http://localhost:5000/api/reviews
```

**2. Get Only Booking.com Reviews:**
```bash
curl http://localhost:5000/api/reviews/booking/123456
```

---

## 📊 API Endpoints

### **GET /api/reviews**
Get all reviews (local + Booking.com merged)

**Response:**
```json
{
  "success": true,
  "count": 25,
  "data": [...reviews],
  "stats": {
    "local": 10,
    "booking": 15,
    "total": 25
  },
  "bookingStats": {
    "totalReviews": 15,
    "averageRating": "4.2",
    "ratingDistribution": {
      "1": 0,
      "2": 1,
      "3": 3,
      "4": 6,
      "5": 5
    }
  }
}
```

---

### **GET /api/reviews/booking/:hotelId**
Get only Booking.com reviews for specific hotel

**Example:**
```bash
GET /api/reviews/booking/123456
```

**Response:**
```json
{
  "success": true,
  "count": 15,
  "data": [...booking reviews],
  "stats": {
    "totalReviews": 15,
    "averageRating": "4.2",
    "ratingDistribution": {...}
  }
}
```

---

### **POST /api/reviews/:id/reply**
Add reply to ANY review (local or Booking.com)

**Request:**
```json
{
  "text": "Thank you for your feedback!"
}
```

**Works for:**
- Local reviews (MongoDB ID)
- Booking.com reviews (booking_xxx ID)

---

## 🎨 Review Data Structure

### **Booking.com Review Format:**

```javascript
{
  _id: "booking_1234567890_0.123",
  userId: "booking_user",
  name: "John Doe",
  email: "booking@guest.com",
  rating: 4,  // Converted from Booking.com score
  comment: "Great hotel!",
  source: "booking.com",
  externalId: "booking_review_123",
  
  bookingData: {
    originalScore: 8.5,  // Original 0-10 score
    positiveText: "Great location and staff",
    negativeText: "WiFi could be better",
    stayDate: "2024-02-15",
    reviewDate: "2024-02-20",
    roomType: "Deluxe Room",
    tripType: "Business",
    country: "United States"
  },
  
  replies: [...],  // Your users' replies
  createdAt: "2024-02-20T10:30:00Z",
  updatedAt: "2024-02-20T10:30:00Z"
}
```

---

### **Local Review Format:**

```javascript
{
  _id: "507f1f77bcf86cd799439011",
  userId: "507f1f77bcf86cd799439012",
  name: "Jane Smith",
  email: "jane@example.com",
  rating: 5,
  comment: "Excellent service!",
  source: "local",
  externalId: null,
  bookingData: null,
  replies: [...],
  createdAt: "2024-02-21T14:20:00Z",
  updatedAt: "2024-02-21T14:20:00Z"
}
```

---

## 🔄 Score Conversion Logic

Booking.com uses different scoring systems. Our system auto-converts:

```javascript
// 0-10 scale → 1-5 stars
Score 9-10  → 5 stars ⭐⭐⭐⭐⭐
Score 7-8.9 → 4 stars ⭐⭐⭐⭐
Score 5-6.9 → 3 stars ⭐⭐⭐
Score 3-4.9 → 2 stars ⭐⭐
Score 0-2.9 → 1 star  ⭐

// 0-100 scale → 1-5 stars
Score 90-100 → 5 stars
Score 70-89  → 4 stars
Score 50-69  → 3 stars
Score 30-49  → 2 stars
Score 0-29   → 1 star
```

---

## 🎨 Frontend Display

### **Review Card with Source Badge:**

```jsx
<div className="review-card">
  <div className="review-header">
    <h4>{review.name}</h4>
    {review.source === 'booking.com' && (
      <span className="source-badge booking">
        🏨 Booking.com
      </span>
    )}
    {review.source === 'local' && (
      <span className="source-badge local">
        ✍️ Direct Review
      </span>
    )}
  </div>
  <div className="review-content">
    <p>{review.comment}</p>
    
    {/* Show Booking.com specific data */}
    {review.bookingData && (
      <div className="booking-details">
        {review.bookingData.positiveText && (
          <p>👍 {review.bookingData.positiveText}</p>
        )}
        {review.bookingData.negativeText && (
          <p>👎 {review.bookingData.negativeText}</p>
        )}
        <p>📅 Stayed: {review.bookingData.stayDate}</p>
        <p>🏠 Room: {review.bookingData.roomType}</p>
      </div>
    )}
  </div>
</div>
```

---

## 🔒 Security & Permissions

### **What Users CAN Do:**
✅ View all reviews (local + Booking.com)  
✅ Reply to any review  
✅ Edit/delete their own replies  

### **What Users CANNOT Do:**
❌ Edit Booking.com reviews  
❌ Delete Booking.com reviews  
❌ Modify Booking.com review content  

### **What Admins CAN Do:**
✅ Everything users can do  
✅ Edit/delete any local review  
✅ Edit/delete any reply  
✅ Manage all content  

### **What Admins CANNOT Do:**
❌ Edit Booking.com review content  
❌ Delete Booking.com reviews  

---

## 🐛 Troubleshooting

### **Problem 1: No Booking.com reviews showing**

**Solutions:**
- Check `BOOKING_HOTEL_ID` is set in `.env`
- Verify hotel ID is correct
- Check backend console for API errors
- Test API endpoint directly: `GET /api/reviews/booking/YOUR_HOTEL_ID`

---

### **Problem 2: API timeout or connection error**

**Solutions:**
- Check internet connection
- Verify Booking.com API is accessible
- Check firewall settings
- Increase timeout in `bookingApiService.js`:
  ```javascript
  timeout: 30000 // 30 seconds
  ```

---

### **Problem 3: Reviews not merging correctly**

**Solutions:**
- Check backend console for transformation errors
- Verify review data structure
- Test with sample data first
- Check `mergeReviews()` function in `bookingApiService.js`

---

### **Problem 4: Cannot reply to Booking.com reviews**

**Solutions:**
- Ensure user is logged in
- Check review ID format (should start with `booking_`)
- Verify reply endpoint is working
- Check backend logs for errors

---

## 📝 Customization

### **Change Score Conversion:**

Edit `backend/utils/bookingApiService.js`:

```javascript
const calculateRating = (score) => {
  // Custom conversion logic
  if (score >= 9) return 5;
  if (score >= 7) return 4;
  if (score >= 5) return 3;
  if (score >= 3) return 2;
  return 1;
};
```

---

### **Add More Booking.com Data:**

Edit `transformBookingReviews()` in `bookingApiService.js`:

```javascript
bookingData: {
  originalScore: review.score,
  positiveText: review.positive,
  negativeText: review.negative,
  stayDate: review.stay_date,
  reviewDate: review.review_date,
  roomType: review.room_type,
  tripType: review.trip_type,
  country: review.country,
  // Add more fields:
  guestType: review.guest_type,
  numberOfNights: review.nights,
  traveledWith: review.traveled_with
}
```

---

### **Filter by Source:**

Add filter in frontend:

```javascript
const [sourceFilter, setSourceFilter] = useState('all');

const filteredReviews = reviews.filter(review => {
  if (sourceFilter === 'local') return review.source === 'local';
  if (sourceFilter === 'booking') return review.source === 'booking.com';
  return true; // 'all'
});
```

---

## 🚀 Production Deployment

### **1. Environment Variables:**
```env
BOOKING_HOTEL_ID=your_production_hotel_id
NODE_ENV=production
```

### **2. Caching (Optional):**
Add Redis caching for Booking.com API responses:

```javascript
const redis = require('redis');
const client = redis.createClient();

// Cache for 1 hour
const cacheKey = `booking_reviews_${hotelId}`;
const cached = await client.get(cacheKey);

if (cached) {
  return JSON.parse(cached);
}

// Fetch and cache
const reviews = await fetchBookingReviews(hotelId);
await client.setex(cacheKey, 3600, JSON.stringify(reviews));
```

### **3. Rate Limiting:**
Implement rate limiting for API calls:

```javascript
const rateLimit = require('express-rate-limit');

const bookingApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

router.get('/booking/:hotelId', bookingApiLimiter, async (req, res) => {
  // ...
});
```

---

## 📊 Statistics & Analytics

### **Get Combined Stats:**

```javascript
const stats = {
  total: allReviews.length,
  local: localReviews.length,
  booking: bookingReviews.length,
  averageRating: calculateAverage(allReviews),
  localAverage: calculateAverage(localReviews),
  bookingAverage: calculateAverage(bookingReviews)
};
```

### **Display in Dashboard:**

```jsx
<div className="stats-grid">
  <div className="stat-card">
    <h3>Total Reviews</h3>
    <p>{stats.total}</p>
  </div>
  <div className="stat-card">
    <h3>Local Reviews</h3>
    <p>{stats.local}</p>
  </div>
  <div className="stat-card">
    <h3>Booking.com Reviews</h3>
    <p>{stats.booking}</p>
  </div>
</div>
```

---

## ✅ Testing Checklist

- [ ] Booking.com API connection works
- [ ] Reviews fetch successfully
- [ ] Score conversion is accurate
- [ ] Reviews merge correctly
- [ ] Sorting works (newest first)
- [ ] Source badges display correctly
- [ ] Users can reply to Booking.com reviews
- [ ] Replies save to database
- [ ] Cannot edit Booking.com reviews
- [ ] Statistics calculate correctly
- [ ] Error handling works
- [ ] Loading states display properly

---

## 🎉 Success!

If everything works:
- ✅ Booking.com reviews display alongside local reviews
- ✅ Users can interact with all reviews
- ✅ Source is clearly indicated
- ✅ Statistics show combined data
- ✅ Reply system works for all reviews

**Your review system now has enterprise-level integration! 🚀**

---

## 📞 Support

For issues:
1. Check backend console logs
2. Verify hotel ID is correct
3. Test API endpoints directly
4. Review troubleshooting section
5. Check Booking.com API documentation

---

**Happy integrating! 🏨✨**
