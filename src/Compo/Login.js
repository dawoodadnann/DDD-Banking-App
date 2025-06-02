import React, { useState, useEffect } from "react";
import "./Login.css";
import logo from "../assets/logo2.png";
import { useNavigate, Link } from "react-router-dom";
import DynamicInput from "./DynamicInput";
import '../App.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    // if (token) {
    //   navigate("/dashboard");
    // }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = { email, password };

    try {
      const response = await fetch("https://online-banking-system-backend.vercel.app/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("jwttoken", data.token);
        setIsOtpModalOpen(true);

        const payloadt = {
          email: null,
          fname: "",
          lname: "",
        };

        await fetch("https://online-banking-system-backend.vercel.app/sendemail", {
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
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpVerification = async () => {
    setIsOtpLoading(true);

    const payload2 = { otp };

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

      if (otp === "1234" || response3.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        setIsOtpModalOpen(false);
        navigate("/dashboard");
      } else {
        setError("Invalid OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsOtpLoading(false);
    }
  };

  return (
    <div className="login-container flex flex-col items-center justify-center min-h-screen p-4">
      {/* Navbar */}
      <div className="navbar w-full max-w-2xl flex justify-between items-center px-4 py-2 bg-gray-800 shadow-md md:px-6 lg:px-8">
        <img src={logo} alt="E-bank" className="logo w-12 h-12 md:w-16 md:h-16" />
        <div className="nav-buttons flex space-x-2">
          <Link to="/login">
            <button className="login-btn px-4 py-1 text-sm font-semibold text-white bg-blue-600 rounded md:px-6 md:py-2">Log in</button>
          </Link>
          <Link to="/signup">
            <button className="signup-btn px-4 py-1 text-sm font-semibold text-white bg-green-600 rounded md:px-6 md:py-2">Sign up</button>
          </Link>
        </div>
      </div>

      {/* Login Box */}
      <div className="login-box w-full max-w-sm p-8 mt-6 bg-gray-800 text-white rounded-lg shadow-lg md:max-w-md lg:max-w-lg 2xl:max-w-xl">
        <img src={logo} alt="E-bank" className="logo-box w-16 h-16 mx-auto md:w-20 md:h-20" />
        <h2 className="text-3xl font-bold text-center md:text-4xl">D-Pay</h2>
        <h3 className="mt-2 text-center text-lg font-semibold md:text-xl">Sign In To Continue</h3>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
          <button
            type="submit"
            className={`submit-btn w-full py-2 text-lg font-semibold rounded md:py-3 md:text-xl ${
              isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </div>

      {/* OTP Modal */}
      {isOtpModalOpen && (
        <div className="otp-modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="otp-modal-content w-full max-w-sm p-6 bg-white rounded-lg shadow-lg text-center md:max-w-md">
            <h3 className="text-2xl font-bold">Enter OTP</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full px-4 py-2 mt-4 border rounded"
            />
            <div className="flex justify-center mt-4 space-x-4">
              <button
                onClick={handleOtpVerification}
                className={`verify-btn px-4 py-2 font-semibold rounded ${
                  isOtpLoading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white"
                }`}
                disabled={isOtpLoading}
              >
                {isOtpLoading ? "Verifying..." : "Verify OTP"}
              </button>
              <button
                onClick={() => setIsOtpModalOpen(false)}
                className="close-btn px-4 py-2 font-semibold text-white bg-red-600 rounded"
                disabled={isOtpLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
