import React, { useState } from "react";
// Assuming DynamicInput is imported correctly from your project components
import DynamicInput from "./DynamicInput";

export const MoneyTransfer = () => {
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("dPay");
  const [selectedBank, setSelectedBank] = useState("");

  const handleTransfer = async () => {
    if (!amount || !accountNumber) {
      setStatusMessage("Please enter both account number and amount.");
      return;
    }

    if (paymentMethod === "crossPlatform" && !selectedBank) {
      setStatusMessage("Please select a bank/payment app.");
      return;
    }

    try {
      const token = localStorage.getItem('jwttoken');     
    
     
      const response = await fetch("https://online-banking-system-backend.vercel.app/interbanktransaction", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json", 'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          Amount: amount,
          accnum: accountNumber,
          check: true,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatusMessage("Transfer successful!");
      } else {
        setStatusMessage(data.message || "Transfer failed. Please try again.");
      }
    } catch (error) {
      console.error("Error processing transfer:", error);
      setStatusMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className="bg-zinc-800 p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold text-white text-center mb-4">
          Transfer Money With Just A Tap
        </h2>

        {/* Tabs for Payment Method Selection */}
        <div className="mb-4">
          <div className="flex space-x-4 border-b border-gray-600 bg-zinc-600">
            <button
              className={`py-2 px-4 rounded-t-lg focus:outline-none ${
                paymentMethod === "dPay" ? "bg-blue-600 text-white" : "text-gray-400"
              }`}
              onClick={() => setPaymentMethod("dPay")}
            >
              Pay with D-Pay
            </button>
            <button
              className={`py-2 px-4 rounded-t-lg focus:outline-none ${
                paymentMethod === "crossPlatform" ? "bg-blue-600 text-white" : "text-gray-400"
              }`}
              onClick={() => setPaymentMethod("crossPlatform")}
            >
              Pay Cross Platform
            </button>
          </div>
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <label className="block text-white mb-1"></label>
          <DynamicInput
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none"
          />
        </div>

        {/* Conditional Bank/Payment App Selection */}
        {paymentMethod === "crossPlatform" && (
          <div className="mb-4">
            <label className="block text-white mb-1">Select Bank/Payments App</label>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none"
            >
              <option value="" disabled>Select a bank/payment app</option>
              <option value="BankA">Bank A</option>
              <option value="BankB">Bank B</option>
              <option value="PaymentAppA">Payment App A</option>
              <option value="PaymentAppB">Payment App B</option>
            </select>
          </div>
        )}

        {/* Account Number Input */}
        <div className="mb-4">
          <label className="block text-white mb-1"></label>
          <DynamicInput
            label="Account Number"
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter account number"
            className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none"
          />
        </div>

        <button
          onClick={handleTransfer}
          className="bg-blue-600 text-white p-2 rounded w-full hover:bg-blue-500"
        >
          Send
        </button>

        {statusMessage && (
          <p className="text-white mt-2">{statusMessage}</p>
        )}
      </div>
    </div>
  );
};
