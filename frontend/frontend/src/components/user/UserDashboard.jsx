// src/components/user/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import API from '../../axiosInstance';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch user profile
    API.get('/auth/dashboard/')
      .then(res => setProfile(res.data))
      .catch(err => console.error("Profile fetch error:", err));

    // Fetch products
    API.get('/products/')
      .then(res => {
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error("Products response is not an array:", res.data);
          setProducts([]);
        }
      })
      .catch(err => console.error("Products fetch error:", err));

    // Fetch categories
    API.get('/products/categories/')
      .then(res => {
        if (Array.isArray(res.data)) {
          setCategories(res.data);
        } else {
          console.error("Categories response is not an array:", res.data);
          setCategories([]);
        }
      })
      .catch(err => console.error("Categories fetch error:", err));
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <>
      <Link to="/logout" className="btn btn-danger mt-2 ms-3">
        Logout
      </Link>

      <div className="container mt-4">
        <h2>User Dashboard</h2>
        <p><strong>Name:</strong> {profile.full_name}</p>
        <p><strong>Phone:</strong> {profile.phone}</p>
        <p><strong>Address:</strong> {profile.address}</p>

        <hr />

        <h3>Available Categories</h3>
        <ul>
          {categories.map(cat => (
            <li key={cat.id}>{cat.name}</li>
          ))}
        </ul>

        <h3 className="mt-4">Available Products</h3>
        {products.length === 0 ? (
          <p>No products available.</p>
        ) : (
          products.map(prod => (
            <div key={prod.id} className="border p-3 my-2">
              <p><strong>Name:</strong> {prod.name}</p>
              <p><strong>Price:</strong> ₹{prod.price}</p>
              <p><strong>Category:</strong> {prod.category_name || 'Uncategorized'}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default UserDashboard;
