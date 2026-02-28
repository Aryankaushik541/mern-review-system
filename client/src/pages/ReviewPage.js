import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReviewPage.css';

function ReviewPage() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [user, setUser] = useState(null);
  const [replyText, setReplyText] = useState({});
  const [editingReply, setEditingReply] = useState({});
  const [filters, setFilters] = useState({
    scores: 'all',
    sortBy: 'recent'
  });
  
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  });

  useEffect(() => {
    // Check if user is logged in (optional for viewing)
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
      alert('Error loading reviews. Please refresh the page.');
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

    if (!newReview.comment || newReview.comment.trim().length < 10) {
      alert('Comment must be at least 10 characters long');
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
      alert('Error submitting review. Please try again.');
    }
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
        fetchReviews();
      } else {
        alert(data.message || 'Failed to add reply');
      }
    } catch (error) {
      console.error('Error adding reply:', error);
      alert('Error adding reply');
    }
  };

  const handleEditReply = async (reviewId, replyId) => {
    const token = localStorage.getItem('token');
    const text = editingReply[replyId];
    
    if (!text || !text.trim()) {
      alert('Reply cannot be empty');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}/reply/${replyId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ text: text.trim() })
      });

      const data = await response.json();

      if (data.success) {
        setEditingReply({});
        fetchReviews();
      } else {
        alert(data.message || 'Failed to edit reply');
      }
    } catch (error) {
      console.error('Error editing reply:', error);
      alert('Error editing reply');
    }
  };

  const handleDeleteReply = async (reviewId, replyId) => {
    if (!window.confirm('Delete this reply?')) return;

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}/reply/${replyId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        fetchReviews();
      } else {
        alert(data.message || 'Failed to delete reply');
      }
    } catch (error) {
      console.error('Error deleting reply:', error);
      alert('Error deleting reply');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const calculateStats = () => {
    if (reviews.length === 0) return { avgRating: 0, categories: {} };

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const avgRating = (totalRating / reviews.length).toFixed(1);

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

  const commentLength = newReview.comment.trim().length;
  const isCommentValid = commentLength >= 10;

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
                {user.role === 'admin' && (
                  <button onClick={() => navigate('/dashboard')} className="admin-btn">
                    Admin Dashboard
                  </button>
                )}
                <button onClick={() => setShowReviewForm(true)} className="write-review-btn">
                  Write a Review
                </button>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="login-btn">
                  Login to Review
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
              {stats.avgRating}
            </div>
            <div className="rating-info">
              <h2>{getRatingText(stats.avgRating)}</h2>
              <div className="stars-display">{renderStars(Math.round(stats.avgRating))}</div>
              <p>{reviews.length} reviews</p>
              <p className="real-reviews">We aim for 100% real reviews ⓘ</p>
            </div>
          </div>

          {/* Categories */}
          <div className="categories-section">
            <h3>Categories:</h3>
            <div className="categories-grid">
              {Object.entries(stats.categories).map(([key, value]) => (
                <div key={key} className="category-item">
                  <span>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</span>
                  <div className="category-bar">
                    <div className="bar-fill" style={{ width: `${(value / 5) * 100}%` }}></div>
                  </div>
                  <span className="category-score">{value}</span>
                </div>
              ))}
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
                      <div className="stars-display">{renderStars(review.rating)}</div>
                      <p className="review-date">
                        Reviewed: {new Date(review.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                        {review.isEdited && <span className="edited-badge"> (edited)</span>}
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

                {/* Nested Replies Section */}
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
                      placeholder="Write a reply..."
                      value={replyText[review._id] || ''}
                      onChange={(e) => setReplyText({ ...replyText, [review._id]: e.target.value })}
                      rows="2"
                    />
                    <button onClick={() => handleAddReply(review._id)} className="reply-btn">
                      Reply
                    </button>
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
                <div className="star-rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => setNewReview({...newReview, rating: star})}
                      style={{ 
                        cursor: 'pointer', 
                        fontSize: '40px',
                        color: star <= newReview.rating ? '#FFD700' : '#ddd'
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <div className="form-group">
                <label>
                  Your Review 
                  <span style={{ 
                    marginLeft: '10px', 
                    fontSize: '0.9em',
                    color: isCommentValid ? '#008009' : '#cc0000'
                  }}>
                    ({commentLength}/10 characters minimum)
                  </span>
                </label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                  placeholder="Share your experience... (minimum 10 characters)"
                  rows="5"
                  required
                  style={{
                    borderColor: newReview.comment && !isCommentValid ? '#cc0000' : undefined
                  }}
                />
                {newReview.comment && !isCommentValid && (
                  <small style={{ color: '#cc0000', marginTop: '5px', display: 'block' }}>
                    Please write at least {10 - commentLength} more character{10 - commentLength !== 1 ? 's' : ''}
                  </small>
                )}
              </div>
              <div className="modal-actions">
                <button type="button" onClick={() => setShowReviewForm(false)} className="cancel-btn">
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={!isCommentValid}
                  style={{
                    opacity: isCommentValid ? 1 : 0.5,
                    cursor: isCommentValid ? 'pointer' : 'not-allowed'
                  }}
                >
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
