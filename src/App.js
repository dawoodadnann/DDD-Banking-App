import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/SignUp';
import Billing from './components/billing';
import Dashboard from './pages/DashboardPage'; 
import ManagerDashboard from './pages/ManagerDashboard';
import { MoneyTransfer } from './components/MoneyTransfer';
import LoanPage from './pages/LoanPage';
import HelpPage from './pages/HelpPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';
import PortfolioPage from './pages/PortfolioPage';
import ManagerLogin from './components/ManagerLogin';
import ManagerSignup from './components/ManagerSignUp';
import CardManagementPage from './pages/CardManagementPage';
import ManagerApproval from './components/ManagerApproval';
import UpdateCustomer from './components/ManagerUpdate';

// Helper component to conditionally render the Navbar
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

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/portfolio" />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/loan" element={<LoanPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/cards" element={<CardManagementPage />} />
          <Route path="/manager-dashboard" element={<ManagerDashboard />} />
          <Route path="/money-transfer" element={<MoneyTransfer />} />
          <Route path="/managerlogin" element={<ManagerLogin />} />
          <Route path="/managersignup" element={<ManagerSignup />} />
          <Route path="/managerapproval" element={<ManagerApproval />} />
          <Route path="/managerupdate" element={<UpdateCustomer />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
