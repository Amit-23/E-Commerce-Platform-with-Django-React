import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear JWT tokens from localStorage
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');

    // Optionally: show a quick message (toast/snackbar) or alert
    alert('You have been logged out.');

    // Redirect to login
    navigate('/login');
  }, [navigate]);

  return null; // nothing to render
};

export default Logout;
