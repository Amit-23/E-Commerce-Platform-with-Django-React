// src/components/user/OrderHistory.jsx
import React, { useEffect, useState } from 'react';
import API from '../../axiosInstance';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    API.get('/orders/')
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Your Orders</h2>
      {orders.map(order => (
        <div key={order.id} className="card p-3 my-2">
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total:</strong> ₹{order.total_price}</p>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
