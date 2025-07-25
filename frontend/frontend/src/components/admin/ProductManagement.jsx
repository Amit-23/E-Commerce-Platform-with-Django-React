// src/components/admin/ProductManagement.jsx
import React, { useEffect, useState } from 'react';
import API from '../../axiosInstance';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    API.get('/products/')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Manage Products</h2>
      {products.map(prod => (
        <div key={prod.id} className="border p-3 my-2">
          <p><strong>Name:</strong> {prod.name}</p>
          <p><strong>Price:</strong> ₹{prod.price}</p>
          <p><strong>Stock:</strong> {prod.stock}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductManagement;
