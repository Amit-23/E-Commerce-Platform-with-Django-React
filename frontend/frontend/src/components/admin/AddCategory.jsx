import React, { useState } from 'react';
import API from '../../axiosInstance';
import { useNavigate } from 'react-router-dom';
// hh


const AddCategory = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await API.post('/products/categories/', formData);
      alert('Category created successfully!');
      navigate('/admin/categories');
    } catch (err) {
      setError(err.response?.data || 'Creation failed. Check console.');
      console.error('Category creation error:', err.response);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mt-4">
      <h2>Add New Category</h2>
      {error && (
        <div className="alert alert-danger">
          {JSON.stringify(error, null, 2)}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name*</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={2}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Category'}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;