import React, { useState } from "react";
import logo from "../assets/logo2.png";
import DynamicInput from "./DynamicInput";
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
    dob: "",
    cnic: "",
    info: "",
    designation: "",
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
      const payload = {
        email1: formData.email,
        fname: formData.fname,
        lname: formData.lname,
      };

      setIsOtpModalOpen(true);

      const response = await fetch("https://online-banking-system-backend.vercel.app/sendemail", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed to send OTP");
    } catch (error) {
      setError("An error occurred while sending the OTP");
    }
  };

  const handleOtpVerification = async () => {
    try {
      const payload = { otp };
      const response = await fetch("https://online-banking-system-backend.vercel.app/checkotp", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Invalid OTP");
      }

      const registrationResponse = await fetch(
        "https://online-banking-system-backend.vercel.app/registermanager",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!registrationResponse.ok) {
        const result = await registrationResponse.json();
        throw new Error(result.message || "Signup failed");
      }

      alert("Signup successful!");
      setIsOtpModalOpen(false);
      navigate("/login");
    } catch (error) {
      setError(error.message || "An error occurred during OTP verification");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
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
        <h2 className="text-2xl font-semibold text-center text-white mb-2">D-Pay</h2>
        <h3 className="text-lg font-medium text-center text-gray-400 mb-6">Create an Account</h3>
        <form onSubmit={handleSubmit}>
  {[
    { label: "First Name", name: "fname", type: "text" },
    { label: "Last Name", name: "lname", type: "text" },
    { label: "Date of Birth", name: "dob", type: "date" },
    { label: "CNIC", name: "cnic", type: "text" },
    { label: "Additional Information", name: "info", type: "text" },
  ].map((field, index) => (
    <div key={index} className="mb-4">
      <DynamicInput
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

 {/* Dropdown for Nationality */}
<div className="mb-4">
  <label className="block text-gray-300 text-sm font-medium mb-2">
    Nationality
  </label>
  <select
    name="nationality"
    value={formData.nationality}
    onChange={handleChange}
    className="w-full p-3 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="" disabled>Select Your Nationality</option>
    <option value="Pakistan">Pakistan</option>
    <option value="USA">USA</option>
    <option value="UK">UK</option>
    {/* Add more countries as needed */}
  </select>
</div>

{/* Dropdown for Gender */}
<div className="mb-4">
  <label className="block text-gray-300 text-sm font-medium mb-2">
    Gender
  </label>
  <select
    name="gender"
    value={formData.gender}
    onChange={handleChange}
    className="w-full p-3 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="" disabled>Select Your Gender</option>
    <option value="Male">Male</option>
    <option value="Female">Female</option>
    <option value="Other">Other</option>
  </select>
</div>

{/* Dropdown for Designation */}
<div className="mb-4">
  <label className="block text-gray-300 text-sm font-medium mb-2">
    Designation
  </label>
  <select
    name="designation"
    value={formData.designation}
    onChange={handleChange}
    className="w-full p-3 border rounded bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
    required
  >
    <option value="" disabled>Select Your Designation</option>
    <option value="Manager">Manager</option>
    <option value="Employee">Employee</option>
    <option value="Intern">Intern</option>
  </select>
</div>


  {/* Password and Confirm Password Fields */}
  {[
    { label: "Password", name: "password", type: "password" },
    { label: "Confirm Password", name: "confirmPassword", type: "password" },
  ].map((field, index) => (
    <div key={index} className="mb-4">
      <DynamicInput
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
      {isOtpModalOpen && (
        <div className="otp-modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h3 className="text-lg font-medium mb-4">Enter OTP</h3>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              className="w-full mb-4 p-2 border rounded"
            />
            <button
              onClick={handleOtpVerification}
              className="bg-blue-600 text-white py-2 px-4 rounded w-full mb-2 hover:bg-blue-700"
            >
              Verify OTP
            </button>
            <button
              onClick={() => setIsOtpModalOpen(false)}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded w-full hover:bg-gray-400"
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
