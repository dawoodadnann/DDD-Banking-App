import React, { useState } from "react";
import {
  CssVarsProvider,
  Sheet,
  Typography,
  Input,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  Radio,
  Select,
  Option,
} from "@mui/joy";

export const MoneyTransfer = () => {
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("dPay");
  const [selectedBank, setSelectedBank] = useState("");

  const handleTransfer = async () => {
    // Input validation
    if (!amount || !accountNumber) {
      setStatusMessage("Please enter both account number and amount.");
      return;
    }

    if (paymentMethod === "crossPlatform" && !selectedBank) {
      setStatusMessage("Please select a bank/payment app.");
      return;
    }

    try {
      // Sending a POST request to the backend to initiate the transfer
      const response = await fetch("http://localhost:5000/interbanktransaction", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
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
    <CssVarsProvider>
      <div
        style={{
          backgroundColor: "#27272A", // Changed to zinc-800
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Sheet
          variant="outlined"
          sx={{
            p: 4,
            backgroundColor: "#27272A", // Changed to zinc-800
            borderRadius: "sm",
            boxShadow: "md",
            width: "100%",
            maxWidth: 400,
          }}
        >
          <Typography
            level="h2"
            fontSize="xl"
            sx={{
              mb: 2,
              color: "#ffffff", // White text color
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Transfer Money With Just A Tap
          </Typography>

          <FormControl sx={{ mb: 3 }}>
            <FormLabel sx={{ color: "#ffffff" }}>Payment Method</FormLabel>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <Radio
                value="dPay"
                label="Pay with D-Pay"
                sx={{ color: "#ffffff", "&.Mui-checked": { color: "#ffffff" } }} // Set text color to white
              />
              <Radio
                value="crossPlatform"
                label="Pay Cross Platform"
                sx={{ color: "#ffffff", "&.Mui-checked": { color: "#ffffff" } }} // Set text color to white
              />
            </RadioGroup>
          </FormControl>

          {/* Amount Input */}
          <FormControl sx={{ mb: 3 }}>
            <FormLabel
              sx={{
                color: "#ffffff",
                transition: "0.2s ease all",
                transform: amount ? "translateY(-20px)" : "translateY(0)",
                fontSize: amount ? "0.75rem" : "1rem",
              }}
            >
              Amount
            </FormLabel>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onFocus={() => setAmount(amount)} // To trigger the label movement
              placeholder=" "
              fullWidth
              sx={{ backgroundColor: "#3a3a3c", color: "#ffffff" }} // Dark input background with white text
            />
          </FormControl>

          {/* Conditional Bank/Payment App Selection */}
          {paymentMethod === "crossPlatform" && (
            <FormControl sx={{ mb: 3 }}>
              <FormLabel
                sx={{
                  color: "#ffffff",
                  transition: "0.2s ease all",
                  transform: selectedBank ? "translateY(-20px)" : "translateY(0)",
                  fontSize: selectedBank ? "0.75rem" : "1rem",
                }}
              >
                Select Bank/Payments App
              </FormLabel>
              <Select
                value={selectedBank}
                onChange={(e, newValue) => setSelectedBank(newValue)}
                placeholder=" "
                fullWidth
                sx={{ backgroundColor: "#3a3a3c", color: "#ffffff" }} // Dark input background with white text
              >
                <Option value="BankA">Bank A</Option>
                <Option value="BankB">Bank B</Option>
                <Option value="PaymentAppA">Payment App A</Option>
                <Option value="PaymentAppB">Payment App B</Option>
              </Select>
            </FormControl>
          )}

          {/* Account Number Input */}
          <FormControl sx={{ mb: 3 }}>
            <FormLabel
              sx={{
                color: "#ffffff",
                transition: "0.2s ease all",
                transform: accountNumber ? "translateY(-20px)" : "translateY(0)",
                fontSize: accountNumber ? "0.75rem" : "1rem",
              }}
            >
              Account Number
            </FormLabel>
            <Input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              onFocus={() => setAccountNumber(accountNumber)} // To trigger the label movement
              placeholder=" "
              fullWidth
              sx={{ backgroundColor: "#3a3a3c", color: "#ffffff" }} // Dark input background with white text
            />
          </FormControl>

          <Button
            onClick={handleTransfer}
            variant="solid"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Send
          </Button>

          {statusMessage && (
            <Typography level="body2" sx={{ mt: 2, color: "#ffffff" }}>
              {statusMessage}
            </Typography>
          )}
        </Sheet>
      </div>
    </CssVarsProvider>
  );
};
