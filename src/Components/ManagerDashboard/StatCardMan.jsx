import React, { useState, useEffect } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export const StatCardMan = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        // Sending a POST request to the backend
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
      } catch (error) {
        console.error("Error retrieving balance:", error);
        console.log("An error occurred. Please try again.");
      }
    };

    fetchBalance();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <>
      <Card
        title="Total Balance"
        value={balance !== null ? `$${balance}` : "Loading..."}
        trend="up"
      />
      <Card
        title="Total Users"
        value="4500"
        trend="up"
      />
    </>
  );
};

const Card = ({ title, value, trend }) => {
  return (
    <div className="col-span-4 p-4 rounded border border-stone-300">
      <div className="flex mb-8 items-start justify-between">
        <div>
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
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
