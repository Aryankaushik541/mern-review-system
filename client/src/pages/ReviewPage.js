import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ReviewPage.css';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: ''
  });
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const response = await axios.post('/api/reviews', formData);
      if (response.data.success) {
        setMessage('Review submitted successfully!');
        setFormData({
          name: '',
          email: '',
          rating: 5,
          comment: ''
        });
        fetchReviews();
      }
    } catch (error) {
      setMessage('Error submitting review. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < rating ? 'star filled' : 'star'}>
        ★
      </span>
    ));
  };

  return (
    <div className="review-page">
      <div className="container">
        <div className="review-form-section">
          <h2>Share Your Experience</h2>
          <form onSubmit={handleSubmit} className="review-form">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label>Rating</label>
              <select
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
              >
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Good</option>
                <option value="3">3 - Average</option>
                <option value="2">2 - Poor</option>
                <option value="1">1 - Terrible</option>
              </select>
            </div>

            <div className="form-group">
              <label>Comment</label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                required
                rows="4"
                placeholder="Share your thoughts..."
              />
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>

            {message && <div className="message">{message}</div>}
          </form>
        </div>

        <div className="reviews-section">
          <h2>Customer Reviews ({reviews.length})</h2>
          <div className="reviews-list">
            {reviews.length === 0 ? (
              <p className="no-reviews">No reviews yet. Be the first to review!</p>
            ) : (
              reviews.map((review) => (
                <div key={review._id} className="review-card">
                  <div className="review-header">
                    <div>
                      <h3>{review.name}</h3>
                      <div className="stars">{renderStars(review.rating)}</div>
                    </div>
                    <span className="review-date">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  
                  {review.adminReply && (
                    <div className="admin-reply">
                      <strong>Admin Reply:</strong>
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
      </div>
    </div>
  );
};

export default ReviewPage;