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

        // Parse the responses only once
        const data1 = await response1.json();
        const data2 = await response2.json();

        // Set user count
        if (data1.userCount) {
          console.log("  userCount retrieved successfully!");
          setCount(data1.userCount);
        } else {
          console.log(data1.userCount);
        }

        // Set current month usage
        if (data2.currentMonthUsage) {
          console.log("currentMonthUsage retrieved successfully!");
          setUsage(data2.currentMonthUsage);
        } else {
          console.log(data2.currentMonthUsage);
        }

      } catch (error) {
        console.error("Error retrieving stats:", error);
        console.log("An error occurred. Please try again.");
      }
    };

    fetchStats();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    
    <>
 
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
