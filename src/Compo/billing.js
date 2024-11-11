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
import { useNavigate } from "react-router-dom";
import "./billing.css";

const Billing = () => {
  const navigate = useNavigate();
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
      const token = localStorage.getItem('jwttoken');     
      
     
      const response = await fetch("https://online-banking-system-backend.vercel.app/billing", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(SubmittedData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Payment successful: " + result.message);
        setPopup2Visible(false);
        navigate('/dashboard');
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
    <div className="pt-16 h-screen">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6">
        {/* Bill Boxes */}
        <div className="bill-box p-4 cursor-pointer" onClick={() => handleBoxClick("Electricity")}>
          <h1 className="bill-title">Electricity Bill</h1>
          <img src={bill_7} className="bill-logo" alt="Electricity Bill" />
        </div>
        <div className="bill-box p-4 cursor-pointer" onClick={() => handleBoxClick("Gas")}>
          <h1 className="bill-title">Gas Bill</h1>
          <img src={bill_3} className="bill-logo" alt="Gas Bill" />
        </div>
        <div className="bill-box p-4 cursor-pointer" onClick={() => handleBoxClick("Water")}>
          <h1 className="bill-title">Water Bill</h1>
          <img src={bill_8} className="bill-logo" alt="Water Bill" />
        </div>
        <div className="bill-box p-4 cursor-pointer" onClick={() => handleBoxClick("Internet")}>
          <h1 className="bill-title">Internet Bill</h1>
          <img src={bill_2} className="bill-logo" alt="Internet Bill" />
        </div>
        <div className="bill-box p-4 cursor-pointer" onClick={() => handleBoxClick("Telephone")}>
          <h1 className="bill-title">Telephone Bill</h1>
          <img src={bill_12} className="bill-logo" alt="Telephone Bill" />
        </div>
        <div className="bill-box p-4 cursor-pointer" onClick={() => handleBoxClick("Tax")}>
          <h1 className="bill-title">Tax Bill</h1>
          <img src={bill_9} className="bill-logo" alt="Tax Bill" />
        </div>
        <div className="bill-box p-4 cursor-pointer" onClick={() => handleBoxClick("Education")}>
          <h1 className="bill-title">Education Bill</h1>
          <img src={bill_4} className="bill-logo" alt="Education Bill" />
        </div>
        <div className="bill-box p-4 cursor-pointer" onClick={() => handleBoxClick("Government")}>
          <h1 className="bill-title">Government Bill</h1>
          <img src={bill_5} className="bill-logo" alt="Government Bill" />
        </div>
        <div className="bill-box p-4 cursor-pointer" onClick={() => handleBoxClick("CreditCard")}>
          <h1 className="bill-title">Credit Card Bill</h1>
          <img src={bill_6} className="bill-logo" alt="Credit Card Bill" />
        </div>
        <div className="bill-box p-4 cursor-pointer" onClick={() => handleBoxClick("Clubs")}>
          <h1 className="bill-title">Clubs Bill</h1>
          <img src={bill_1} className="bill-logo" alt="Clubs Bill" />
        </div>
        <div className="bill-box p-4 cursor-pointer" onClick={() => handleBoxClick("E_Challan")}>
          <h1 className="bill-title">E-Challan Bill</h1>
          <img src={bill_10} className="bill-logo" alt="E-Challan Bill" />
        </div>
        <div className="bill-box p-4 cursor-pointer" onClick={() => handleBoxClick("Nadra")}>
          <h1 className="bill-title">Nadra Bill</h1>
          <img src={bill_11} className="bill-logo" alt="Nadra Bill" />
        </div>
      </div>
  
      {/* Popup Form */}
      {isPopupVisible && (
        <div className="popup fixed inset-0 bg-zinc-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="popup-inner bg-zinc-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-white">Select Your {selectedBill} Company</h2>
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
  
              <input
                className="textbox w-full p-2 border rounded-lg text-black"
                type="text"
                value={accnum}
                onChange={(e) => setaccnum(e.target.value)}
                required
                placeholder="ACCOUNT NUM / CUSTOMER NUM"
              />
  
              <input
                className="textbox w-full p-2 border rounded-lg text-black"
                type="text"
                value={Username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="USERNAME"
              />
  
              <input
                className="textbox w-full p-2 border rounded-lg text-black"
                type="number"
                value={Amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Bill Amount"
              />
  
              <input
                className="textbox w-full p-2 border rounded-lg text-black"
                type="text"
                value={Month}
                onChange={(e) => setMonth(e.target.value)}
                placeholder="Billing Month"
              />
  
              <input
                className="textbox w-full p-2 border rounded-lg text-black"
                type="text"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email (optional)"
              />
  
              <input
                className="textbox w-full p-2 border rounded-lg text-black"
                type="text"
                value={Address}
                onChange={(e) => setAddress(e.target.value)}
                required
                placeholder="Address"
              />
  
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={Check}
                  onChange={(e) => setCheck(e.target.checked)}
                  className="h-4 w-4"
                />
                <label className="text-white text-sm">
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
  
      {/* Payment Preview Popup */}
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
