// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import AdminDashboard from './components/admin/AdminDashboard';
import ProductManagement from './components/admin/ProductManagement';
import UserDashboard from './components/user/UserDashboard';
import OrderHistory from './components/user/OrderHistory';

function App() {
  return (
   <BrowserRouter>

<Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/user-dashboard" element={<UserDashboard />} />
      <Route path="/order-history" element={<OrderHistory />} />
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
      <Route path="/product-management" element={<ProductManagement />} />
    </Routes>
   </BrowserRouter>
  );
}

export default App;
