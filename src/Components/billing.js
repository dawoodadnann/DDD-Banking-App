import React, { useState } from "react";
import bill_1 from '../assets/bill_img/bill 1.png';
import bill_2 from '../assets/bill_img/bill 2.png';
import bill_3 from '../assets/bill_img/bill 3.png';
import bill_4 from '../assets/bill_img/bill 4.png';
import bill_5 from '../assets/bill_img/bill 5.png';
import bill_6 from '../assets/bill_img/bill 6 dollar-bill.png';
import bill_7 from '../assets/bill_img/bill 7 electrical-energy.png';
import bill_8 from '../assets/bill_img/bill 8 faucet.png';
import bill_9 from '../assets/bill_img/bill 9 invoice (1).png';
import bill_10 from '../assets/bill_img/bill 10 invoice.png';
import bill_11 from '../assets/bill_img/bill 11 payment.png';
import bill_12 from '../assets/bill_img/bill 12 telephone.png';


// import { Link } from "react-router-dom";
import "./billing.css";

const Billing = () => {    // State to control popup visibility and the selected bill type
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [selectedBill, setSelectedBill] = useState(null);  
  
    // Bill companies for different bills
    const billCompanies = {
      electricity: ["Company A", "Company B", "Company C"],
      water: ["Company D", "Company E"],
      internet: ["Company F", "Company G", "Company H"],
      // Add more bill types and companies
    };
  
    // Show popup when a specific box is clicked
    const handleBoxClick = (billType) => {
      setSelectedBill(billType); // Set the selected bill type
      setPopupVisible(true); // Show the popup
    };
  
    // Handle closing the popup
    const closePopup = () => {
      setPopupVisible(false);
    };
  
    // Bill options based on selected bill type
    const billOptions = billCompanies[selectedBill] || [];




  return (
    <div>
      <body>
        <div className="billing_page">
          <div className="box" onClick={() => handleBoxClick("Gas")}>
            <h1>Electricity Bill</h1>
            <img src={bill_1} className="logo" alt="Electricity Bill" />
          </div>
          <div className="box" onClick={() => handleBoxClick("internet")}>
            <h1>BILL</h1>
            <img src={bill_2} className="logo" alt="Electricity Bill" />
          </div>
          <div className="box" onClick={() => handleBoxClick("Electricity")}>
            <h1>BILL</h1>
            <img src={bill_3} className="logo" alt="Electricity Bill" />
          </div>
          <div className="box">
            <h1>BILL</h1>
            <img src={bill_4} className="logo" alt="Electricity Bill" />
          </div>
          <div className="box">
            <h1>BILL</h1>
            <img src={bill_5} className="logo" alt="Electricity Bill" />
          </div>
          <div className="box">
            <h1>BILL</h1>
            <img src={bill_6} className="logo" alt="Electricity Bill" />
          </div>
          <div className="box">
            <h1>BILL</h1>
            <img src={bill_7} className="logo" alt="Electricity Bill" />
          </div>
          <div className="box">
            <h1>BILL</h1>
            <img src={bill_8} className="logo" alt="Electricity Bill" />
          </div>
          <div className="box">
            <h1>BILL</h1>
            <img src={bill_9} className="logo" alt="Electricity Bill" />
          </div>
          <div className="box">
            <h1>BILL</h1>
            <img src={bill_10} className="logo" alt="Electricity Bill" />
          </div>
          <div className="box">
            <h1>BILL</h1>
            <img src={bill_11} className="logo" alt="Electricity Bill" />
          </div>
          <div className="box">
            <h1>BILL</h1>
            <img src={bill_12} className="logo" alt="Electricity Bill" />
          </div>
        </div>
      </body>

      {/* Popup Modal */}
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Select Your {selectedBill} Company</h2>
            <select>
              {billOptions.map((company, index) => (
                <option key={index} value={company}>
                  {company}
                </option>
              ))}
            </select>
            <button onClick={closePopup}>Close</button>
            <button onClick={() => alert("Proceed to payment")}>Pay Now</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Billing;
