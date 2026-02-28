import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [replyText, setReplyText] = useState({});
  const [editingReview, setEditingReview] = useState({});
  const [editingReply, setEditingReply] = useState({});
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('overview'); // overview, reviews, users

  useEffect(() => {
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
    fetchAdminData();
  }, [navigate]);

  const fetchAdminData = async () => {
    const token = localStorage.getItem('token');
    
    try {
      // Fetch admin statistics
      const statsRes = await fetch('http://localhost:5000/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const statsData = await statsRes.json();
      if (statsData.success) {
        setStats(statsData.data);
      }

      // Fetch all reviews
      const reviewsRes = await fetch('http://localhost:5000/api/admin/reviews', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const reviewsData = await reviewsRes.json();
      if (reviewsData.success) {
        setReviews(reviewsData.data);
      }

      // Fetch all users
      const usersRes = await fetch('http://localhost:5000/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const usersData = await usersRes.json();
      if (usersData.success) {
        setUsers(usersData.data);
      }
    } catch (error) {
      console.error('Error fetching admin data:', error);
      alert('Error loading admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleAddReply = async (reviewId) => {
    const text = replyText[reviewId];
    if (!text || !text.trim()) {
      alert('Please enter a reply');
      return;
    }

    const token = localStorage.getItem('token');

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
        fetchAdminData();
      } else {
        alert(data.message || 'Failed to add reply');
      }
    } catch (error) {
      console.error('Error adding reply:', error);
      alert('Error adding reply');
    }
  };

  const handleEditReview = async (reviewId) => {
    const { rating, comment } = editingReview[reviewId];
    
    if (!comment || comment.trim().length < 10) {
      alert('Comment must be at least 10 characters');
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating, comment })
      });

      const data = await response.json();

      if (data.success) {
        setEditingReview({});
        fetchAdminData();
      } else {
        alert(data.message || 'Failed to edit review');
      }
    } catch (error) {
      console.error('Error editing review:', error);
      alert('Error editing review');
    }
  };

  const handleEditReply = async (reviewId, replyId) => {
    const text = editingReply[replyId];
    
    if (!text || !text.trim()) {
      alert('Reply cannot be empty');
      return;
    }

    const token = localStorage.getItem('token');

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
        fetchAdminData();
      } else {
        alert(data.message || 'Failed to edit reply');
      }
    } catch (error) {
      console.error('Error editing reply:', error);
      alert('Error editing reply');
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) {
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (data.success) {
        alert('Review deleted successfully!');
        fetchAdminData();
      } else {
        alert(data.message || 'Failed to delete review');
      }
    } catch (error) {
      console.error('Error deleting review:', error);
      alert('Error deleting review');
    }
  };

  const handleDeleteReply = async (reviewId, replyId) => {
    if (!window.confirm('Delete this reply?')) return;

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}/reply/${replyId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (data.success) {
        fetchAdminData();
      } else {
        alert(data.message || 'Failed to delete reply');
      }
    } catch (error) {
      console.error('Error deleting reply:', error);
      alert('Error deleting reply');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Delete this user and all their reviews?')) return;

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();

      if (data.success) {
        alert('User deleted successfully!');
        fetchAdminData();
      } else {
        alert(data.message || 'Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      alert('Error deleting user');
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

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} style={{ color: i <= rating ? '#FFD700' : '#ddd', fontSize: '16px' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  if (loading) {
    return <div className="loading">Loading admin dashboard...</div>;
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-content">
          <h1>👑 Admin Dashboard</h1>
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
        {/* Tab Navigation */}
        <div className="tab-navigation">
          <button 
            className={activeTab === 'overview' ? 'active' : ''}
            onClick={() => setActiveTab('overview')}
          >
            📊 Overview
          </button>
          <button 
            className={activeTab === 'reviews' ? 'active' : ''}
            onClick={() => setActiveTab('reviews')}
          >
            ⭐ Reviews Management
          </button>
          <button 
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            👥 User Management
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && stats && (
          <div className="overview-section">
            {/* Statistics Cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  👥
                </div>
                <div className="stat-info">
                  <h3>{stats.users.total}</h3>
                  <p>Total Users</p>
                  <small>{stats.users.active} active</small>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                  📊
                </div>
                <div className="stat-info">
                  <h3>{stats.reviews.total}</h3>
                  <p>Total Reviews</p>
                  <small>Avg: {stats.reviews.avgRating}/5</small>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                  💬
                </div>
                <div className="stat-info">
                  <h3>{stats.reviews.totalReplies}</h3>
                  <p>Total Replies</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' }}>
                  🔐
                </div>
                <div className="stat-info">
                  <h3>{stats.users.totalLogins}</h3>
                  <p>Total Logins</p>
                  <small>{stats.users.admins} admins</small>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity">
              <div className="activity-section">
                <h3>Recent Users</h3>
                <div className="activity-list">
                  {stats.recentActivity.users.map(u => (
                    <div key={u._id} className="activity-item">
                      <div className="activity-avatar">{u.name.charAt(0)}</div>
                      <div className="activity-details">
                        <strong>{u.name}</strong>
                        <p>{u.email}</p>
                        <small>
                          Joined: {new Date(u.createdAt).toLocaleDateString()} | 
                          Logins: {u.loginCount} | 
                          Role: {u.role}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="activity-section">
                <h3>Recent Reviews</h3>
                <div className="activity-list">
                  {stats.recentActivity.reviews.map(r => (
                    <div key={r._id} className="activity-item">
                      <div className="activity-avatar">{r.name.charAt(0)}</div>
                      <div className="activity-details">
                        <strong>{r.name}</strong>
                        <div>{renderStars(r.rating)}</div>
                        <p>{r.comment.substring(0, 100)}...</p>
                        <small>
                          {new Date(r.createdAt).toLocaleDateString()} | 
                          Replies: {r.replies.length}
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Management Tab */}
        {activeTab === 'reviews' && (
          <div className="reviews-section">
            <div className="section-header">
              <h2>Manage Reviews ({reviews.length})</h2>
              <p>Edit, reply to, and manage all customer reviews</p>
            </div>

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
                          {review.isEdited && <span className="edited-badge"> (edited)</span>}
                        </p>
                      </div>
                    </div>
                    <div className="review-rating-admin" style={{ backgroundColor: getRatingColor(review.rating) }}>
                      <span className="rating-number">{review.rating.toFixed(1)}</span>
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  {editingReview[review._id] ? (
                    <div className="edit-review-form">
                      <label>Rating:</label>
                      <div className="star-rating-input">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            onClick={() => setEditingReview({
                              ...editingReview,
                              [review._id]: { ...editingReview[review._id], rating: star }
                            })}
                            style={{ 
                              cursor: 'pointer', 
                              fontSize: '30px',
                              color: star <= editingReview[review._id].rating ? '#FFD700' : '#ddd'
                            }}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <label>Comment:</label>
                      <textarea
                        value={editingReview[review._id].comment}
                        onChange={(e) => setEditingReview({
                          ...editingReview,
                          [review._id]: { ...editingReview[review._id], comment: e.target.value }
                        })}
                        rows="4"
                      />
                      <div className="edit-actions">
                        <button onClick={() => handleEditReview(review._id)} className="save-btn">
                          Save Changes
                        </button>
                        <button onClick={() => setEditingReview({})} className="cancel-btn">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="review-content-admin">
                        <p>{review.comment}</p>
                      </div>
                      <button 
                        onClick={() => setEditingReview({ [review._id]: { rating: review.rating, comment: review.comment } })}
                        className="edit-review-btn"
                      >
                        ✏️ Edit Review
                      </button>
                    </>
                  )}

                  {/* Replies Section */}
                  {review.replies && review.replies.length > 0 && (
                    <div className="replies-section-admin">
                      <h4>💬 Replies ({review.replies.length})</h4>
                      {review.replies.map((reply) => (
                        <div key={reply._id} className={`reply-item ${reply.userRole === 'admin' ? 'admin-reply' : 'user-reply'}`}>
                          <div className="reply-header">
                            <div className="reply-author">
                              <strong>{reply.userName}</strong>
                              {reply.userRole === 'admin' && <span className="admin-badge">Admin</span>}
                              <p className="reply-date">
                                {new Date(reply.createdAt).toLocaleDateString()}
                                {reply.isEdited && <span className="edited-badge"> (edited)</span>}
                              </p>
                            </div>
                            <div className="reply-actions">
                              <button onClick={() => setEditingReply({ [reply._id]: reply.text })}>
                                ✏️
                              </button>
                              <button onClick={() => handleDeleteReply(review._id, reply._id)}>
                                🗑️
                              </button>
                            </div>
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
                                <button onClick={() => setEditingReply({})} className="cancel-btn">
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

                  {/* Add Reply */}
                  <div className="reply-section">
                    <textarea
                      placeholder="Write your reply to this review..."
                      value={replyText[review._id] || ''}
                      onChange={(e) => setReplyText({ ...replyText, [review._id]: e.target.value })}
                      rows="3"
                    />
                    <button onClick={() => handleAddReply(review._id)} className="reply-btn">
                      Send Reply
                    </button>
                  </div>

                  <div className="review-actions">
                    <button onClick={() => handleDeleteReview(review._id)} className="delete-btn">
                      🗑️ Delete Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Management Tab */}
        {activeTab === 'users' && (
          <div className="users-section">
            <div className="section-header">
              <h2>User Management ({users.length})</h2>
              <p>View and manage all registered users</p>
            </div>

            <div className="users-table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Login Count</th>
                    <th>Last Login</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">{u.name.charAt(0)}</div>
                          <strong>{u.name}</strong>
                        </div>
                      </td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`role-badge ${u.role}`}>
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <span className={`status-badge ${u.isActive ? 'active' : 'inactive'}`}>
                          {u.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>{u.loginCount}</td>
                      <td>{u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never'}</td>
                      <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td>
                        <button 
                          onClick={() => handleDeleteUser(u._id)}
                          className="delete-user-btn"
                          disabled={u._id === user._id}
                        >
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
