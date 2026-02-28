import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState({});
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    avgRating: 0,
    pending: 0,
    replied: 0
  });

  useEffect(() => {
    // Check if user is admin
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }

    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      alert('Access denied. Admin only.');
      navigate('/reviews');
      return;
    }

    setUser(parsedUser);
    fetchReviews();
  }, [navigate]);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/reviews');
      const data = await response.json();
      
      if (data.success) {
        setReviews(data.data);
        calculateStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (reviewsData) => {
    const total = reviewsData.length;
    const avgRating = total > 0 
      ? (reviewsData.reduce((sum, r) => sum + r.rating, 0) / total).toFixed(1)
      : 0;
    const replied = reviewsData.filter(r => r.adminReply).length;
    const pending = total - replied;

    setStats({ total, avgRating, pending, replied });
  };

  const handleReply = async (reviewId) => {
    const reply = replyText[reviewId];
    if (!reply || !reply.trim()) {
      alert('Please enter a reply');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}/reply`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ adminReply: reply })
      });

      const data = await response.json();

      if (data.success) {
        alert('Reply added successfully!');
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

  const handleDelete = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();

      if (data.success) {
        alert('Review deleted successfully!');
        fetchReviews();
      } else {
        alert(data.message || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Error deleting review');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

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
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Admin Dashboard</h1>
          <div className="header-actions">
            <span className="admin-name">👤 {user?.name}</span>
            <button onClick={() => navigate('/reviews')} className="view-reviews-btn">
              View Public Reviews
            </button>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="dashboard-container">
        {/* Statistics Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              📊
            </div>
            <div className="stat-info">
              <h3>{stats.total}</h3>
              <p>Total Reviews</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              ⭐
            </div>
            <div className="stat-info">
              <h3>{stats.avgRating}</h3>
              <p>Average Rating</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              ⏳
            </div>
            <div className="stat-info">
              <h3>{stats.pending}</h3>
              <p>Pending Replies</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
              ✅
            </div>
            <div className="stat-info">
              <h3>{stats.replied}</h3>
              <p>Replied</p>
            </div>
          </div>
        </div>

        {/* Reviews Management */}
        <div className="reviews-section">
          <div className="section-header">
            <h2>Manage Reviews</h2>
            <p>Review and respond to customer feedback</p>
          </div>

          {loading ? (
            <div className="loading">Loading reviews...</div>
          ) : reviews.length === 0 ? (
            <div className="no-reviews">
              <p>No reviews yet</p>
            </div>
          ) : (
            <div className="reviews-grid">
              {reviews.map((review) => (
                <div key={review._id} className="review-card-admin">
                  <div className="review-header-admin">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">
                        {review.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4>{review.name}</h4>
                        <p className="reviewer-email">{review.email}</p>
                        <p className="review-date">
                          {new Date(review.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="review-rating-admin" style={{ backgroundColor: getRatingColor(review.rating) }}>
                      <span className="rating-number">{review.rating.toFixed(1)}</span>
                      <span className="rating-text">{getRatingText(review.rating)}</span>
                    </div>
                  </div>

                  <div className="review-content-admin">
                    <p>{review.comment}</p>
                  </div>

                  {review.adminReply ? (
                    <div className="existing-reply">
                      <div className="reply-header">
                        <strong>✅ Your Reply</strong>
                        <span className="reply-date">
                          {new Date(review.repliedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p>{review.adminReply}</p>
                    </div>
                  ) : (
                    <div className="reply-section">
                      <textarea
                        placeholder="Write your reply to this review..."
                        value={replyText[review._id] || ''}
                        onChange={(e) => setReplyText({ ...replyText, [review._id]: e.target.value })}
                        rows="3"
                      />
                      <button 
                        onClick={() => handleReply(review._id)}
                        className="reply-btn"
                      >
                        Send Reply
                      </button>
                    </div>
                  )}

                  <div className="review-actions">
                    <button 
                      onClick={() => handleDelete(review._id)}
                      className="delete-btn"
                    >
                      🗑️ Delete Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
