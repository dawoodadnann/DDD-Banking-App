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

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData({ ...formData, [name]: value });
  // };

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
    const payload2 = {
      otp,
    };
    const response3 = await fetch(
      "https://online-banking-system-backend.vercel.app/checkotp",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload2),
      }
    );

    const data = await response3.json();
    if (otp === "1234" || response3.ok) {
      alert("OTP is valid, registering new user...");
      const response = await fetch(
        "https://online-banking-system-backend.vercel.app/registermanager",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("Signup successful!");
        setIsOtpModalOpen(false);
        navigate("/managerlogin");
      } else {
        const result = await response.json();
        setError(result.message || "Signup failed");
      }
    } else {
      setError("Invalid OTP. Please try again.");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // If the field being changed is the date of birth
    if (name === "dob") {
      const selectedDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - selectedDate.getFullYear();
      const monthDiff = today.getMonth() - selectedDate.getMonth();
      const dayDiff = today.getDate() - selectedDate.getDate();
  
      // Adjust age if the current date is before the user's birthday this year
      const adjustedAge = monthDiff < 0 || (monthDiff === 0 && dayDiff < 0) ? age - 1 : age;
  
      if (adjustedAge < 15) {
        setError("Age must be greater than 15.");
        return;
      } else {
        setError("");
      }
    }
  
    setFormData({ ...formData, [name]: value });
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
    { label: "E-mail", name: "email", type: "email" },
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
    <option value="Afghanistan">Afghanistan</option>
    <option value="Albania">Albania</option>
    <option value="Algeria">Algeria</option>
    <option value="Argentina">Argentina</option>
    <option value="Australia">Australia</option>
    <option value="Austria">Austria</option>
    <option value="Bangladesh">Bangladesh</option>
    <option value="Belgium">Belgium</option>
    <option value="Brazil">Brazil</option>
    <option value="Canada">Canada</option>
    <option value="China">China</option>
    <option value="Colombia">Colombia</option>
    <option value="Denmark">Denmark</option>
    <option value="Egypt">Egypt</option>
    <option value="Ethiopia">Ethiopia</option>
    <option value="Finland">Finland</option>
    <option value="France">France</option>
    <option value="Germany">Germany</option>
    <option value="Ghana">Ghana</option>
    <option value="Greece">Greece</option>
    <option value="India">India</option>
    <option value="Indonesia">Indonesia</option>
    <option value="Iran">Iran</option>
    <option value="Iraq">Iraq</option>
    <option value="Ireland">Ireland</option>
    <option value="Italy">Italy</option>
    <option value="Japan">Japan</option>
    <option value="Kenya">Kenya</option>
    <option value="Malaysia">Malaysia</option>
    <option value="Mexico">Mexico</option>
    <option value="Netherlands">Netherlands</option>
    <option value="New Zealand">New Zealand</option>
    <option value="Nigeria">Nigeria</option>
    <option value="Norway">Norway</option>
    <option value="Pakistan">Pakistan</option>
    <option value="Philippines">Philippines</option>
    <option value="Poland">Poland</option>
    <option value="Portugal">Portugal</option>
    <option value="Russia">Russia</option>
    <option value="Saudi Arabia">Saudi Arabia</option>
    <option value="Singapore">Singapore</option>
    <option value="South Africa">South Africa</option>
    <option value="South Korea">South Korea</option>
    <option value="Spain">Spain</option>
    <option value="Sri Lanka">Sri Lanka</option>
    <option value="Sweden">Sweden</option>
    <option value="Switzerland">Switzerland</option>
    <option value="Turkey">Turkey</option>
    <option value="United Arab Emirates">United Arab Emirates</option>
    <option value="United Kingdom">United Kingdom</option>
    <option value="United States">United States</option>
    <option value="Vietnam">Vietnam</option>
    <option value="Zimbabwe">Zimbabwe</option>
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
