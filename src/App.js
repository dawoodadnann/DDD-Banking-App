// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
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






function App() {
  return (
    <Router>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/loan" element={<LoanPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} /> 
        <Route path="/money-transfer" element={<MoneyTransfer/>} /> 
      </Routes>
    </Router>
  );
}

export default App;
