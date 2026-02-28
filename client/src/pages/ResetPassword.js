import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './ResetPassword.css';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    // Validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError(data.message || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-container">
      <div className="reset-password-card">
        <div className="reset-password-header">
          <h1>🔑 Reset Password</h1>
          <p>Enter your new password below.</p>
        </div>

        {message && (
          <div className="success-message">
            <span>✅</span>
            <p>{message}</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <span>❌</span>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="reset-password-form">
          <div className="form-group">
            <label htmlFor="password">🔒 New Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password (min 6 characters)"
                required
                disabled={loading}
                minLength={6}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                disabled={loading}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">🔒 Confirm Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? '🔄 Resetting...' : '✅ Reset Password'}
          </button>
        </form>

        <div className="reset-password-footer">
          <p>
            Remember your password? <Link to="/login">Login here</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
