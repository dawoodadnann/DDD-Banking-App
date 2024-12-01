import React, { useState } from "react";
import DynamicInput from "./DynamicInput";

export const MoneyTransfer = () => {
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("dPay");
  const [selectedBank, setSelectedBank] = useState("");
  const [isSending, setIsSending] = useState(false); // Loading state for the Send button

  const handleTransfer = async () => {
    if (!amount || !accountNumber) {
      setStatusMessage("Please enter both account number and amount.");
      return;
    }

    if (paymentMethod === "crossPlatform" && !selectedBank) {
      setStatusMessage("Please select a bank/payment app.");
      return;
    }

    setIsSending(true); // Set loading state
    setStatusMessage(""); // Clear previous messages

    try {
      const token = localStorage.getItem("jwttoken");

      // Choose the API endpoint based on the payment method
      const endpoint =
        paymentMethod === "dPay"
          ? "https://online-banking-system-backend.vercel.app/interbanktransaction"
          : "https://online-banking-system-backend.vercel.app/CBT";

      // Prepare the request body
      const requestBody =
        paymentMethod === "dPay"
          ? {
              Amount: amount,
              accnum: accountNumber,
              check: true,
            }
          : {
              amount: amount,
              accnum: accountNumber,
              selectedBank: selectedBank,
            };

      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
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
    } finally {
      setIsSending(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="gradient-box p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-xl font-bold text-white text-center mb-4">
          Transfer Money With Just A Tap
        </h2>

        <div className="mb-4">
          <div className="flex space-x-4 border-b border-gray-600 bg-zinc-600">
            <button
              className={`py-2 px-4 rounded-t-lg focus:outline-none ${
                paymentMethod === "dPay"
                  ? "bg-dark-gray text-white"
                  : "text-gray-400"
              }`}
              onClick={() => setPaymentMethod("dPay")}
            >
              Pay with D-Pay
            </button>
            <button
              className={`py-2 px-4 rounded-t-lg focus:outline-none ${
                paymentMethod === "crossPlatform"
                  ? "bg-dark-gray text-white"
                  : "text-gray-400"
              }`}
              onClick={() => setPaymentMethod("crossPlatform")}
            >
              Pay Cross Platform
            </button>
          </div>
        </div>

        <div className="mb-4">
          <DynamicInput
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none"
          />
        </div>

        {paymentMethod === "crossPlatform" && (
          <div className="mb-4">
            <label className="block text-white mb-1">
              Select Bank/Payments App
            </label>
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded focus:outline-none"
            >
              <option value="" disabled>
                Select a bank/payment app
              </option>
              <option value="BankA">Bank A</option>
              <option value="BankB">Bank B</option>
              <option value="PaymentAppA">Payment App A</option>
              <option value="PaymentAppB">Payment App B</option>
            </select>
          </div>
        )}

        <div className="mb-4">
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
          className={`bg-dark-gray text-white p-2 rounded w-full hover:bg-gray-500 ${
            isSending ? "cursor-not-allowed bg-gray-500" : ""
          }`}
          disabled={isSending} // Disable button while loading
        >
          {isSending ? "Sending..." : "Send"}
        </button>

        {statusMessage && <p className="text-white mt-2">{statusMessage}</p>}
      </div>
    </div>
  );
};

export default MoneyTransfer;
