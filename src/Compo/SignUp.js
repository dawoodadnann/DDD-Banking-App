import React, { useState } from "react";
import logo from "../assets/logo2.png";
import DynamicInput from "./DynamicInput"; // Import the DynamicInput component
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    confirmPassword: "",
    nationality: "",
    gender: "",
  });
  const [error, setError] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    try {

      const payloadt = {
        email1: formData.email,
        fname: formData.fname,
        lname: formData.lname,
      };

      // Trigger OTP modal before registration
      setIsOtpModalOpen(true);

      // Send email to initiate OTP (email part)
      const response2 = await fetch("https://online-banking-system-backend.vercel.app/sendemail", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payloadt),
      });
    } catch (error) {
      setError("An error occurred while sending the OTP");
    }
  };

  // // OTP verification and registration process
  // const handleOtpVerification = async () => {
  //   try {
  //     // Send OTP to backend for verification
  //     console.log(otp);
  //     const payload2 = {
  //       otp
  //     };
  //     const response3 = await fetch("http://localhost:5000/checkotp", {
  //       method: "POST",
  //       credentials: "include",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload2),
  //     });

  //     if (otp === "1234" || response3.ok)
  //     {
  //       // OTP is valid, now proceed with registration
  //       alert('otp is valid registering new user');
  //       const response = await fetch("http://localhost:5000/register", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       });

  //       if (response.ok) {
  //         alert("Signup successful!");
  //         setIsOtpModalOpen(false);
  //         // Navigate to dashboard or login page here
  //       } else {
  //         const result = await response.json();
  //         setError(result.message || "Signup failed");
  //       }
  //     } else {
  //       setError("Invalid OTP. Please try again.");
  //     }
  //   } catch (error) {
  //     setError("An error occurred during OTP verification");
  //   }
  // };
  const handleOtpVerification =async () => {
    const payload2 = {
      otp
    };
    const response3 = await fetch("https://online-banking-system-backend.vercel.app/checkotp", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload2),
    });

    const data = await response3.json();
    if (otp === "1234"|| response3.ok) {
      // For demo purposes, replace with backend verification later
      alert("Login successful!");
      alert('otp is valid registering new user');
        const response = await fetch("https://online-banking-system-backend.vercel.app/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("Signup successful!");
          setIsOtpModalOpen(false);
          // Navigate to dashboard or login page here
          navigate('/login');
        } else {
          const result = await response.json();
          setError(result.message || "Signup failed");
        }    
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center ">
      {/*bg-zinc-900 */}
      <div className="w-full flex justify-between p-4 bg-zinc-800">
        <img src={logo} alt="E-bank" className="h-10" />
        <div className="flex gap-4">
          <Link to="/login">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Log in
            </button>
          </Link>
          <Link to="/signup">
            <button className="border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-600 hover:text-white">
              Sign up
            </button>
          </Link>
        </div>
      </div>
      <div className="w-full max-w-md mt-8 p-8 bg-zinc-800 rounded-lg shadow-lg">
        <img src={logo} alt="E-bank" className="h-12 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-center text-white mb-2">
          D-Pay
        </h2>
        <h3 className="text-lg font-medium text-center text-gray-400 mb-6">
          Create an Account
        </h3>
        <form onSubmit={handleSubmit}>
          {[
            // Map through fields
            { label: "First Name", name: "fname", type: "text" },
            { label: "Last Name", name: "lname", type: "text" },
            { label: "Date of Birth", name: "dob", type: "date" },
            { label: "CNIC", name: "cnic", type: "text" },
            { label: "Additional Information", name: "info", type: "text" },
            { label: "Nationality", name: "nationality", type: "text" },
            { label: "Gender", name: "gender", type: "text" },
            { label: "E-mail", name: "email", type: "email" },
            { label: "Password", name: "password", type: "password" },
            {
              label: "Confirm Password",
              name: "confirmPassword",
              type: "password",
            },
          ].map((field, index) => (
            <div key={index} className="mb-4">
              <DynamicInput // Use DynamicInput instead of input
                label={field.label}
                name={field.name}
                type={field.type}
                placeholder={field.label}
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded mt-4 hover:bg-blue-700"
          >
            Sign up
          </button>
        </form>
        {error && <div className="text-red-500 text-center mt-4">{error}</div>}
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

export default Signup;
