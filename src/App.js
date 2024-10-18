import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import Billing from './components/billing';
import Dashboard from './pages/DashboardPage'; 
import LoanPage from './pages/LoanPage';
import HelpPage from './pages/HelpPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import PortfolioPage from './pages/PortfolioPage';
import ManagerLogin from './components/ManagerLogin';
import ManagerSignup from './components/ManagerSignUp';
import CardManagementPage from './pages/CardManagementPage';
import { MoneyTransfer } from './components/MoneyTransfer';
import ManagerDashboard from './pages/ManagerDashboard';
import ManagerApproval from './components/ManagerApproval';
import UpdateCustomer from './components/ManagerUpdate';

// Helper component to conditionally render the Navbar
// const Layout = ({ children }) => {
//   const location = useLocation();
  
//   return (
//     <>
//       {/* Conditionally render Navigation except on portfolio page */}
//       {location.pathname !== '/portfolio' && <Navigation />}
//       {children}
//     </>
//   );
// };
const Layout = ({ children }) => {
  const location = useLocation();
  
  return (
    <>
      {/* Conditionally render Navigation except on portfolio page */}
      {location.pathname !== '/portfolio' && <Navigation />}
      {children}
    </>
  );
};

// ProtectedRoute component to restrict access to routes for non-logged-in users
const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  
  return token ? element : <Navigate to="/login" />;
};

// ProtectedRoute for manager login
const ManagerProtectedRoute = ({ element }) => {
  const managerToken = localStorage.getItem('managerToken');
  
  return managerToken ? element : <Navigate to="/managerlogin" />;
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/portfolio" />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/billing" element={<ProtectedRoute element={<Billing />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/loan" element={<ProtectedRoute element={<LoanPage />} />} />
          <Route path="/help" element={<ProtectedRoute element={<HelpPage />} />} />
          <Route path="/cards" element={<ProtectedRoute element={<CardManagementPage />} />} />
          <Route path="/moneytransfer" element={<ProtectedRoute element={<MoneyTransfer />} />} />

          {/* Manager Routes */}
          <Route path="/managerlogin" element={<ManagerLogin />} />
          <Route path="/managersignup" element={<ManagerSignup />} />
          <Route path="/manager-dashboard" element={<ManagerProtectedRoute element={<ManagerDashboard />} />} />
          <Route path="/managerapproval" element={<ManagerProtectedRoute element={<ManagerApproval />} />} />
          <Route path="/managerupdate" element={<ManagerProtectedRoute element={<UpdateCustomer />} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
