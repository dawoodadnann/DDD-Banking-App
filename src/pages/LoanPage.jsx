// src/LoanPage.js
import React, { useState } from 'react';
import './LoanPage.css'; // Optionally, for styling
import DynamicInput from '../components/DynamicInput'; // Import the DynamicInput component

const LoanPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    loanAmount: '',
    loanTerm: '',
    income: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log('Form Data Submitted:', formData);
  };

  return (
    <div className="loan-page">
      <h1>Loan Application</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="loan-form">
          <div className="form-group">
            <DynamicInput
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <DynamicInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <DynamicInput
              label="Loan Amount"
              type="number"
              name="loanAmount"
              value={formData.loanAmount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <DynamicInput
              label="Loan Term (in years)"
              type="number"
              name="loanTerm"
              value={formData.loanTerm}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <DynamicInput
              label="Annual Income"
              type="number"
              name="income"
              value={formData.income}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-btn">
            Apply for Loan
          </button>
        </form>
      ) : (
        <div className="loan-confirmation">
          <h2>Thank you, {formData.fullName}!</h2>
          <p>Your loan application has been submitted. We will review your request and contact you via {formData.email}.</p>
          <h3>Loan Details</h3>
          <p>Requested Amount: ${formData.loanAmount}</p>
          <p>Loan Term: {formData.loanTerm} years</p>
          <p>Annual Income: ${formData.income}</p>
        </div>
      )}
    </div>
  );
};

export default LoanPage;
