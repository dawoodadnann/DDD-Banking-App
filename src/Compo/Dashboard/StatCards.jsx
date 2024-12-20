import React, { useState, useEffect } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export const StatCards = () => {
  const [balance, setBalance] = useState(null);
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem('jwttoken');
        
        const response = await fetch("https://online-banking-system-backend.vercel.app/getbalance", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json", 'Authorization': `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.balance) {
          console.log("Balance retrieved successfully!");
          setBalance(data.balance);
        } else {
          console.log(data.message);
        }

        const response2 = await fetch("https://online-banking-system-backend.vercel.app/getmonthexpense", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });

        const data2 = await response2.json();

        if (data2.monthlyusage[0].total_monthly_expenditure) {
          console.log("Monthly expenditure retrieved successfully!");
          setUsage(data2.monthlyusage[0].total_monthly_expenditure);
        } else {
          console.log(data2.monthlyusage[0].total_monthly_expenditure);
        }
      } catch (error) {
        console.error("Error retrieving balance:", error);
        console.log("An error occurred. Please try again.");
      }
    };

    fetchBalance();
  }, []); 

  return (
    <>
      <Card
        title="Your Balance"
        value={balance !== null ? `$${balance}` : "Loading..."}
        trend="up"
      />
      <Card
        title="Spendings (This Month)"
        value={usage !== null ? `$${usage}` : "Loading..."}
        trend="down"
      />
    </>
  );
};

const Card = ({ title, value, trend }) => {
  return (
    <div 
      className="col-span-4 p-4 rounded border border-stone-300 text-white"
      style={{ background: "linear-gradient(90deg, #1E90FF 0%, #004AAD 100%)" }}
    >
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-white mb-2 text-lg font-semibold">{title}</h3>
          <p className="text-3xl pt-6 font-semibold">{value}</p>
        </div>

        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
        </span>
      </div>
    </div>
  );
};
