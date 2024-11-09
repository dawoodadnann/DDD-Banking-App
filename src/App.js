import React from 'react';
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
  
  // Define paths for pages where universal navigation should not be shown
  const hideNavOnPages = ['/portfolio', '/login', '/signup', '/managerlogin', '/managersignup'];
  
  // Define paths specifically for manager-related pages
  const managerPages = ['/managerfaqpage', '/managerapproval', '/managerupdate','/manager-dashboard'];

  return (
    <>
      {/* Conditionally render the universal Navigation if the current path is NOT in hideNavOnPages or managerPages */}
      {!hideNavOnPages.includes(location.pathname) && !managerPages.includes(location.pathname) && <Navigation />}
      
      {/* Conditionally render ManagerNavigation on manager-specific paths */}
      {managerPages.includes(location.pathname) && <ManagerNavigation />}

{/* Conditionally render basic navigation for the users login pages */}
{hideNavOnPages.includes(location.pathname) && <NavigationUnauthor />}
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
          <Route path="/money-transfer" element={<ProtectedRoute element={<MoneyTransfer />} />} />

          {/* Manager Routes */}
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
