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
    <div className="col-span-8 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
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
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="name" // Display dates on the X-axis
              axisLine={false}
              tickLine={false}
              className="text-xs font-bold"
              padding={{ right: 4 }}
            />
            <YAxis
              className="text-xs font-bold"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Line
              type="monotone"
              dataKey="totalExpenditure" // Expenditure data
              stroke="#18181b"
              fill="#18181b"
              name="Expenditure" // Tooltip label
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
