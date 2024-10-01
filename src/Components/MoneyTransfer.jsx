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
          Amount:amount,
          accnum:accountNumber,
          check:true
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
          backgroundColor: "#5F9EA0",
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
            backgroundColor: "#008080",
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
              color: "#ffffff",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Transfer Money With Just A Tap
          </Typography>

          <FormControl sx={{ mb: 3 }}>
            <FormLabel>Payment Method</FormLabel>
            <RadioGroup
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <Radio value="dPay" label="Pay with D-Pay" />
              <Radio value="crossPlatform" label="Pay Cross Platform" />
            </RadioGroup>
          </FormControl>

          <div className="mb-4">
            <Typography level="body2" sx={{ mb: 1 }}>
              Amount
            </Typography>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              fullWidth
            />
          </div>

          {paymentMethod === "crossPlatform" && (
            <div className="mb-4">
              <Typography level="body2" sx={{ mb: 1 }}>
                Select Bank/Payments App
              </Typography>
              <Select
                value={selectedBank}
                onChange={(e, newValue) => setSelectedBank(newValue)}
                placeholder="Select a bank/payment app"
                fullWidth
              >
                <Option value="BankA">Bank A</Option>
                <Option value="BankB">Bank B</Option>
                <Option value="PaymentAppA">Payment App A</Option>
                <Option value="PaymentAppB">Payment App B</Option>
              </Select>
            </div>
          )}

          <div className="mb-4">
            <Typography level="body2" sx={{ mb: 1 }}>
              Account Number
            </Typography>
            <Input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              placeholder="Enter account number"
              fullWidth
            />
          </div>



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
            <Typography level="body2" sx={{ mt: 2 }}>
              {statusMessage}
            </Typography>
          )}
        </Sheet>
      </div>
    </CssVarsProvider>
  );
};
