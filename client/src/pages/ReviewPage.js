import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReviewPage.css';

function ReviewPage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [user, setUser] = useState(null);
  const [filters, setFilters] = useState({
    reviewers: 'all',
    scores: 'all',
    sortBy: 'recent'
  });
  
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
    
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reviews');
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to submit a review');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newReview)
      });

      const data = await response.json();

      if (data.success) {
        alert('Review submitted successfully!');
        setShowReviewForm(false);
        setNewReview({ rating: 5, comment: '' });
        fetchReviews();
      } else {
        alert(data.message || 'Failed to submit review');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Calculate statistics
  const calculateStats = () => {
    if (reviews.length === 0) return { avgRating: 0, categories: {} };

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const avgRating = (totalRating / reviews.length).toFixed(1);

    // Mock category ratings (you can customize this based on your needs)
    const categories = {
      staff: (avgRating * 0.95).toFixed(1),
      facilities: (avgRating * 0.92).toFixed(1),
      cleanliness: (avgRating * 0.98).toFixed(1),
      comfort: (avgRating * 0.90).toFixed(1),
      valueForMoney: (avgRating * 0.85).toFixed(1),
      location: (avgRating * 0.99).toFixed(1),
      freeWifi: (avgRating * 0.94).toFixed(1)
    };

    return { avgRating, categories };
  };

  const stats = calculateStats();

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    if (filters.scores !== 'all') {
      const score = parseInt(filters.scores);
      if (review.rating !== score) return false;
    }
    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'recent') {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else if (filters.sortBy === 'highest') {
      return b.rating - a.rating;
    } else if (filters.sortBy === 'lowest') {
      return a.rating - b.rating;
    }
    return 0;
  });

  const getRatingColor = (rating) => {
    if (rating >= 4.5) return '#0071c2';
    if (rating >= 3.5) return '#008009';
    if (rating >= 2.5) return '#ff8c00';
    return '#cc0000';
  };

  const getRatingText = (rating) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 3.5) return 'Good';
    if (rating >= 2.5) return 'Average';
    return 'Poor';
  };

  return (
    <div className="review-page">
      {/* Header */}
      <div className="review-header">
        <div className="header-content">
          <h1>Guest Reviews</h1>
          <div className="header-actions">
            {user ? (
              <>
                <span className="user-name">Welcome, {user.name}</span>
                <button onClick={() => setShowReviewForm(true)} className="write-review-btn">
                  Write a Review
                </button>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <button onClick={() => navigate('/login')} className="login-btn">
                Login to Review
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="review-container">
        {/* Rating Summary */}
        <div className="rating-summary">
          <div className="overall-rating">
            <div className="rating-score" style={{ backgroundColor: getRatingColor(stats.avgRating) }}>
              {stats.avgRating}
            </div>
            <div className="rating-info">
              <h2>{getRatingText(stats.avgRating)}</h2>
              <p>{reviews.length} reviews</p>
              <p className="real-reviews">We aim for 100% real reviews ⓘ</p>
            </div>
          </div>

          {/* Categories */}
          <div className="categories-section">
            <h3>Categories:</h3>
            <div className="categories-grid">
              <div className="category-item">
                <span>Staff</span>
                <div className="category-bar">
                  <div className="bar-fill" style={{ width: `${(stats.categories.staff / 5) * 100}%` }}></div>
                </div>
                <span className="category-score">{stats.categories.staff}</span>
              </div>
              <div className="category-item">
                <span>Facilities</span>
                <div className="category-bar">
                  <div className="bar-fill" style={{ width: `${(stats.categories.facilities / 5) * 100}%` }}></div>
                </div>
                <span className="category-score">{stats.categories.facilities}</span>
              </div>
              <div className="category-item">
                <span>Cleanliness</span>
                <div className="category-bar">
                  <div className="bar-fill" style={{ width: `${(stats.categories.cleanliness / 5) * 100}%` }}></div>
                </div>
                <span className="category-score">{stats.categories.cleanliness}</span>
              </div>
              <div className="category-item">
                <span>Comfort</span>
                <div className="category-bar">
                  <div className="bar-fill" style={{ width: `${(stats.categories.comfort / 5) * 100}%` }}></div>
                </div>
                <span className="category-score">{stats.categories.comfort}</span>
              </div>
              <div className="category-item">
                <span>Value for money</span>
                <div className="category-bar">
                  <div className="bar-fill" style={{ width: `${(stats.categories.valueForMoney / 5) * 100}%` }}></div>
                </div>
                <span className="category-score">{stats.categories.valueForMoney}</span>
              </div>
              <div className="category-item">
                <span>Location</span>
                <div className="category-bar">
                  <div className="bar-fill" style={{ width: `${(stats.categories.location / 5) * 100}%` }}></div>
                </div>
                <span className="category-score">{stats.categories.location}</span>
              </div>
              <div className="category-item">
                <span>Free WiFi</span>
                <div className="category-bar">
                  <div className="bar-fill" style={{ width: `${(stats.categories.freeWifi / 5) * 100}%` }}></div>
                </div>
                <span className="category-score">{stats.categories.freeWifi}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <h3>Filters</h3>
          <div className="filters-grid">
            <div className="filter-group">
              <label>Review scores</label>
              <select value={filters.scores} onChange={(e) => setFilters({...filters, scores: e.target.value})}>
                <option value="all">All ({reviews.length})</option>
                <option value="5">Excellent: 5</option>
                <option value="4">Good: 4</option>
                <option value="3">Average: 3</option>
                <option value="2">Poor: 2</option>
                <option value="1">Terrible: 1</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Sort reviews by:</label>
              <select value={filters.sortBy} onChange={(e) => setFilters({...filters, sortBy: e.target.value})}>
                <option value="recent">Most recent</option>
                <option value="highest">Highest rated</option>
                <option value="lowest">Lowest rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="reviews-list">
          <h3>Guest reviews</h3>
          {loading ? (
            <p>Loading reviews...</p>
          ) : filteredReviews.length === 0 ? (
            <p>No reviews found.</p>
          ) : (
            filteredReviews.map((review) => (
              <div key={review._id} className="review-card">
                <div className="review-header-card">
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4>{review.name}</h4>
                      <p className="review-date">
                        Reviewed: {new Date(review.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="review-rating" style={{ backgroundColor: getRatingColor(review.rating) }}>
                    {review.rating.toFixed(1)}
                  </div>
                </div>
                <div className="review-content">
                  <p>{review.comment}</p>
                </div>
                {review.adminReply && (
                  <div className="admin-reply">
                    <strong>Admin Response:</strong>
                    <p>{review.adminReply}</p>
                    <span className="reply-date">
                      {new Date(review.repliedAt).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="modal-overlay" onClick={() => setShowReviewForm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Write a Review</h2>
            <form onSubmit={handleSubmitReview}>
              <div className="form-group">
                <label>Rating: {newReview.rating}/5</label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={newReview.rating}
                  onChange={(e) => setNewReview({...newReview, rating: parseInt(e.target.value)})}
                  className="rating-slider"
                />
                <div className="rating-labels">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                </div>
              </div>
              <div className="form-group">
                <label>Your Review</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="Share your experience..."
                  rows="5"
                  required
                />
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowReviewForm(false)} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReviewPage;
