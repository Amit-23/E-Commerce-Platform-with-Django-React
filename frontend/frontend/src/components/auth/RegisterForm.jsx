// src/components/auth/RegisterForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/auth/register/', {
        email,
        password,
      });
      alert('Registration successful!');
    } catch (error) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: 400 }}>
      <h2 className="mb-4 text-center">Register</h2>
      <form onSubmit={handleRegister}>
        <input type="email" className="form-control mb-2" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" className="form-control mb-3" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
