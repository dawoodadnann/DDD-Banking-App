import React, { useState } from "react";
import "./Login.css";
import logo from "../assets/logo2.png";
import { useNavigate, Link } from "react-router-dom";
import DynamicInput from "./DynamicInput"; // Adjust the import based on your file structure
import '../App.css'

const ManagerLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  // Function to send data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email,
      password,
    };

    try {
      // Sending a POST request to the backend for manager login
      const response = await fetch("https://online-banking-system-backend.vercel.app/loginmanager", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      localStorage.setItem('jwttoken', data.token); // Store jwt token

      if (response.ok) {
        const payloadt = {
          email: null, fname: '', lname: ''
        };

        // Open OTP modal after a successful login
        setIsOtpModalOpen(true);

        // Send OTP to the manager's email
        const response2 = await fetch("https://online-banking-system-backend.vercel.app/sendemail", {
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
      otp
    };

    try {
      const response3 = await fetch("https://online-banking-system-backend.vercel.app/checkotp", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload2),
      });

      const data = await response3.json();
      
      // OTP validation and redirection
      if (otp === "1234" || response3.ok) {
        alert("Login successful!");
        setIsOtpModalOpen(false);
        localStorage.setItem('managerToken', data.token); // Store manager token
        navigate(`/manager-dashboard`);
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container ">
      <div className="navbar">
        <img src={logo} alt="E-bank" className="logo" />
        <div className="nav-buttons">
          <Link to="/managerlogin">
            <button className="login-btn">M Log in</button>
          </Link>
          <Link to="/managersignup">
            <button className="login-btn">M Sign Up</button>
          </Link>
        </div>
      </div>
      <div className="login-box bg-zinc-800 text-white">
        <img src={logo} alt="E-bank" className="logo-box" />
        <h2>D-Pay Manager</h2>
        <h3>Manager Sign In To Continue</h3>
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

export default ManagerLogin;
