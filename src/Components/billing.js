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

import "./billing.css";

const Billing = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isPopup2Visible, setPopup2Visible] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);
  const [accnum, setaccnum] = useState("");
  const [Amount, setAmount] = useState("");
  const [Company, setCompany] = useState("");
  const [SubmittedData, setSubmittedData] = useState(null);
  const [Username, setUsername] = useState("");
  const [Month, setMonth] = useState("");
  const [Email, setEmail] = useState("");
  const [Check, setCheck] = useState(false);
  const [Address, setAddress] = useState("");

  const billCompanies = {
    Electricity: ["K-Electric", "WAPDA", "Reliance"],
    Water: ["AquaFina", "Nestle", "Dasani"],
    Internet: ["PTCL", "Flash Fiber", "TNC"],
    Telephone: ["PTCL"],
    Tax: ["FBR"],
    Education: ["FAST NUCES", "The Educators", "Bahria University"],
    Government: ["Dam Donation Fund", "Palestine Refugees Fund"],
    CreditCard: ["MasterCard", "Visa", "Meezan Bank"],
    Clubs: ["Creek Club", "Dreamworld Golf Club", "Pavilion End Club"],
    E_Challan: ["M-TAG"],
    Nadra: [
      "Family Registration Form Fee",
      "Missing CNIC Application Fee",
      "Birth Certificate Issuance Fee",
    ],
  };

  const handleBoxClick = (billType) => {
    setSelectedBill(billType);
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };
  const closePopup2 = () => {
    setPopup2Visible(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      selectedBill,
      accnum,
      amount: Amount,
      company: Company,
      username: Username,
      check: Check,
      month: Month,
      email: Email,
      address: Address,
    };

    setSubmittedData(data);
    setPopupVisible(false);
    setPopup2Visible(true);
  };

  const handlerouter = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/billing", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(SubmittedData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Payment successful: " + result.message);
        setPopup2Visible(false);
      } else {
        alert("Payment failed: " + result.message);
      }
    } catch (error) {
      console.error("Error during payment:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const billOptions = billCompanies[selectedBill] || [];

  return (
    <div className="bg-zinc-800 pt-16 h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6">
        <div className="box bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-200 p-4 cursor-pointer" onClick={() => handleBoxClick("Electricity")}>
          <h1 className="text-xl font-semibold text-center text-black">Electricity Bill</h1>
          <img src={bill_7} className="logo mx-auto mt-4" alt="Electricity Bill" />
        </div>
        <div className="box bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-200 p-4 cursor-pointer" onClick={() => handleBoxClick("Gas")}>
          <h1 className="text-xl font-semibold text-center text-black">Gas Bill</h1>
          <img src={bill_3} className="logo mx-auto mt-4" alt="Gas Bill" />
        </div>
        <div className="box bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-200 p-4 cursor-pointer" onClick={() => handleBoxClick("Water")}>
          <h1 className="text-xl font-semibold text-center text-black">Water Bill</h1>
          <img src={bill_8} className="logo mx-auto mt-4" alt="Water Bill" />
        </div>
        <div className="box bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all duration-200 p-4 cursor-pointer" onClick={() => handleBoxClick("Internet")}>
          <h1 className="text-xl font-semibold text-center text-black">Internet Bill</h1>
          <img src={bill_2} className="logo mx-auto mt-4" alt="Internet Bill" />
        </div>
        {/* Other bill types go here */}
      </div>

      {isPopupVisible && (
        <div className="popup fixed inset-0 bg-zinc-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="popup-inner bg-zinc-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-black">Select Your {selectedBill} Company</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                value={Company}
                onChange={(e) => setCompany(e.target.value)}
                required
                className="block w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 text-black"
              >
                <option value="">Select Company</option>
                {billOptions.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </select>

              <div className="form space-y-2">
                <input
                  className="textbox w-full p-2 border rounded-lg text-black"
                  type="text" 
                  value={accnum}
                  onChange={(e) => setaccnum(e.target.value)}
                  required
                  placeholder="ACCOUNT NUM / CUSTOMER NUM"
                />
              </div>

              <div className="form space-y-2">
                <input
                  className="textbox w-full p-2 border rounded-lg text-black"
                  type="text"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder="USERNAME"
                />
              </div>

              <div className="form space-y-2">
                <input
                  className="textbox w-full p-2 border rounded-lg text-black"
                  type="number"
                  value={Amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Bill Amount"
                />
              </div>

              <div className="form space-y-2">
                <input
                  className="textbox w-full p-2 border rounded-lg text-black"
                  type="text"
                  value={Month}
                  onChange={(e) => setMonth(e.target.value)}
                  placeholder="Billing Month"
                />
              </div>

              <div className="form space-y-2">
                <input
                  className="textbox w-full p-2 border rounded-lg text-black"
                  type="text"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email (optional)"
                />
              </div>

              <div className="form space-y-2">
                <input
                  className="textbox w-full p-2 border rounded-lg text-black"
                  type="text"
                  value={Address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  placeholder="Address"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={Check}
                  onChange={(e) => setCheck(e.target.checked)}
                  className="h-4 w-4"
                />
                <label className="text-sm">
                  I agree to the company policy, and I understand that any vulnerabilities will not be considered as it is a test version.
                </label>
              </div>

              <div className="flex justify-end space-x-4 mt-4">
                <button onClick={closePopup} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                  Close
                </button>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
                  Preview
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isPopup2Visible && SubmittedData && (
        <div className="popup fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="popup-inner bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Payment Preview</h2>
            <p>Bill Type: {SubmittedData.selectedBill}</p>
            <p>Account Number: {SubmittedData.accnum}</p>
            <p>Username: {SubmittedData.username}</p>
            <p>Company: {SubmittedData.company}</p>
            <p>Amount: {SubmittedData.amount}</p>
            <p>Billing Month: {SubmittedData.month}</p>
            <p>Email: {SubmittedData.email}</p>
            <p>Address: {SubmittedData.address}</p>
            <div className="flex justify-end space-x-4 mt-4">
              <button onClick={closePopup2} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                Close
              </button>
              <button onClick={handlerouter} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition">
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billing;
