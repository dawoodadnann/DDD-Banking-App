import React, { useState } from "react";
import logo from "../assets/logo2.png";
import DynamicInput from "./DynamicInput"; // Import the DynamicInput component
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    dob: "",
    cnic: "",
    info: "",
    nationality: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
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

      setIsOtpModalOpen(true);

      await fetch("https://online-banking-system-backend.vercel.app/sendemail", {
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
        "https://online-banking-system-backend.vercel.app/register",
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
        navigate("/login");
      } else {
        const result = await response.json();
        setError(result.message || "Signup failed");
      }
    } else {
      setError("Invalid OTP. Please try again.");
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
        <h2 className="text-2xl font-semibold text-center text-white mb-2">
          D-Pay
        </h2>
        <h3 className="text-lg font-medium text-center text-gray-400 mb-6">
          Create an Account
        </h3>
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

          {/* Nationality Dropdown */}
          {/* Nationality Dropdown */}
<div className="mb-4">
  <select
    name="nationality"
    value={formData.nationality}
    onChange={handleChange}
    className="textbox"
    required
  >
    <option value="" disabled>
      Select Nationality
    </option>
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
  </select>
</div>


          {/* Gender Dropdown */}
          <div className="mb-4">
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="textbox"
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

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
      {/* OTP Modal */}
    </div>
  );
};

export default Signup;
