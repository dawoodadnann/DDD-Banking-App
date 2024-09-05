import React, { useState } from 'react';
import './Login.css';
//import backgroundImage from '../assets/bg.png';  
import logo from '../assets/logo2.png';  
import { Link } from 'react-router-dom'; 

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
 
        if (email !== 'test@example.com' || password !== 'password123') {
            setError('Incorrect email or password');
        } else {
            setError('');
            
            alert('Login successful!');
        }
    };

    return (
        <div className="login-container" >
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
            <div className="login-box">
                <img src={logo} alt="E-bank" className="logo-box" />
                <h2>D-Pay</h2>
                <h3>Sign In To Continue</h3>
                <form onSubmit={handleSubmit}>
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
                    <button type="submit" className="submit-btn">Log in</button>
                </form>
                {error && <div className="error-message">{error}</div>}
            </div>
        </div>
    );
};

export default Login;
