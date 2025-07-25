import React, { useState } from 'react';
import API from '../../axiosInstance';

const AddCategory = () => {
  const [name, setName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/products/categories/', { name });  // updated path
      alert('Category added!');
      setName('');
    } catch (err) {
      alert('Failed to add category');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" placeholder="Category Name" value={name} onChange={e => setName(e.target.value)} required />
        <button type="submit" className="btn btn-primary">Add Category</button>
      </form>
    </div>
  );
};

export default AddCategory;
