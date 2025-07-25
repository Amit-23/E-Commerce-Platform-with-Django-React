// src/components/user/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import API from '../../axiosInstance';

const UserDashboard = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    API.get('/auth/dashboard/')
      .then(res => setProfile(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="container mt-5">
      <h2>User Dashboard</h2>
      <p><strong>Name:</strong> {profile.full_name}</p>
      <p><strong>Phone:</strong> {profile.phone}</p>
      <p><strong>Address:</strong> {profile.address}</p>
    </div>
  );
};

export default UserDashboard;
