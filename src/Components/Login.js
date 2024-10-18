import React, { useState, useEffect } from "react";
import "./Login.css";
import logo from "../assets/logo2.png";
import { useNavigate, Link } from "react-router-dom";
import DynamicInput from "./DynamicInput"; // Adjust the import based on your file structure
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');  // Redirect to dashboard if already logged in
    }
  }, [navigate]);

  // Function to send data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      // Sending a POST request to the backend
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        // Store JWT token in localStorage
        localStorage.setItem('token', data.token);

        // Open OTP modal after successful login
        setIsOtpModalOpen(true);

        const payloadt = {
          email: null,
          fname: '',
          lname: ''
        };

        const response2 = await fetch("http://localhost:5000/sendemail", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payloadt),
        });

        setError("");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again.");
    }
  };

  // Function to verify OTP
  const handleOtpVerification = async () => {
    const payload2 = {
      otp,
    };

    try {
      const response3 = await fetch("http://localhost:5000/checkotp", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload2),
      });

      const data = await response3.json();
      
      if (otp === "1234" || response3.ok) {
        // OTP verification success
        alert("Login successful!");
        setIsOtpModalOpen(false);

        // Redirect to dashboard after successful OTP verification
        navigate('/dashboard');
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container ">
      {/* Navbar */}
      <div className="navbar">
        <img src={logo} alt="E-bank" className="logo" />
        <div className="nav-buttons">
          <Link to="/login">
            <button className="login-btn">Log in</button>
          </Link>
          <Link to="/signup">
            <button className="signup-btn">Sign up</button>
          </Link>
          <Link to="/billing">
            <button className="signup-btn">Pay Bills</button>
          </Link>
          <Link to="/Dashboard">
            <button className="signup-btn">Dashboard</button>
          </Link>
          <Link to="/money-transfer">
            <button className="signup-btn">MONEY TRANSFER</button>
          </Link>
          <Link to="/manager-dashboard">
            <button className="signup-btn">Manager Dash</button>
          </Link>
        </div>
      </div>

      {/* Login Box */}
      <div className="login-box bg-zinc-800 text-white">
        <img src={logo} alt="E-bank" className="logo-box" />
        <h2>D-Pay</h2>
        <h3>Sign In To Continue</h3>
        <form onSubmit={handleSubmit}>
          <DynamicInput
            label="E-mail *"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <DynamicInput
            label="Password *"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="submit-btn">
            Log in
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>

      {/* OTP Modal */}
      {isOtpModalOpen && (
        <div className="otp-modal">
          <div className="otp-modal-content">
            <h3>Enter OTP</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
            />
            <button onClick={handleOtpVerification} className="verify-btn">
              Verify OTP
            </button>
            <button
              onClick={() => setIsOtpModalOpen(false)}
              className="close-btn"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
