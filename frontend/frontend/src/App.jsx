import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>hhhh</h1>} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />

          {/* Protected Admin Routes */}
        {/* <Route path="/admin/*" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
        </Route> */}

        {/* Protected User Routes */}
        {/* <Route path="/user/*" element={<UserLayout />}>
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="orders" element={<UserOrders />} />
        </Route> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;