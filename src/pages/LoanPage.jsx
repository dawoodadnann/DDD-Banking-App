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
    loanType: '',           // New field for LOAN_TYPE
    tenure: '',             // New field for TENURE
    collateral: '',          // New field for COLLATERAL
    guarantorName: '',      // New field for GUARANTOR_NAME
    guarantorCnic: '',      // New field for GUARANTOR_CNIC
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
      const response = await fetch('<backend_url>/newloan', {
        method: 'POST',
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

          {/* New fields for attributes in the image */}
          <div className="form-group">
            <DynamicInput
              label="Loan Type"
              type="text"
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <DynamicInput
              label="Tenure (in years)"
              type="number"
              name="tenure"
              value={formData.tenure}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <DynamicInput
              label="Collateral"
              type="text"
              name="collateral"
              value={formData.collateral}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <DynamicInput
              label="Guarantor Name"
              type="text"
              name="guarantorName"
              value={formData.guarantorName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <DynamicInput
              label="Guarantor CNIC"
              type="text"
              name="guarantorCnic"
              value={formData.guarantorCnic}
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
          <p>Loan Type: {formData.loanType}</p>
          <p>Tenure: {formData.tenure} years</p>
          <p>Collateral: {formData.collateral}</p>
          <p>Guarantor Name: {formData.guarantorName}</p>
          <p>Guarantor CNIC: {formData.guarantorCnic}</p>
        </div>
      )}
    </div>
  );
};

export default LoanPage;
