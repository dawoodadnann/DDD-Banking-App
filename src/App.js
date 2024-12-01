import React from 'react';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Login from './Compo/Login';
import Signup from './Compo/SignUp';
import Billing from './Compo/billing';
import Dashboard from './pages/DashboardPage';
import LoanPage from './pages/LoanPage';
import HelpPage from './pages/HelpPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Compo/Navigation';
import ManagerNavigation from './Compo/ManagerNavigation';
import PortfolioPage from './pages/PortfolioPage';
import ManagerLogin from './Compo/ManagerLogin';
import ManagerSignup from './Compo/ManagerSignUp';
import CardManagementPage from './pages/CardManagementPage';
import { MoneyTransfer } from './Compo/MoneyTransfer';
import ManagerDashboard from './pages/ManagerDashboard';
import ManagerApproval from './Compo/ManagerApproval';
import UpdateCustomer from './Compo/ManagerUpdate';
import ManagerFAQPage from './Compo/managerFaqAnswer';
import NavigationUnauthor from './Compo/navigationUnauthor';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Add your custom styles here

const Layout = ({ children }) => {
  const [scrollOpacity, setScrollOpacity] = useState(0.5); // Initial opacity value
  const location = useLocation();

  const hideNavOnPages = ['/portfolio', '/login', '/signup', '/managerlogin', '/managersignup'];
  const managerPages = ['/managerfaqpage', '/managerapproval', '/managerupdate', '/manager-dashboard'];

  const isPortfolioPage = location.pathname === '/portfolio';

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const opacity = Math.max(0.2, 1 - scrollPosition / 5000); // Use a larger divisor for gradual fade
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-wrapper">
      {!isPortfolioPage && (
        <div
          className="parallax-background"
          style={{ opacity: scrollOpacity }} // Dynamically set opacity
        ></div>
      )}

      {/* Navigation Bar Logic */}
      {!hideNavOnPages.includes(location.pathname) && !managerPages.includes(location.pathname) && <Navigation />}
      {managerPages.includes(location.pathname) && <ManagerNavigation />}
      {hideNavOnPages.includes(location.pathname) && <NavigationUnauthor />}

      {/* Content */}
      <div className="content-wrapper">{children}</div>
    </div>
  );
};



const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
};

const ManagerProtectedRoute = ({ element }) => {
  const managerToken = localStorage.getItem('managerToken');
  return managerToken ? element : <Navigate to="/managerlogin" />;
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
          <Route path="/billing" element={<ProtectedRoute element={<Billing />} />} />
          <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path="/loan" element={<ProtectedRoute element={<LoanPage />} />} />
          <Route path="/help" element={<ProtectedRoute element={<HelpPage />} />} />
          <Route path="/cards" element={<ProtectedRoute element={<CardManagementPage />} />} />
          <Route path="/money-transfer" element={<ProtectedRoute element={<MoneyTransfer />} />} />
          <Route path="/managerlogin" element={<ManagerLogin />} />
          <Route path="/managersignup" element={<ManagerSignup />} />
          <Route path="/manager-dashboard" element={<ManagerProtectedRoute element={<ManagerDashboard />} />} />
          <Route path="/managerapproval" element={<ManagerProtectedRoute element={<ManagerApproval />} />} />
          <Route path="/managerupdate" element={<ManagerProtectedRoute element={<UpdateCustomer />} />} />
          <Route path="/managerfaqpage" element={<ManagerProtectedRoute element={<ManagerFAQPage />} />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
