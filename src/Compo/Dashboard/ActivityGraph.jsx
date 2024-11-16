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
      const token = localStorage.getItem('jwttoken');        
        
      try {
        const response = await fetch("https://online-banking-system-backend.vercel.app/getdailyexpense", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        });

        const data = await response.json();

        if (data.dailyusage) {
          const formattedData = data.dailyusage.map((entry) => ({
            name: new Date(entry.expenditure_date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            }),
            totalExpenditure: parseFloat(entry.total_daily_expenditure),
          }));

          setUsageData(formattedData);
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
    <div
      className="col-span-8 overflow-hidden rounded"
      style={{ background: "linear-gradient(90deg, #1E90FF 0%, #004AAD 100%)" }}
    >
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium text-white">
          <FiUser /> Banking Activity
        </h3>
      </div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={usageData}
            margin={{
              top: 0,
              right: 0,
              left: -24,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="#ffffff" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#ffffff", fontWeight: "bold" }}
              padding={{ right: 4 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#ffffff", fontWeight: "bold" }}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-black"
              contentStyle={{ color: "#000000" }}
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
