// src/components/Logout.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('token');
    setTimeout(() => {
      navigate('/');
    }, 1500); // 1.5 sec delay before redirecting
  }, [navigate]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>🔒 Logged out successfully!</h2>
      <p>Redirecting to homepage...</p>
    </div>
  );
};

export default Logout;