import React, { useState } from "react";
import "./Login.css";
import logo from "../assets/logo2.png";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Function to  send data to the backend
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setError("");
        alert("Login successful!");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="login-container">
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
        </div>
      </div>
      <div className="login-box">
        <img src={logo} alt="E-bank" className="logo-box" />
        <h2>D-Pay</h2>
        <h3>Sign In To Continue</h3>
        <form onSubmit={handleSubmit}>
          <div class="form">
            <input
              class="textbox"
              type="email"
              placeholder=" "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label class="ilabel">E-mail *</label>
          </div>

          <div class="form">
            <input
              class="textbox"
              type="password"
              placeholder=" "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label class="ilabel">Password *</label>
          </div>

          <button type="submit" className="submit-btn">
            Log in
          </button>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default Login;
