import React, { useState, useEffect } from 'react';
import API from '../../axiosInstance';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    API.get('/products/categories/')  // updated path
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/products/products/', {  // updated path
        name,
        price,
        stock,
        category: categoryId,
      });
      alert('Product added!');
      setName('');
      setPrice('');
      setStock('');
      setCategoryId('');
    } catch (err) {
      alert('Failed to add product');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input className="form-control mb-2" type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
        <input className="form-control mb-2" type="number" placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} required />
        
        <select className="form-control mb-3" value={categoryId} onChange={e => setCategoryId(e.target.value)} required>
          <option value="">Select Category</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <button type="submit" className="btn btn-success">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
