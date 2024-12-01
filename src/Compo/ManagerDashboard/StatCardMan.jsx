import React, { useState, useEffect } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

export const StatCardMan = () => {
  const [count, setCount] = useState(null);
  const [usage, setUsage] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('jwttoken');

        // Fetch user count
        const response1 = await fetch("https://online-banking-system-backend.vercel.app/getuserCount", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });

        // Fetch current month usage
        const response2 = await fetch("https://online-banking-system-backend.vercel.app/getbankcurrentmonthusage", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });

        // Parse the responses
        const data1 = await response1.json();
        const data2 = await response2.json();

        // Set user count
        setCount(data1.userCount || 0);

        // Set current month usage
        setUsage(data2.currentMonthUsage || 0);
      } catch (error) {
        console.error("Error retrieving stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      <Card
        title="Total Users Count"
        value={count !== null ? `${count}` : "Loading..."}
        trend="up"
      />
      <Card
        title="This Month Usage"
        value={usage !== null ? `$${usage}` : "Loading..."}
        trend="up"
      />
    </div>
  );
};

const Card = ({ title, value, trend }) => {
  return (
    <div className="p-6 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-semibold mb-2">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />}
        </span>
      </div>
    </div>
  );
};
