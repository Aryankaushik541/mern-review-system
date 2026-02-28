const axios = require('axios');

/**
 * Booking.com Guest Review API Service
 * Official API: https://supply-xml.booking.com/review-api/properties/{hotel_id}/reviews
 * Authentication: Basic Auth (machine account credentials)
 */

const BOOKING_API_BASE_URL = 'https://supply-xml.booking.com/review-api/properties';

/**
 * Fetch reviews from Booking.com Guest Review API
 * @param {string} hotelId - Booking.com property/hotel ID
 * @param {number} limit - Number of reviews to fetch (default: 50, max: 100)
 * @param {string} nextPage - Pagination cursor for next page
 * @returns {Promise<Object>} - Reviews data with success status
 */
const fetchBookingReviews = async (hotelId, limit = 50, nextPage = null) => {
  try {
    // Get credentials from environment variables
    const username = process.env.BOOKING_API_USERNAME;
    const password = process.env.BOOKING_API_PASSWORD;

    if (!username || !password) {
      console.error('Booking.com API credentials not configured');
      return {
        success: false,
        error: 'API credentials not configured. Please set BOOKING_API_USERNAME and BOOKING_API_PASSWORD in environment variables.',
        data: []
      };
    }

    // Build API URL
    let apiUrl = `${BOOKING_API_BASE_URL}/${hotelId}/reviews`;
    
    // Add query parameters
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit);
    if (nextPage) params.append('next_page', nextPage);
    
    if (params.toString()) {
      apiUrl += `?${params.toString()}`;
    }

    console.log(`Fetching reviews from Booking.com API: ${apiUrl}`);

    // Make API request with Basic Auth
    const response = await axios.get(apiUrl, {
      auth: {
        username: username,
        password: password
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      timeout: 30000 // 30 seconds timeout
    });

    if (!response.data || !response.data.reviews) {
      console.error('Invalid response from Booking.com API');
      return {
        success: false,
        error: 'Invalid API response',
        data: []
      };
    }

    // Transform Booking.com reviews to our format
    const transformedReviews = transformBookingReviews(response.data.reviews);

    return {
      success: true,
      data: transformedReviews,
      pagination: {
        next_page: response.data.next_page || null,
        has_more: !!response.data.next_page
      },
      total: response.data.total_reviews || transformedReviews.length
    };

  } catch (error) {
    console.error('Error fetching Booking.com reviews:', error.message);
    
    if (error.response) {
      // API returned an error response
      console.error('API Error Status:', error.response.status);
      console.error('API Error Data:', error.response.data);
      
      return {
        success: false,
        error: `Booking.com API Error: ${error.response.status} - ${error.response.statusText}`,
        details: error.response.data,
        data: []
      };
    } else if (error.request) {
      // Request was made but no response received
      return {
        success: false,
        error: 'No response from Booking.com API. Please check your internet connection.',
        data: []
      };
    } else {
      // Something else happened
      return {
        success: false,
        error: error.message,
        data: []
      };
    }
  }
};

/**
 * Transform Booking.com review format to our application format
 * @param {Array} bookingReviews - Raw reviews from Booking.com API
 * @returns {Array} - Transformed reviews
 */
const transformBookingReviews = (bookingReviews) => {
  if (!Array.isArray(bookingReviews)) {
    return [];
  }

  return bookingReviews.map((review, index) => {
    // Calculate 5-star rating from Booking.com's 10-point scale
    const rating = calculateRating(review.review_score);

    // Build comment from available content
    let comment = '';
    if (review.content?.headline) {
      comment = review.content.headline;
    } else if (review.content?.positive) {
      comment = review.content.positive;
    } else if (review.content?.negative) {
      comment = review.content.negative;
    } else {
      comment = 'Guest review from Booking.com';
    }

    // Create unique ID for this review
    const reviewId = `booking_${review.review_id || Date.now()}_${index}`;

    return {
      _id: reviewId,
      userId: 'booking_user',
      name: review.reviewer?.name || 'Booking.com Guest',
      email: 'booking@guest.com',
      rating: rating,
      comment: comment,
      source: 'booking.com',
      externalId: reviewId,
      
      // Store original Booking.com data
      bookingData: {
        originalScore: review.review_score,
        reviewId: review.review_id,
        
        // Content
        headline: review.content?.headline || null,
        positiveText: review.content?.positive || null,
        negativeText: review.content?.negative || null,
        
        // Dates
        stayDate: review.stay_date || null,
        reviewDate: review.review_date || null,
        
        // Room and trip info
        roomType: review.room_type || null,
        tripType: review.trip_type || null,
        
        // Reviewer info
        country: review.reviewer?.country_code || null,
        isGenius: review.reviewer?.is_genius || false,
        
        // Individual scores (0-10 scale)
        scoring: {
          staff: review.scoring?.staff || null,
          clean: review.scoring?.clean || null,
          location: review.scoring?.location || null,
          facilities: review.scoring?.facilities || null,
          value: review.scoring?.value || null,
          comfort: review.scoring?.comfort || null,
          wifi: review.scoring?.wifi || null
        },
        
        // Property response (if any)
        propertyResponse: review.response?.text || null,
        responseDate: review.response?.date || null
      },
      
      replies: [], // Will be populated from database
      createdAt: review.review_date || new Date().toISOString(),
      updatedAt: review.review_date || new Date().toISOString(),
      isEdited: false
    };
  });
};

