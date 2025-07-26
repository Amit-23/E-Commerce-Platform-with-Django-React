// src/components/admin/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-end">
          <Link to="/logout" className="btn btn-danger">
            Logout
          </Link>
        </div>

        <h2 className="mt-4">Admin Dashboard</h2>
        <p>Welcome admin! You can manage products, categories, and orders.</p>

        <div className="mt-4">
          <Link to="/admin/add-product" className="btn btn-success me-3">
            ➕ Add Product
          </Link>
          <Link to="/admin/add-category" className="btn btn-primary me-3">
            ➕ Add Category
          </Link>
          <Link to="/admin/orders" className="btn btn-warning">
            📦 Manage Orders
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
