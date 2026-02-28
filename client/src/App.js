import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ReviewPage from './pages/ReviewPage';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default landing page - Public Review Page */}
        <Route path="/" element={<ReviewPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
        
        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Admin dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Redirect any unknown routes to review page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
