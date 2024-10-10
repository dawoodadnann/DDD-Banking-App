import React, { useState } from "react";
import "./CardManagementPage.css";
import logo from "../assets/logo3.png";
import mastercard from "../assets/mastercard.png";
import chip from "../assets/chip.jpg";

const CardManagementPage = () => {
  const [hasCard, setHasCard] = useState(true); // Simulating whether a user has a debit card or not
  const [showCardDetails, setShowCardDetails] = useState(false); // State to manage card details visibility

  const toggleCardDetails = () => {
    setShowCardDetails(!showCardDetails);
  };

  return (
    <div className="card-management-page">
      {hasCard ? (
        <div className="debit-card-container">
          <div className="debit-card">
            <div className="card-logo">
              <img src={logo} alt="D-Pay Logo" className="dpay-logo" />
            </div>
            <div className="chip">
              <img src={chip} alt="Debit Card Chip" />
            </div>
            {showCardDetails && (
              <div className="card-details">
                <p className="card-number">5412 7512 3412 3456</p>
                <p className="valid-thru">Valid Thru: 12/25</p>
                <p className="cardholder-name">John Doe</p>
              </div>
            )}
            <div className="card-logo-bottom">
              <img
                src={mastercard}
                alt="MasterCard Logo"
                className="mastercard-logo"
              />
            </div>
          </div>

          {/* Button placed next to the card */}
          <button onClick={toggleCardDetails} className="toggle-button">
            {showCardDetails ? "Hide Card Details" : "Show Card Details"}
          </button>
        </div>
      ) : (
        <div className="apply-card">
          <h2>Apply for a D-Pay Debit Card</h2>
          <p>
            You currently do not have a D-Pay debit card. To apply, follow the
            steps below:
          </p>
          {/* Debit Card Application Form */}
          <section className="debit-card-application">
            <h2>Debit Card Application Form</h2>
            <form className="application-form">
              <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone" required />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <textarea id="address" name="address" required></textarea>
              </div>
              <button type="submit" className="submit-button">Submit Application</button>
            </form>
          </section>
        </div>
      )}
    </div>
  );
};

export default CardManagementPage;
