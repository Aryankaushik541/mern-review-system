import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReviewPage.css';

function ReviewPage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [editingReply, setEditingReply] = useState({});
  const [filters, setFilters] = useState({
    scores: 'all',
    sortBy: 'recent'
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
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/reviews');
      const data = await response.json();
      
      if (data.success) {
        // Fetch replies for each review
        const reviewsWithReplies = await Promise.all(
          data.data.map(async (review) => {
            const repliesResponse = await fetch(
              `http://localhost:5000/api/reviews/${review._id}/replies`
            );
            const repliesData = await repliesResponse.json();
            
            return {
              ...review,
              replies: repliesData.success ? repliesData.data : []
            };
          })
        );
        
        setReviews(reviewsWithReplies);
      } else {
        alert(data.message || 'Failed to load reviews');
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
      alert('Error loading reviews. Please refresh the page.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const handleAddReply = async (reviewId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to reply');
      navigate('/login');
      return;
    }

    const text = replyText[reviewId];
    if (!text || !text.trim()) {
      alert('Please enter a reply');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}/reply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: text.trim() })
      });

      const data = await response.json();

      if (data.success) {
        setReplyText({ ...replyText, [reviewId]: '' });
        fetchReviews(); // Refresh to show new reply
      } else {
        alert(data.message || 'Failed to add reply');
      }
    } catch (error) {
      console.error('Error adding reply:', error);
      alert('Error adding reply. Please try again.');
    }
  };

  const handleEditReply = async (reviewId, replyId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to edit');
      navigate('/login');
      return;
    }

    const text = editingReply[replyId];
    if (!text || !text.trim()) {
      alert('Reply cannot be empty');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/reviews/${reviewId}/reply/${replyId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ text: text.trim() })
        }
      );

      const data = await response.json();

      if (data.success) {
        setEditingReply({ ...editingReply, [replyId]: undefined });
        fetchReviews();
      } else {
        alert(data.message || 'Failed to edit reply');
      }
    } catch (error) {
      console.error('Error editing reply:', error);
      alert('Error editing reply. Please try again.');
    }
  };

  const handleDeleteReply = async (reviewId, replyId) => {
    if (!window.confirm('Are you sure you want to delete this reply?')) {
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to delete');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/reviews/${reviewId}/reply/${replyId}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (data.success) {
        fetchReviews();
      } else {
        alert(data.message || 'Failed to delete reply');
      }
    } catch (error) {
      console.error('Error deleting reply:', error);
      alert('Error deleting reply. Please try again.');
    }
  };

  const calculateStats = () => {
    if (reviews.length === 0) {
      return {
        avgRating: 0,
        categories: {
          staff: 0,
          facilities: 0,
          cleanliness: 0,
          comfort: 0,
          valueForMoney: 0,
          location: 0,
          freeWifi: 0
        }
      };
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const avgRating = totalRating / reviews.length;

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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? '#FFD700' : '#ddd', fontSize: '20px' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="review-page">
      {/* Header */}
      <div className="review-header">
        <div className="header-content">
          <h1>🏨 Booking.com Guest Reviews</h1>
          <div className="header-actions">
            {user ? (
              <>
                <span className="user-name">Welcome, {user.name}</span>
                {user.role === 'admin' && (
                  <button onClick={() => navigate('/dashboard')} className="admin-btn">
                    Admin Dashboard
                  </button>
                )}
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="login-btn">
                  Login to Reply
                </button>
                <button onClick={() => navigate('/signup')} className="signup-btn">
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="review-container">
        {/* Rating Summary */}
        <div className="rating-summary">
          <div className="overall-rating">
            <div className="rating-score" style={{ backgroundColor: getRatingColor(stats.avgRating) }}>
              {stats.avgRating.toFixed(1)}
            </div>
            <div className="rating-info">
              <h2>{getRatingText(stats.avgRating)}</h2>
              <p>{reviews.length} verified reviews from Booking.com</p>
              <div className="stars-display">{renderStars(Math.round(stats.avgRating))}</div>
            </div>
          </div>

          <div className="categories-rating">
            <h3>Categories:</h3>
            {Object.entries(stats.categories).map(([key, value]) => (
              <div key={key} className="category-item">
                <span className="category-name">
                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                </span>
                <div className="category-bar">
                  <div 
                    className="category-fill" 
                    style={{ width: `${(value / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="category-score">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <label>Filter by score:</label>
            <div className="filter-buttons">
              <select 
                value={filters.scores} 
                onChange={(e) => setFilters({ ...filters, scores: e.target.value })}
              >
                <option value="all">All scores</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
              </select>
            </div>
          </div>

          <div className="filter-group">
            <label>Sort by:</label>
            <div className="filter-buttons">
              <select 
                value={filters.sortBy} 
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              >
                <option value="recent">Most recent</option>
                <option value="highest">Highest score</option>
                <option value="lowest">Lowest score</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="reviews-list">
          <h3>Guest reviews from Booking.com</h3>
          {loading ? (
            <div className="loading-state">
              <p>Loading reviews from Booking.com...</p>
            </div>
          ) : filteredReviews.length === 0 ? (
            <div className="empty-state">
              <p>No reviews found.</p>
            </div>
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
                      <span className="source-badge booking">🏨 Booking.com Guest</span>
                      <div className="stars-display">{renderStars(review.rating)}</div>
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
                  
                  {/* Show Booking.com specific data if available */}
                  {review.bookingData && (
                    <div className="booking-details">
                      {review.bookingData.positiveText && (
                        <div className="booking-feedback positive">
                          <strong>👍 Liked:</strong>
                          <p>{review.bookingData.positiveText}</p>
                        </div>
                      )}
                      {review.bookingData.negativeText && (
                        <div className="booking-feedback negative">
                          <strong>👎 Disliked:</strong>
                          <p>{review.bookingData.negativeText}</p>
                        </div>
                      )}
                      <div className="booking-meta">
                        {review.bookingData.stayDate && (
                          <span>📅 Stayed: {new Date(review.bookingData.stayDate).toLocaleDateString()}</span>
                        )}
                        {review.bookingData.roomType && (
                          <span>🏠 Room: {review.bookingData.roomType}</span>
                        )}
                        {review.bookingData.tripType && (
                          <span>✈️ Trip: {review.bookingData.tripType}</span>
                        )}
                        {review.bookingData.country && (
                          <span>🌍 From: {review.bookingData.country}</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Replies Section */}
                {review.replies && review.replies.length > 0 && (
                  <div className="replies-section">
                    <h4>💬 Replies ({review.replies.length})</h4>
                    {review.replies.map((reply) => (
                      <div key={reply._id} className={`reply-item ${reply.userRole === 'admin' ? 'admin-reply' : 'user-reply'}`}>
                        <div className="reply-header">
                          <div className="reply-author">
                            <div className="reply-avatar">
                              {reply.userName.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <strong>{reply.userName}</strong>
                              {reply.userRole === 'admin' && <span className="admin-badge">Admin</span>}
                              <p className="reply-date">
                                {new Date(reply.createdAt).toLocaleDateString()}
                                {reply.isEdited && <span className="edited-badge"> (edited)</span>}
                              </p>
                            </div>
                          </div>
                          {user && (user._id === reply.userId || user.role === 'admin') && (
                            <div className="reply-actions">
                              <button onClick={() => setEditingReply({ ...editingReply, [reply._id]: reply.text })}>
                                ✏️
                              </button>
                              <button onClick={() => handleDeleteReply(review._id, reply._id)}>
                                🗑️
                              </button>
                            </div>
                          )}
                        </div>
                        {editingReply[reply._id] !== undefined ? (
                          <div className="edit-reply-form">
                            <textarea
                              value={editingReply[reply._id]}
                              onChange={(e) => setEditingReply({ ...editingReply, [reply._id]: e.target.value })}
                              rows="2"
                            />
                            <div className="edit-actions">
                              <button onClick={() => handleEditReply(review._id, reply._id)} className="save-btn">
                                Save
                              </button>
                              <button onClick={() => setEditingReply({ ...editingReply, [reply._id]: undefined })} className="cancel-btn">
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <p className="reply-text">{reply.text}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Reply Form */}
                {user && (
                  <div className="add-reply-section">
                    <textarea
                      placeholder="Write a reply to this Booking.com review..."
                      value={replyText[review._id] || ''}
                      onChange={(e) => setReplyText({ ...replyText, [review._id]: e.target.value })}
                      rows="3"
                    />
                    <button 
                      onClick={() => handleAddReply(review._id)}
                      className="reply-btn"
                      disabled={!replyText[review._id] || !replyText[review._id].trim()}
                    >
                      Add Reply
                    </button>
                  </div>
                )}

                {!user && (
                  <div className="login-prompt">
                    <p>
                      <button onClick={() => navigate('/login')} className="link-btn">Login</button> 
                      {' '}or{' '}
                      <button onClick={() => navigate('/signup')} className="link-btn">Sign up</button>
                      {' '}to reply to this review
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewPage;
