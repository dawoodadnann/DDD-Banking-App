import React, { useState } from 'react';
import DynamicInput from '../Compo/DynamicInput'; // Adjust this import path based on your project structure
import './HelpPage.css';

const HelpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    question: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For handling error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when request is in progress
    setError(null); // Reset error before submission

    try {
      const token = localStorage.getItem('jwttoken');     

      const response = await fetch("https://online-banking-system-backend.vercel.app/askques", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", 'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert(`Thank you, ${formData.name}! Your help request has been submitted.`);
        setSubmitted(true);
        setFormData({ name: '', email: '', question: '' }); // Reset form data
      } else {
        const result = await response.json();
        setError(result.message || "Help request submission failed");
      }
    } catch (error) {
      setError("An error occurred while submitting your help request");
    } finally {
      setLoading(false); // Stop loading after the request finishes
    }
  };

  return (
    <div className="help-page">
      <h1 className="text-center text-white">Help & Support</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="help-form">
          <h2 className="text-center text-white">Submit a Question</h2>

          {/* Show error message if exists */}
          {error && <p className="error-message text-red-500 text-center">{error}</p>}

          <div className="form-group">
            <DynamicInput
              label="Your Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <DynamicInput
              label="Your Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
          <div className="form-group">
            <label className="text-white">Your Question:</label>
            <textarea
              name="question"
              value={formData.question}
              onChange={handleChange}
              required
              className="textarea-field"
            ></textarea>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </form>
      ) : (
        <div className="confirmation-message text-center">
          <h2 className="text-white">Thank you, {formData.name}!</h2>
          <p className="text-white">Your question has been submitted. We will get back to you at {formData.email} shortly.</p>
        </div>
      )}

      <section className="faq-section">
        <h2 className="faq-title text-white">Frequently Asked Questions</h2>
        <div className="faq-item">
          <h3 className="text-white">How do I reset my password?</h3>
          <p className="text-white">You can reset your password by clicking on the "Forgot Password" link on the login page and following the instructions.</p>
        </div>
        <div className="faq-item">
          <h3 className="text-white">How can I check my account balance?</h3>
          <p className="text-white">To check your account balance, log in to your account and navigate to the "Account Overview" section.</p>
        </div>
        <div className="faq-item">
          <h3 className="text-white">How do I apply for a loan?</h3>
          <p className="text-white">You can apply for a loan by navigating to the loan section of our website and filling out the application form.</p>
        </div>
        <div className="faq-item">
          <h3 className="text-white">What should I do if I suspect fraudulent activity?</h3>
          <p className="text-white">If you suspect fraudulent activity, please contact our support team immediately via phone or email.</p>
        </div>
      </section>
    </div>
  );
};

export default HelpPage;
