import React, { useState, useEffect } from "react";
import "./CardManagementPage.css";
import logo from "../assets/logo3.png";
import mastercard from "../assets/mastercard.png";
import chip from "../assets/chip.jpg";

const CardManagementPage = () => {
  const [hasCard, setHasCard] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [cardDetails, setCardDetails] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", pin: "" });

  useEffect(() => {
    const checkIsCard = async () => {
      try {
        const response = await fetch("http://localhost:5000/checkcardstatus", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        setHasCard(data.exists);

        if (data.exists) {
          fetchCardDetails();
        }
      } catch (error) {
        console.error("Error checking card status:", error);
      }
    };

    const fetchCardDetails = async () => {
      try {
        const response = await fetch("http://localhost:5000/carddetail", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const data = await response.json();
          setCardDetails(data);
        } else {
          console.error("Failed to fetch card details:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching card details:", error);
      }
    };

    checkIsCard();
  }, []);

  const toggleCardDetails = () => {
    setShowCardDetails((prev) => !prev);
    if (!showCardDetails) {
      setShowModal(true);
    } else {
      resetPinInput();
    }
  };

  const handlePinSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/checkpin", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: enteredPin }),
      });

      if (response.ok) {
        setShowCardDetails(true);
        setShowModal(false);
        resetPinInput();
      } else {
        setPinError("Incorrect PIN! Please try again.");
      }
    } catch (error) {
      console.error("Error submitting PIN:", error);
    }
  };

  const resetPinInput = () => {
    setEnteredPin("");
    setPinError("");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/addcard", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Debit",
          name: formData.name,
          pin: formData.pin,
          phone: formData.phone,
        }),
      });

      const data = await response.json();
      alert(data.message);
      if (response.ok) {
        setHasCard(true);
      }
    } catch (error) {
      console.error("Error adding card:", error);
    }
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
            {showCardDetails && cardDetails && (
              <div className="card-details">
                <p className="card-number">{cardDetails.data.card_num || "**** **** **** ****"}</p>
                <p className="cardholder-name">{cardDetails.data.card_name || "John Doe"}</p>
                <p className="card-id">Card ID: {cardDetails.data.card_id || "XXXX-XXXX-XXXX"}</p>
              </div>
            )}
            <div className="card-logo-bottom">
              <img src={mastercard} alt="MasterCard Logo" className="mastercard-logo" />
            </div>
          </div>

          <button onClick={toggleCardDetails} className="toggle-button">
            {showCardDetails ? "Hide Card Details" : "Show Card Details"}
          </button>
        </div>
      ) : (
        <div className="apply-card">
          <h2>Apply for a D-Pay Debit Card</h2>
          <p>You currently do not have a D-Pay debit card. To apply, follow the steps below:</p>
          <section className="debit-card-application">
            <h2>Debit Card Application Form</h2>
            <form className="application-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name:</label>
                <input type="text" id="name" name="name" required value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone" required value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <textarea id="address" name="address" required value={formData.address} onChange={handleChange}></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="pin">PIN:</label>
                <input type="password" id="pin" name="pin" required value={formData.pin} onChange={handleChange} />
              </div>
              <button type="submit" className="submit-button">Submit Application</button>
            </form>
          </section>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Enter Your PIN</h2>
            <input
              type="password"
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
              placeholder="Enter PIN"
            />
            {pinError && <p className="error-message">{pinError}</p>}
            <div className="modal-buttons">
              <button onClick={handlePinSubmit}>Submit</button>
              <button onClick={() => {
                setShowModal(false);
                resetPinInput();
              }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardManagementPage;
