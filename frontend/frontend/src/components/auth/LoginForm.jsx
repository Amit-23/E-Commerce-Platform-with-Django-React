import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/api/auth/login/', {
        email,
        password,
      });

      const accessToken = res.data.access;
      const refreshToken = res.data.refresh;

      // Store tokens
      localStorage.setItem('access', accessToken);
      localStorage.setItem('refresh', refreshToken);

      // Decode the token
      const decoded = jwtDecode(accessToken);
      console.log('Decoded token:', decoded);

      // Check if user is admin
      const isAdmin = decoded.is_staff || decoded.is_superuser;

      alert('Login successful!');

      if (isAdmin) {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (err) {
      console.error(err);
      alert('Login failed!');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4 text-center">Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" className="form-control mb-2" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="form-control mb-3" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
