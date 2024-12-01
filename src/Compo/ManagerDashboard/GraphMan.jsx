import React, { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";

export const GraphMan = () => {
  const [usageData, setUsageData] = useState([]);

  useEffect(() => {
    const fetchDailyExpense = async () => {
      const token = localStorage.getItem("jwttoken");

      try {
        const response = await fetch(
          "https://online-banking-system-backend.vercel.app/getbankdailyexpense",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log(data);
        if (data.dailyusage) {
          // Process the response data to fit the Recharts data format
          const formattedData = data.dailyusage.map((entry) => ({
            name: new Date(entry.expenditure_date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            }), // Format date as "Oct 1", for example
            totalExpenditure: parseFloat(entry.total_daily_spending),
          }));
          console.log(formattedData);
          setUsageData(formattedData); // Update the state with formatted data
          console.log("Daily expenditure retrieved successfully!");
        } else {
          console.log("No usage data found.");
        }
      } catch (error) {
        console.error("Error retrieving daily expenses:", error);
      }
    };

    fetchDailyExpense();
  }, []);

  return (
    <div className="col-span-8 overflow-hidden rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      {/* Header Section */}
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiUser /> Banking Activity
        </h3>
      </div>

      {/* Graph Section */}
      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={usageData} // Use the dynamically fetched data
            margin={{
              top: 0,
              right: 0,
              left: -24,
              bottom: 0,
            }}
          >
            {/* Update the grid stroke to white */}
            <CartesianGrid stroke="#ffffff" strokeDasharray="3 3" />

            {/* Set XAxis labels to white */}
            <XAxis
              dataKey="name" // Display dates on the X-axis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#ffffff", fontWeight: "bold" }} // Text color set to white
              padding={{ right: 4 }}
            />
            {/* Set YAxis labels to white */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#ffffff", fontWeight: "bold" }} // Text color set to white
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-black"
              contentStyle={{
                color: "#000000", // Tooltip content text set to black
              }}
            />

            <Line
              type="monotone"
              dataKey="totalExpenditure"
              stroke="#000000"
              fill="#ffffff"
              name="Expenditure"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
