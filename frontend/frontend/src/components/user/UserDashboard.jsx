// src/components/user/UserDashboard.jsx
import React, { useEffect, useState } from 'react';
import API from '../../axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { FaBoxOpen } from 'react-icons/fa'; // Optional: Order icon
import NotificationBell from '../NotificationBell';

const UserDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [ordering, setOrdering] = useState({});
  const [orderSuccess, setOrderSuccess] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = (page = 1) => {
    setLoading(true);
    API.get(`products/products/?page=${page}`)
      .then(res => {
        if (res.data && res.data.results) {
          setProducts(res.data.results);
          setTotalPages(Math.ceil(res.data.count / 10));
          setCurrentPage(page);
        } else {
          console.error("Products response format error:", res.data);
          setProducts([]);
          setTotalPages(1);
        }
      })
      .catch(err => {
        console.error("Products fetch error:", err);
        setProducts([]);
        setTotalPages(1);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    API.get('/auth/dashboard/')
      .then(res => setProfile(res.data))
      .catch(err => console.error("Profile fetch error:", err));

    fetchProducts(1);

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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
    fetchProducts(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleOrder = (productId) => {
    setOrdering(prev => ({ ...prev, [productId]: true }));
    setOrderSuccess(prev => ({ ...prev, [productId]: false }));
    API.post('/orders/', { products: [productId] })
      .then(() => {
        setOrderSuccess(prev => ({ ...prev, [productId]: true }));
      })
      .catch(() => {
        alert('Failed to place order.');
      })
      .finally(() => {
        setOrdering(prev => ({ ...prev, [productId]: false }));
      });
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(page);
  };

  if (!profile) return <p>Loading...</p>;

  const filteredProducts = products.filter(prod => {
    const matchesCategory = selectedCategory ? prod.category === parseInt(selectedCategory) : true;
    const matchesName = prod.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesName;
  });

  return (
    <>
      <div className="d-flex justify-content-between align-items-center px-3 py-2 bg-light border-bottom">
        <div>
          <h4 className="mb-0">User Dashboard</h4>
        </div>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => navigate('/order-history')}
          >
            <FaBoxOpen className="me-1" />
            Orders
          </button>
          <Link to="/logout" className="btn btn-danger">
            Logout
          </Link>
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-2 ms-3">
        <Link to="/logout" className="btn btn-danger">
          Logout
        </Link>
        <NotificationBell />
      </div>

      <div className="container mt-4">
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

        <select className="form-select mb-3" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>

        <input
          type="text"
          className="form-control mb-3"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <h3 className="mt-4">Available Products</h3>
        
        {loading ? (
          <div className="text-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <>
            {filteredProducts.map(prod => (
              <div key={prod.id} className="border p-3 my-2">
                <p><strong>Name:</strong> {prod.name}</p>
                <p><strong>Price:</strong> ₹{prod.price}</p>
                <p><strong>Category:</strong> {prod.category_name || 'Uncategorized'}</p>
                <button
                  className="btn btn-primary"
                  disabled={ordering[prod.id]}
                  onClick={() => handleOrder(prod.id)}
                >
                  {ordering[prod.id] ? 'Ordering...' : 'Order'}
                </button>
                {orderSuccess[prod.id] && <span className="text-success ms-2">Order placed!</span>}
              </div>
            ))}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <nav aria-label="Product pagination" className="mt-4">
                <ul className="pagination justify-content-center">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                  </li>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  
                  <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default UserDashboard;
