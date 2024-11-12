import React, { useState } from "react";
import "./LoanPage.css"; // Make sure this file contains the necessary styles
import DynamicInput from "../Compo/DynamicInput";

const LoanPage = () => {
  const [formData, setFormData] = useState({
    LOAN_AMOUNT: "",
    income: "",
    LOAN_TYPE: "",
    TENURE: "",
    COLLATERAL: "",
    GUARANTOR_NAME: "",
    GUARANTOR_CNIC: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      const token = localStorage.getItem("jwttoken");

      const response = await fetch(
        "https://online-banking-system-backend.vercel.app/newloan",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      console.log("Response from backend:", data);
    } catch (error) {
      console.error("Error sending data to backend:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="gradient-box p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold text-white text-center mb-4">
          Loan Application
        </h1>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="loan-form">
            <div className="form-group mb-4">
              <DynamicInput
                label="Loan Amount"
                type="number"
                name="LOAN_AMOUNT"
                value={formData.LOAN_AMOUNT}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none"
              />
            </div>
            <div className="form-group mb-4">
              <DynamicInput
                label="Annual Income"
                type="number"
                name="income"
                value={formData.income}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none"
              />
            </div>

            {/* New fields for Loan Attributes */}
            <div className="form-group mb-4">
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Loan Type
              </label>
              <select
                name="LOAN_TYPE"
                value={formData.LOAN_TYPE}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none"
                required
              >
                <option value="" disabled>
                  Select Loan Type
                </option>
                <option value="Personal">Personal</option>
                <option value="Home">Home</option>
                <option value="Auto">Auto</option>
              </select>
            </div>

            <div className="form-group mb-4">
              <DynamicInput
                label="Tenure (in years)"
                type="number"
                name="TENURE"
                value={formData.TENURE}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none"
              />
            </div>
            <div className="form-group mb-4">
              <DynamicInput
                label="Collateral"
                type="text"
                name="COLLATERAL"
                value={formData.COLLATERAL}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none"
              />
            </div>
            <div className="form-group mb-4">
              <DynamicInput
                label="Guarantor Name"
                type="text"
                name="GUARANTOR_NAME"
                value={formData.GUARANTOR_NAME}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none"
              />
            </div>
            <div className="form-group mb-4">
              <DynamicInput
                label="Guarantor CNIC"
                type="text"
                name="GUARANTOR_CNIC"
                value={formData.GUARANTOR_CNIC}
                onChange={handleChange}
                required
                className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="bg-gray-700 text-white p-2 rounded w-full hover:bg-gray-600"
            >
              Apply for Loan
            </button>
          </form>
        ) : (
          <div className="loan-confirmation text-white">
            <h2>Thank you, {formData.GUARANTOR_NAME}!</h2>
            <p>
              Your loan application has been submitted. We will review your
              request and contact you shortly.
            </p>
            <h3>Loan Details</h3>
            <p>Requested Amount: ${formData.LOAN_AMOUNT}</p>
            <p>Loan Type: {formData.LOAN_TYPE}</p>
            <p>Tenure: {formData.TENURE} years</p>
            <p>Collateral: {formData.COLLATERAL}</p>
            <p>Guarantor Name: {formData.GUARANTOR_NAME}</p>
            <p>Guarantor CNIC: {formData.GUARANTOR_CNIC}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanPage;
