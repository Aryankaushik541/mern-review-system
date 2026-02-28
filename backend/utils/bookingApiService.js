const axios = require('axios');

/**
 * Fetch reviews from Booking.com API
 * @param {string} hotelId - The hotel ID from Booking.com
 * @returns {Promise<Array>} - Array of reviews
 */
const fetchBookingReviews = async (hotelId) => {
  try {
    const apiUrl = `https://supply-xml.booking.com/review-api/properties/${hotelId}/reviews`;
    
    const response = await axios.get(apiUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'ReviewSystem/1.0'
      },
      timeout: 10000 // 10 seconds timeout
    });

    // Transform Booking.com reviews to our format
    const transformedReviews = transformBookingReviews(response.data);
    
    return {
      success: true,
      data: transformedReviews,
      count: transformedReviews.length
    };

  } catch (error) {
    console.error('Error fetching Booking.com reviews:', error.message);
    
    return {
      success: false,
      error: error.message,
      data: []
    };
  }
};

/**
 * Transform Booking.com review format to our system format
 * @param {Object} bookingData - Raw data from Booking.com API
 * @returns {Array} - Transformed reviews
 */
const transformBookingReviews = (bookingData) => {
  try {
    // Booking.com API response structure varies
    // Adjust this based on actual API response
    const reviews = bookingData.reviews || bookingData.result || bookingData;
    
    if (!Array.isArray(reviews)) {
      console.warn('Booking.com API response is not an array');
      return [];
    }

    return reviews.map(review => ({
      // Map Booking.com fields to our schema
      _id: review.id || review.review_id || `booking_${Date.now()}_${Math.random()}`,
      userId: 'booking_user',
      name: review.author?.name || review.reviewer_name || 'Booking.com Guest',
      email: 'booking@guest.com',
      rating: calculateRating(review.score || review.rating),
      comment: review.text || review.review_text || review.comment || '',
      source: 'booking.com',
      externalId: review.id || review.review_id,
      
      // Additional Booking.com specific data
      bookingData: {
        originalScore: review.score || review.rating,
        positiveText: review.positive || '',
        negativeText: review.negative || '',
        stayDate: review.stay_date || review.date,
        reviewDate: review.review_date || review.created_at,
        roomType: review.room_type || '',
        tripType: review.trip_type || '',
        country: review.country || review.reviewer_country || ''
      },
      
      replies: [],
      createdAt: review.review_date || review.created_at || new Date(),
      updatedAt: review.review_date || review.created_at || new Date()
    }));

  } catch (error) {
    console.error('Error transforming Booking.com reviews:', error);
    return [];
  }
};

/**
 * Convert Booking.com score (usually 0-10) to our 1-5 star rating
 * @param {number} score - Booking.com score
 * @returns {number} - Star rating (1-5)
 */
const calculateRating = (score) => {
  if (!score) return 3; // Default to 3 stars
  
  // If score is already 1-5, return as is
  if (score <= 5) return Math.round(score);
  
  // If score is 0-10, convert to 1-5
  if (score <= 10) {
    return Math.round((score / 10) * 5);
  }
  
  // If score is 0-100, convert to 1-5
  if (score <= 100) {
    return Math.round((score / 100) * 5);
  }
  
  return 3; // Default fallback
};

/**
 * Merge Booking.com reviews with local reviews
 * @param {Array} localReviews - Reviews from our database
 * @param {Array} bookingReviews - Reviews from Booking.com
 * @returns {Array} - Merged and sorted reviews
 */
const mergeReviews = (localReviews, bookingReviews) => {
  try {
    // Combine both arrays
    const allReviews = [...localReviews, ...bookingReviews];
    
    // Sort by date (newest first)
    allReviews.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA;
    });
    
    return allReviews;
  } catch (error) {
    console.error('Error merging reviews:', error);
    return localReviews; // Return local reviews if merge fails
  }
};

/**
 * Get statistics from Booking.com reviews
 * @param {Array} bookingReviews - Reviews from Booking.com
 * @returns {Object} - Statistics
 */
const getBookingStats = (bookingReviews) => {
  if (!bookingReviews || bookingReviews.length === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    };
  }

  const totalReviews = bookingReviews.length;
  const totalRating = bookingReviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / totalReviews;

  const ratingDistribution = bookingReviews.reduce((dist, review) => {
    dist[review.rating] = (dist[review.rating] || 0) + 1;
    return dist;
  }, { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });

  return {
    totalReviews,
    averageRating: averageRating.toFixed(1),
    ratingDistribution
  };
};

module.exports = {
  fetchBookingReviews,
  transformBookingReviews,
  mergeReviews,
  getBookingStats,
  calculateRating
};
