import React, { useState, useEffect } from "react";
import DynamicInput from "../Compo/DynamicInput"; 
import logo from "../assets/logo3.png";
import mastercard from "../assets/mastercard.png";
import chip from "../assets/chip.jpg";
import "./CardManagementPage.css";

const CardManagementPage = () => {
  const [hasCard, setHasCard] = useState(false);
  const [showCardDetails, setShowCardDetails] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [enteredPin, setEnteredPin] = useState("");
  const [pinError, setPinError] = useState("");
  const [loading, setLoading] = useState(false);
  const [addingCard, setAddingCard] = useState(false);
  const [cardDetails, setCardDetails] = useState(null);
  const [formData, setFormData] = useState({ name: "", phone: "", address: "", pin: "" });

  useEffect(() => {
    const checkIsCard = async () => {
      try {
        const token = localStorage.getItem('jwttoken');     
        
        const response = await fetch("https://online-banking-system-backend.vercel.app/checkcardstatus", {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
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

    checkIsCard();
  }, []);

  const fetchCardDetails = async () => {
    try {
      const token = localStorage.getItem('jwttoken');     
      
      const response = await fetch("https://online-banking-system-backend.vercel.app/carddetail", {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
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

  const toggleCardDetails = () => {
    setShowCardDetails((prev) => !prev);
    if (!showCardDetails) {
      setShowModal(true);
    } else {
      resetPinInput();
    }
  };

  const handlePinSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('jwttoken');     
      
      const response = await fetch("https://online-banking-system-backend.vercel.app/checkpin", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
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
      setPinError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
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
    setAddingCard(true);

    try {
      const token = localStorage.getItem('jwttoken');     
      
      const response = await fetch("https://online-banking-system-backend.vercel.app/addcard", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
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
        fetchCardDetails();
      }
    } catch (error) {
      console.error("Error adding card:", error);
    } finally {
      setAddingCard(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="gradient-box p-6 rounded-lg shadow-lg w-full max-w-md">
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
                <div className="card-details text-white">
                  <p className="card-number">{cardDetails.data.card_num || "**** **** **** ****"}</p>
                  <p className="cardholder-name">{cardDetails.data.card_name || "John Doe"}</p>
                  <p className="card-id">Card ID: {cardDetails.data.card_id || "XXXX-XXXX-XXXX"}</p>
                </div>
              )}
              <div className="card-logo-bottom">
                <img src={mastercard} alt="MasterCard Logo" className="mastercard-logo" />
              </div>
            </div>

            <button
              onClick={toggleCardDetails}
              className="bg-gray-700 text-white p-2 rounded w-full hover:bg-gray-600 mt-4"
            >
              {showCardDetails ? "Hide Card Details" : "Show Card Details"}
            </button>
          </div>
        ) : (
          <div className="apply-card">
            <h2 className="text-xl font-bold text-white text-center mb-4">Apply for a D-Pay Debit Card</h2>
            <form className="application-form" onSubmit={handleSubmit}>
              <div className="mb-4">
                <DynamicInput
                  label="Full Name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  name="name"
                  placeholder="Enter your full name"
                  className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <DynamicInput
                  label="Phone Number"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  name="phone"
                  placeholder="Enter your phone number"
                  className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <DynamicInput
                  label="Address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  name="address"
                  placeholder="Enter your address"
                  className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <DynamicInput
                  label="PIN"
                  type="password"
                  value={formData.pin}
                  onChange={handleChange}
                  name="pin"
                  placeholder="Enter a PIN"
                  className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="bg-gray-700 text-white p-2 rounded w-full hover:bg-gray-600"
                disabled={addingCard}
              >
                {addingCard ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-white text-center mb-4">Enter Your PIN</h2>
            <DynamicInput
              label="PIN"
              type="password"
              value={enteredPin}
              onChange={(e) => setEnteredPin(e.target.value)}
              placeholder="Enter your PIN"
              className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none"
            />
            <button
              onClick={handlePinSubmit}
              className="bg-gray-700 text-white p-2 rounded w-full hover:bg-gray-600 mt-4"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify PIN"}
            </button>

            {pinError && <p className="text-red-500 mt-2">{pinError}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default CardManagementPage;
