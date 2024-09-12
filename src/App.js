// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Components/Login'
import Signup from './Components/SignUp'
import Billing from './Components/billing';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path='/billing' element={<Billing/>}/>
      </Routes>
    </Router>
  );
}

export default App;
