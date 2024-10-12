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

export const ActivityGraph = () => {
  const [usageData, setUsageData] = useState([]);

  useEffect(() => {
    const fetchDailyExpense = async () => {
      try {
        const response = await fetch("http://localhost:5000/getdailyexpense", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.dailyusage) {
          // Process the response data to fit the Recharts data format
          const formattedData = data.dailyusage.map((entry) => ({
            name: new Date(entry.expenditure_date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            }), // Format date as "Oct 1", for example
            totalExpenditure: parseFloat(entry.total_daily_expenditure),
          }));

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
    <div className="col-span-8 overflow-hidden rounded border border-black bg-lime-200 text-black">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium text-black">
          <FiUser /> Banking Activity
        </h3>
      </div>

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
            {/* Update the grid stroke to black */}
            <CartesianGrid stroke="#000000" />

            {/* Set XAxis labels to black */}
            <XAxis
              dataKey="name" // Display dates on the X-axis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#000000", fontWeight: "bold" }} // Text color set to black
              padding={{ right: 4 }}
            />
            {/* Set YAxis labels to black */}
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#000000", fontWeight: "bold" }} // Text color set to black
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-black" // Tooltip label set to black
              contentStyle={{ color: "#000000" }} // Tooltip content text set to black
            />
            
            {/* Update the line stroke to black */}
            <Line
              type="monotone"
              dataKey="totalExpenditure" // Expenditure data
              stroke="#000000" // Change line color to black
              fill="#000000"
              name="Expenditure" // Tooltip label
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