/**
 * Convert Booking.com score (0-10) to 5-star rating
 * @param {number} score - Booking.com score (0-10)
 * @returns {number} - Star rating (1-5)
 */
const calculateRating = (score) => {
  if (!score || score < 0) return 1;
  
  // Booking.com uses 0-10 scale
  if (score >= 9) return 5;      // 9-10 → 5 stars (Excellent)
  if (score >= 7) return 4;      // 7-8.9 → 4 stars (Good)
  if (score >= 5) return 3;      // 5-6.9 → 3 stars (Average)
  if (score >= 3) return 2;      // 3-4.9 → 2 stars (Poor)
  return 1;                       // 0-2.9 → 1 star (Very Poor)
};

/**
 * Get statistics from Booking.com reviews
 * @param {Array} reviews - Transformed reviews
 * @returns {Object} - Statistics object
 */
const getBookingStats = (reviews) => {
  if (!reviews || reviews.length === 0) {
    return {
      totalReviews: 0,
      averageRating: '0.0',
      averageBookingScore: '0.0',
      ratingDistribution: {
        '1': 0,
        '2': 0,
        '3': 0,
        '4': 0,
        '5': 0
      },
      categoryScores: {
        staff: '0.0',
        clean: '0.0',
        location: '0.0',
        facilities: '0.0',
        value: '0.0',
        comfort: '0.0',
        wifi: '0.0'
      }
    };
  }

  // Calculate rating distribution
  const distribution = {
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0
  };

  let totalRating = 0;
  let totalBookingScore = 0;
  let bookingScoreCount = 0;

  const categoryTotals = {
    staff: 0,
    clean: 0,
    location: 0,
    facilities: 0,
    value: 0,
    comfort: 0,
    wifi: 0
  };

  const categoryCounts = {
    staff: 0,
    clean: 0,
    location: 0,
    facilities: 0,
    value: 0,
    comfort: 0,
    wifi: 0
  };

  reviews.forEach(review => {
    // Count star ratings
    const rating = Math.round(review.rating);
    if (rating >= 1 && rating <= 5) {
      distribution[rating.toString()]++;
    }
    totalRating += review.rating;

    // Count original Booking.com scores
    if (review.bookingData?.originalScore) {
      totalBookingScore += review.bookingData.originalScore;
      bookingScoreCount++;
    }

    // Aggregate category scores
    if (review.bookingData?.scoring) {
      Object.keys(categoryTotals).forEach(category => {
        const score = review.bookingData.scoring[category];
        if (score !== null && score !== undefined) {
          categoryTotals[category] += score;
          categoryCounts[category]++;
        }
      });
    }
  });

  // Calculate averages
  const avgRating = (totalRating / reviews.length).toFixed(1);
  const avgBookingScore = bookingScoreCount > 0 
    ? (totalBookingScore / bookingScoreCount).toFixed(1) 
    : '0.0';

  const categoryScores = {};
  Object.keys(categoryTotals).forEach(category => {
    categoryScores[category] = categoryCounts[category] > 0
      ? (categoryTotals[category] / categoryCounts[category]).toFixed(1)
      : '0.0';
  });

  return {
    totalReviews: reviews.length,
    averageRating: avgRating,
    averageBookingScore: avgBookingScore,
    ratingDistribution: distribution,
    categoryScores: categoryScores
  };
};

/**
 * Post a reply to a Booking.com review
 * Note: This requires additional API permissions and the reply goes through moderation
 * @param {string} hotelId - Hotel ID
 * @param {string} reviewId - Review ID
 * @param {string} responseText - Reply text
 * @returns {Promise<Object>} - Response status
 */
const postReviewResponse = async (hotelId, reviewId, responseText) => {
  try {
    const username = process.env.BOOKING_API_USERNAME;
    const password = process.env.BOOKING_API_PASSWORD;

    if (!username || !password) {
      return {
        success: false,
        error: 'API credentials not configured'
      };
    }

    const apiUrl = `${BOOKING_API_BASE_URL}/${hotelId}/reviews/${reviewId}/response`;

    const response = await axios.post(
      apiUrl,
      {
        text: responseText
      },
      {
        auth: {
          username: username,
          password: password
        },
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        timeout: 30000
      }
    );

    return {
      success: true,
      message: 'Response submitted successfully. It will appear after moderation (up to 48 hours).',
      data: response.data
    };

  } catch (error) {
    console.error('Error posting review response:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  fetchBookingReviews,
  transformBookingReviews,
  calculateRating,
  getBookingStats,
  postReviewResponse
};
