import React, { useState } from "react";
import bill_1 from "../assets/bill_img/bill 1.png";
import bill_2 from "../assets/bill_img/bill 2.png";
import bill_3 from "../assets/bill_img/bill 3.png";
import bill_4 from "../assets/bill_img/bill 4.png";
import bill_5 from "../assets/bill_img/bill 5.png";
import bill_6 from "../assets/bill_img/bill 6 dollar-bill.png";
import bill_7 from "../assets/bill_img/bill 7 electrical-energy.png";
import bill_8 from "../assets/bill_img/bill 8 faucet.png";
import bill_9 from "../assets/bill_img/bill 9 invoice (1).png";
import bill_10 from "../assets/bill_img/bill 10 invoice.png";
import bill_11 from "../assets/bill_img/bill 11 payment.png";
import bill_12 from "../assets/bill_img/bill 12 telephone.png";

// import { Link } from "react-router-dom";
import "./billing.css";

const Billing = () => {
  // State to control popup visibility and the selected bill type
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isPopup2Visible, setPopup2Visible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [Id, setId] = useState("");
  const [Amount, setAmount] = useState("");
  const [Company, setCompany] = useState("");
  const [SubmittedData, setSubmittedData] = useState("");
  const [Username, setUsername] = useState("");
  const [Month, setMonth] = useState("");
  const [Email, setEmail] = useState("");
  const [Check, setCheck] = useState("false");
  const [Address, setAddress] = useState("");

  // Bill companies for different bills
  const billCompanies = {
    Electricity: ["K-Electric", "WAPDA", "Reliance"],
    Water: ["AquaFina", "Nestle", "Dasani"],
    Internet: ["PTCL", "Flash Fiber", "TNC"],
    Telephone: ["PTCL"],
    Tax: ["FBR"],
    Education: ["FAST NUCES", "The Educators", "Bahria University"],
    Government: ["Dam Donation Fund", "Palestine Refugees Fund"],
    CreditCard: ["MasterCard", "Visa", "Meezan Bank"],
    Clubs: ["Creek CLub", "Dreamworld Golf CLub", "Pavilion End CLub"],
    E_Challan: ["M-TAG"],
    Nadra: [
      "Family Registration Form Fee",
      "Missing CNIC Application Fee",
      "Birth Certificate Issuance Fee",
    ],
  };

  const handleBoxClick = (billType) => {
    setSelectedBill(billType); // Set the selected bill type
    setPopupVisible(true); // Show the popup
  };

  // Handle closing the popup
  const closePopup = () => {
    setPopupVisible(false);
  };
  const closePopup2 = () => {
    setPopup2Visible(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Store the submitted data in state
    const data = {
      selectedBill,
      Id,
      Amount,
      Username,
      Month,
      Email,
      Check,
      Address,
    };
    setSubmittedData(data);
    setPopup2Visible(true);
    // Log the submitted data to the console
    console.log("Selected Bill: ", selectedBill);
    console.log("Selected Company: ", Company);
    console.log("Account/Customer ID: ", Id);
    console.log("Amount: ", Amount);
    console.log("Username: ", Username);
    console.log("Month: ", Month);
    console.log(SubmittedData);

    //     try {
    //       const response = await fetch('http://localhost:5000/Billing', {
    //           method: 'POST',
    //           headers: {
    //               'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify(SubmittedData),
    //       });

    //       const data = await response.json();

    //       if (response.ok) {
    //           setError('');
    //           alert('Login successful!');
    //       } else {
    //           setError(data.message);
    //       }
    //   } catch (error) {
    //       console.error('Error logging in:', error);
    //       setError('An error occurred. Please try again.');
    //   }
  };

  // Bill options based on selected bill type
  const billOptions = billCompanies[selectedBill] || [];

  return (
    <div>
      <body>
        <div className="billing_page">
          <div className="box" onClick={() => handleBoxClick("Electricity")}>
            <h1>Electricity Bill</h1>
            <img src={bill_7} className="logo" alt="Electricity Bill" />
          </div>
          <div className="box" onClick={() => handleBoxClick("Gas")}>
            <h1>Gas Bill</h1>
            <img src={bill_3} className="logo" alt="Gas Bill" />
          </div>
          <div className="box" onClick={() => handleBoxClick("Water")}>
            <h1>Water Bill</h1>
            <img src={bill_8} className="logo" alt="Water Bill" />
          </div>
          <div className="box" onClick={() => handleBoxClick("Internet")}>
            <h1>Internet Bill</h1>
            <img src={bill_2} className="logo" alt="Internet Bill" />
          </div>
          <div className="box" onClick={() => handleBoxClick("Telephone")}>
            <h1>Telephone Bill</h1>
            <img src={bill_12} className="logo" alt="Telephone Bill" />
          </div>
          <div className="box" onClick={() => handleBoxClick("Tax")}>
            <h1>Tax Payment</h1>
            <img src={bill_9} className="logo" alt="Tax Payment" />
          </div>
          <div className="box" onClick={() => handleBoxClick("Education")}>
            <h1>Education</h1>
            <img src={bill_6} className="logo" alt="Education" />
          </div>
          <div className="box" onClick={() => handleBoxClick("Government")}>
            <h1>Government Fees</h1>
            <img src={bill_4} className="logo" alt="Government Fees" />
          </div>
          <div className="box" onClick={() => handleBoxClick("CreditCard")}>
            <h1>CreditCard Bill</h1>
            <img src={bill_1} className="logo" alt="CreditCard Bill" />
          </div>
          <div className="box" onClick={() => handleBoxClick("Clubs")}>
            <h1>Clubs Membership</h1>
            <img src={bill_5} className="logo" alt="Clubs Membership" />
          </div>
          <div className="box" onClick={() => handleBoxClick("E_Challan")}>
            <h1>E Challan</h1>
            <img src={bill_10} className="logo" alt="E Challan" />
          </div>
          <div className="box" onClick={() => handleBoxClick("Nadra")}>
            <h1>Nadra Fees</h1>
            <img src={bill_11} className="logo" alt="Nadra Fees" />
          </div>
        </div>
      </body>

      {/* Popup Modal */}
      {isPopupVisible && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Select Your {selectedBill} Company</h2>
            <form onSubmit={handleSubmit}>
              <select
                value={Company}
                onChange={(e) => setCompany(e.target.value)} // Update the Company when a bill type is selected
                required
              >
                <option value="">Select Company</option>
                {billOptions.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </select>
              <div class="form">
                <input
                  class="textbox"
                  type="text"
                  placeholder=" "
                  value={Id}
                  onChange={(e) => setId(e.target.value)}
                  required
                />
                <label class="ilabel">ACCOUNT NUM / CUSTOMER NUM</label>
              </div>

              <div class="form">
                <input
                  class="textbox"
                  type="text"
                  placeholder=" "
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <label class="ilabel">USERNAME</label>
              </div>

              <div class="form">
                <input
                  class="textbox"
                  type="number"
                  placeholder=" "
                  value={Amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <label class="ilabel">Bill Amount</label>
              </div>

              <div class="form">
                <input
                  class="textbox"
                  type="text"
                  placeholder=" "
                  value={Month}
                  onChange={(e) => setMonth(e.target.value)}
                />
                <label class="ilabel">Billing Month</label>
              </div>

              <div class="form">
                <input
                  class="textbox"
                  type="text"
                  placeholder=" "
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label class="ilabel">Email (optional)</label>
              </div>

              <div class="form">
                <input
                  class="textbox"
                  type="text"
                  placeholder=" "
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
                <label class="ilabel">Address</label>
              </div>

              <div id="c1">
                <input
                  type="checkbox"
                  checked={Check}
                  onChange={(e) => setCheck(e.target.checked)}
                />
                <label>
                  I agree to the company policy, and I understand that any
                  vulnerabilities will not be considered as it is a test
                  version.
                </label>
              </div>
              <button onClick={closePopup}>Close</button>
              <button type="submit" onClick={() => alert("Proceed to payment")}>
                Preview
              </button>
            </form>
          </div>
        </div>
      )}
      {isPopup2Visible && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Preview Your Bill Payment Details</h2>
            <p>
              <strong>Bill Type:</strong> {SubmittedData.selectedBill}
            </p>
            <p>
              <strong>Username:</strong> {SubmittedData.Username}
            </p>
            <p>
              <strong>Account/Customer ID:</strong> {SubmittedData.Id}
            </p>
            <p>
              <strong>Amount:</strong> {SubmittedData.Amount}
            </p>
            <p>
              <strong>Month:</strong> {SubmittedData.Month}
            </p>
            <p>
              <strong>Email:</strong> {SubmittedData.Email}
            </p>
            <p>
              <strong>Address:</strong> {SubmittedData.Address}
            </p>
            <p>
              <strong>Policy Agreement:</strong>{" "}
              {Check ? "Agreed" : "Not Agreed"}
            </p>
            <button onClick={closePopup2}>Close</button>
            <button type="submit" onClick={() => alert("Proceed to payment")}>
              Pay Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
