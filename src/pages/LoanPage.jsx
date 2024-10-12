import React, { useState } from 'react';
import './LoanPage.css'; // Optionally, for styling
import DynamicInput from '../components/DynamicInput'; // Import the DynamicInput component

const LoanPage = () => {
  const [formData, setFormData] = useState({
    LOAN_AMOUNT: '',
    income: '',
    LOAN_TYPE: '',           // New field for LOAN_TYPE
    TENURE: '',             // New field for TENURE
    COLLATERAL: '',          // New field for COLLATERAL
    GUARANTOR_NAME: '',      // New field for GUARANTOR_NAME
    GUARANTOR_CNIC: '',      // New field for GUARANTOR_CNIC
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
    
    // Log form data to console (for now)
    console.log('Form Data Submitted:', formData);

    // Send form data to backend (replace <backend_url> with your actual backend endpoint)
    try {
      const response = await fetch("http://localhost:5000/newloan", {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Response from backend:', data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  return (
    <div className="loan-page">
      <h1>Loan Application</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit} className="loan-form">
          
          <div className="form-group">
            <DynamicInput
              label="Loan Amount"
              type="number"
              name="LOAN_AMOUNT"
              value={formData.LOAN_AMOUNT}
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

          {/* New fields for attributes in the image */}
          <div className="form-group">
            <DynamicInput
              label="Loan Type"
              type="text"
              name="LOAN_TYPE"
              value={formData.LOAN_TYPE}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <DynamicInput
              label="TENURE (in years)"
              type="number"
              name="TENURE"
              value={formData.TENURE}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <DynamicInput
              label="COLLATERAL"
              type="text"
              name="COLLATERAL"
              value={formData.COLLATERAL}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <DynamicInput
              label="Guarantor Name"
              type="text"
              name="GUARANTOR_NAME"
              value={formData.GUARANTOR_NAME}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <DynamicInput
              label="Guarantor CNIC"
              type="text"
              name="GUARANTOR_CNIC"
              value={formData.GUARANTOR_CNIC}
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
          <p>Requested Amount: ${formData.LOAN_AMOUNT}</p>
          <p>Loan Term: {formData.loanTerm} years</p>
          <p>Annual Income: ${formData.income}</p>
          <p>Loan Type: {formData.LOAN_TYPE}</p>
          <p>TENURE: {formData.TENURE} years</p>
          <p>COLLATERAL: {formData.COLLATERAL}</p>
          <p>Guarantor Name: {formData.GUARANTOR_NAME}</p>
          <p>Guarantor CNIC: {formData.GUARANTOR_CNIC}</p>
        </div>
      )}
    </div>
  );
};

export default LoanPage;
