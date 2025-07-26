// src/components/user/OrderHistory.jsx
import React, { useEffect, useState } from 'react';
import API from '../../axiosInstance';

const STATUS_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'pending', label: 'Pending' },
  { value: 'accepted', label: 'Accepted' },
  { value: 'shipped', label: 'Shipped' },
  { value: 'delivered', label: 'Delivered' },
];

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [productsMap, setProductsMap] = useState({}); // { productId: productName }

  useEffect(() => {
    API.get('/orders/')
      .then(res => {
        setOrders(res.data);
        // Collect all product IDs from orders
        const allProductIds = Array.from(new Set(res.data.flatMap(order => order.products)));
        if (allProductIds.length > 0) {
          // Fetch all products and build a map
          API.get('/products/products/')
            .then(prodRes => {
              const map = {};
              prodRes.data.forEach(prod => {
                map[prod.id] = prod.name;
              });
              setProductsMap(map);
            });
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredOrders = statusFilter
    ? orders.filter(order => order.status === statusFilter)
    : orders;

  return (
    <div className="container mt-5">
      <h2>Your Orders</h2>
      <div className="mb-3">
        <label htmlFor="statusFilter" className="form-label">Filter by Status:</label>
        <select
          id="statusFilter"
          className="form-select"
          value={statusFilter}
          onChange={handleStatusChange}
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
      {filteredOrders.map(order => (
        <div key={order.id} className="card p-3 my-2">
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₹{order.total_price}</p>
          <p><strong>Ordered At:</strong> {order.created_at ? new Date(order.created_at).toLocaleString() : 'N/A'}</p>
          <p><strong>Products:</strong></p>
          <ul>
            {order.products.map(pid => (
              <li key={pid}>{productsMap[pid] || `Product #${pid}`}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
