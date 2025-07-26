// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { NotificationProvider } from './components/NotificationProvider';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import AdminDashboard from './components/admin/AdminDashboard';
import ProductManagement from './components/admin/ProductManagement';
import OrderManagement from './components/admin/OrderManagement';
import UserDashboard from './components/user/UserDashboard';
import OrderHistory from './components/user/OrderHistory';
import Logout from './components/auth/Logout';
import AddProduct from './components/admin/AddProduct';
import AddCategory from './components/admin/AddCategory';

function App() {
  return (
    <NotificationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/product-management" element={<ProductManagement />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/add-category" element={<AddCategory />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;
