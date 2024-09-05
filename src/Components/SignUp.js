import React, { useState } from 'react';
import './Signup.css';
import logo from '../assets/logo2.png';  
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

const Signup = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setError('Passwords do not match');
        } else if (email !== 'test@example.com') {
            setError('');
            
            alert('Signup successful!');
        } else {
            setError('Email already in use');
        }
    };

    return (
        <div className="signup-container" >
            <div className="navbar">
                <img src={logo} alt="E-bank" className="logo" />
                <div className="nav-buttons">
                    <Link to="/login">
                        <button className="login-btn">Log in</button>
                    </Link>
                    <Link to="/signup">
                        <button className="signup-btn">Sign up</button>
                    </Link>
                </div>
            </div>
            <div className="signup-box">
                <img src={logo} alt="E-bank" className="logo-box" />
                <h2>D-Pay</h2>
                <h3>Create an Account</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name *"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="E-mail *"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password *"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password *"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="submit-btn">Sign up</button>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default Signup;
