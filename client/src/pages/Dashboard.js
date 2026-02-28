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
        // Transform nested structure to flat structure for easier access
        const transformedStats = {
          totalUsers: statsData.data.users?.total || 0,
          activeUsers: statsData.data.users?.active || 0,
          adminUsers: statsData.data.users?.admins || 0,
          regularUsers: statsData.data.users?.regular || 0,
          totalLogins: statsData.data.users?.totalLogins || 0,
          totalReviews: statsData.data.reviews?.total || 0,
          averageRating: statsData.data.reviews?.avgRating || 0,
          totalReplies: statsData.data.reviews?.totalReplies || 0,
          recentUsers: statsData.data.recentActivity?.users || [],
          recentReviews: statsData.data.recentActivity?.reviews || []
        };
        setStats(transformedStats);
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
    const editData = editingReview[reviewId];
    if (!editData) return;

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          rating: editData.rating,
          comment: editData.comment
        })
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

  const handleChangeRole = async (userId, currentRole) => {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    
    if (!window.confirm(`Change user role to ${newRole}?`)) {
      return;
    }

    const token = localStorage.getItem('token');

    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ role: newRole })
      });

      const data = await response.json();

      if (data.success) {
        alert(`User role changed to ${newRole} successfully!`);
        fetchAdminData();
      } else {
        alert(data.message || 'Failed to change role');
      }
    } catch (error) {
      console.error('Error changing role:', error);
      alert('Error changing role');
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
    if (rating >= 4.5) return '#10b981';
    if (rating >= 3.5) return '#3b82f6';
    if (rating >= 2.5) return '#f59e0b';
    return '#ef4444';
  };

  const getRatingLabel = (rating) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 3.5) return 'Good';
    if (rating >= 2.5) return 'Average';
    return 'Poor';
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
            <button onClick={() => navigate('/')} className="view-reviews-btn">
              📝 View Reviews
            </button>
            <button onClick={handleLogout} className="logout-btn">
              🚪 Logout
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
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
                  👥
                </div>
                <div className="stat-info">
                  <h3>{stats.totalUsers}</h3>
                  <p>Total Users</p>
                  <small>{stats.activeUsers} active</small>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                  ⭐
                </div>
                <div className="stat-info">
                  <h3>{stats.totalReviews}</h3>
                  <p>Total Reviews</p>
                  <small>Avg: {stats.averageRating ? stats.averageRating.toFixed(1) : '0.0'} ⭐</small>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
                  💬
                </div>
                <div className="stat-info">
                  <h3>{stats.totalReplies}</h3>
                  <p>Total Replies</p>
                  <small>Across all reviews</small>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)' }}>
                  🔐
                </div>
                <div className="stat-info">
                  <h3>{stats.totalLogins}</h3>
                  <p>Total Logins</p>
                  <small>Platform activity</small>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="recent-activity">
              <div className="activity-section">
                <h3>Recent Users</h3>
                <div className="activity-list">
                  {stats.recentUsers && stats.recentUsers.length > 0 ? (
                    stats.recentUsers.map((u) => (
                      <div key={u._id} className="activity-item">
                        <div className="activity-avatar">{u.name.charAt(0)}</div>
                        <div className="activity-details">
                          <strong>{u.name}</strong>
                          <p>{u.email}</p>
                          <small>Joined {new Date(u.createdAt).toLocaleDateString()}</small>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No recent users</p>
                  )}
                </div>
              </div>

              <div className="activity-section">
                <h3>Recent Reviews</h3>
                <div className="activity-list">
                  {stats.recentReviews && stats.recentReviews.length > 0 ? (
                    stats.recentReviews.map((r) => (
                      <div key={r._id} className="activity-item">
                        <div className="activity-avatar" style={{ background: getRatingColor(r.rating) }}>
                          {r.rating}
                        </div>
                        <div className="activity-details">
                          <strong>{r.name}</strong>
                          <p>{r.comment.substring(0, 60)}...</p>
                          <small>{new Date(r.createdAt).toLocaleDateString()}</small>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No recent reviews</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reviews Management Tab */}
        {activeTab === 'reviews' && (
          <div className="reviews-section">
            <div className="section-header">
              <h2>Reviews Management ({reviews.length})</h2>
              <p>Edit, reply to, or delete reviews</p>
            </div>

            <div className="reviews-grid">
              {reviews.map((review) => (
                <div key={review._id} className="review-card-admin">
                  <div className="review-header-admin">
                    <div className="reviewer-info">
                      <div className="reviewer-avatar">{review.name.charAt(0)}</div>
                      <div>
                        <h4>{review.name}</h4>
                        <p className="reviewer-email">{review.email}</p>
                        <p className="review-date">
                          {new Date(review.createdAt).toLocaleDateString()}
                          {review.isEdited && <span className="edited-badge"> (edited)</span>}
                        </p>
                      </div>
                    </div>
                    <div 
                      className="review-rating-admin" 
                      style={{ background: getRatingColor(review.rating) }}
                    >
                      <span className="rating-number">{review.rating}</span>
                      <small>{getRatingLabel(review.rating)}</small>
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
                              fontSize: '32px',
                              cursor: 'pointer',
                              color: star <= editingReview[review._id].rating ? '#fbbf24' : '#d1d5db'
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
                        onClick={() => setEditingReview({ 
                          [review._id]: { rating: review.rating, comment: review.comment } 
                        })} 
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
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => handleChangeRole(u._id, u.role)}
                            className="edit-review-btn"
                            disabled={u._id === user._id}
                            style={{ 
                              padding: '8px 16px', 
                              fontSize: '13px',
                              opacity: u._id === user._id ? 0.5 : 1,
                              cursor: u._id === user._id ? 'not-allowed' : 'pointer'
                            }}
                          >
                            🔄 {u.role === 'admin' ? 'Make User' : 'Make Admin'}
                          </button>
                          <button 
                            onClick={() => handleDeleteUser(u._id)}
                            className="delete-user-btn"
                            disabled={u._id === user._id}
                          >
                            🗑️
                          </button>
                        </div>
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
