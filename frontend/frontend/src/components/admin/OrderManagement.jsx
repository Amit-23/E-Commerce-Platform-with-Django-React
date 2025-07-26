import React, { useEffect, useState } from 'react';
import API from '../../axiosInstance';
import NotificationBell from '../NotificationBell';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [productsMap, setProductsMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all orders
    API.get('/auth/admin-orders/')
      .then(res => {
        setOrders(res.data);
        // Collect all product IDs from orders
        const allProductIds = Array.from(new Set(res.data.flatMap(order => order.products)));
        if (allProductIds.length > 0) {
          // Fetch all products and build a map
          return API.get('/products/');
        }
        return Promise.resolve({ data: [] });
      })
      .then(prodRes => {
        if (prodRes.data) {
          const map = {};
          prodRes.data.forEach(prod => {
            map[prod.id] = prod.name;
          });
          setProductsMap(map);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching orders:', err);
        setLoading(false);
      });
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const response = await API.patch(`/auth/admin-orders/${orderId}/`, {
        status: newStatus
      });
      
      // Update the order in the local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? response.data : order
        )
      );
      
      alert(`Order status updated to ${newStatus}!`);
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status');
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending': return 'badge bg-warning';
      case 'accepted': return 'badge bg-info';
      case 'shipped': return 'badge bg-primary';
      case 'delivered': return 'badge bg-success';
      default: return 'badge bg-secondary';
    }
  };

  if (loading) {
    return <div className="container mt-5"><p>Loading orders...</p></div>;
  }

  return (
    <>
      <div className="d-flex justify-content-end mt-2 ms-3">
        <NotificationBell />
      </div>
      
      <div className="container mt-5">
        <h2>Order Management</h2>
        <p className="text-muted">Manage all customer orders and update their status</p>
        
        {orders.length === 0 ? (
          <div className="alert alert-info">No orders found.</div>
        ) : (
          orders.map(order => (
            <div key={order.id} className="card mb-3">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Order #{order.id}</h5>
                <span className={getStatusBadgeClass(order.status)}>
                  {order.status.toUpperCase()}
                </span>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <p><strong>Customer:</strong> {order.user_email || 'N/A'}</p>
                    <p><strong>Total:</strong> ₹{order.total_price}</p>
                    <p><strong>Ordered:</strong> {new Date(order.created_at).toLocaleString()}</p>
                  </div>
                  <div className="col-md-6">
                    <p><strong>Products:</strong></p>
                    <ul>
                      {order.products.map(pid => (
                        <li key={pid}>{productsMap[pid] || `Product #${pid}`}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-3">
                  <strong>Update Status:</strong>
                  <div className="btn-group ms-2" role="group">
                    <button
                      type="button"
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => handleStatusUpdate(order.id, 'pending')}
                      disabled={order.status === 'pending'}
                    >
                      Pending
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-info btn-sm"
                      onClick={() => handleStatusUpdate(order.id, 'accepted')}
                      disabled={order.status === 'accepted'}
                    >
                      Accept
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm"
                      onClick={() => handleStatusUpdate(order.id, 'shipped')}
                      disabled={order.status === 'shipped'}
                    >
                      Ship
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      onClick={() => handleStatusUpdate(order.id, 'delivered')}
                      disabled={order.status === 'delivered'}
                    >
                      Deliver
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default OrderManagement; 