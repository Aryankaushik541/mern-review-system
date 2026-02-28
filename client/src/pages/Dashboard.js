import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [reviews, setReviews] = useState([]);
  const [replyText, setReplyText] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get('/api/reviews');
      if (response.data.success) {
        setReviews(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleReplyChange = (reviewId, value) => {
    setReplyText({
      ...replyText,
      [reviewId]: value
    });
  };

  const handleReplySubmit = async (reviewId) => {
    if (!replyText[reviewId] || replyText[reviewId].trim() === '') {
      setMessage('Please enter a reply');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await axios.put(`/api/reviews/${reviewId}/reply`, {
        adminReply: replyText[reviewId]
      });

      if (response.data.success) {
        setMessage('Reply added successfully!');
        setReplyText({
          ...replyText,
          [reviewId]: ''
        });
        fetchReviews();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error adding reply. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    try {
      const response = await axios.delete(`/api/reviews/${reviewId}`);
      if (response.data.success) {
        setMessage('Review deleted successfully!');
        fetchReviews();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      setMessage('Error deleting review.');
      console.error('Error:', error);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < rating ? 'star filled' : 'star'}>
        ★
      </span>
    ));
  };

  const getStats = () => {
    const totalReviews = reviews.length;
    const repliedReviews = reviews.filter(r => r.adminReply).length;
    const avgRating = reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

    return { totalReviews, repliedReviews, avgRating };
  };

  const stats = getStats();

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <h1>Admin Dashboard</h1>
        
        {message && <div className="dashboard-message">{message}</div>}

        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Reviews</h3>
            <p className="stat-number">{stats.totalReviews}</p>
          </div>
          <div className="stat-card">
            <h3>Replied</h3>
            <p className="stat-number">{stats.repliedReviews}</p>
          </div>
          <div className="stat-card">
            <h3>Average Rating</h3>
            <p className="stat-number">{stats.avgRating} ★</p>
          </div>
        </div>

        <div className="reviews-management">
          <h2>Manage Reviews</h2>
          {reviews.length === 0 ? (
            <p className="no-reviews">No reviews to manage yet.</p>
          ) : (
            <div className="dashboard-reviews-list">
              {reviews.map((review) => (
                <div key={review._id} className="dashboard-review-card">
                  <div className="review-info">
                    <div className="review-header-dash">
                      <div>
                        <h3>{review.name}</h3>
                        <p className="review-email">{review.email}</p>
                      </div>
                      <div className="review-meta">
                        <div className="stars">{renderStars(review.rating)}</div>
                        <span className="review-date">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="review-comment">{review.comment}</p>
                  </div>

                  {review.adminReply ? (
                    <div className="existing-reply">
                      <strong>Your Reply:</strong>
                      <p>{review.adminReply}</p>
                      <span className="reply-date">
                        Replied on {new Date(review.repliedAt).toLocaleDateString()}
                      </span>
                    </div>
                  ) : (
                    <div className="reply-section">
                      <textarea
                        placeholder="Write your reply..."
                        value={replyText[review._id] || ''}
                        onChange={(e) => handleReplyChange(review._id, e.target.value)}
                        rows="3"
                      />
                      <button
                        onClick={() => handleReplySubmit(review._id)}
                        disabled={loading}
                        className="reply-btn"
                      >
                        {loading ? 'Sending...' : 'Send Reply'}
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => handleDelete(review._id)}
                    className="delete-btn"
                  >
                    Delete Review
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;