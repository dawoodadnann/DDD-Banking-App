import React from "react";
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

const data = [
  {
    name: "Week 1",
    Deposits: 2750,
    Withdrawals: 1250,
  },
  {
    name: "Week 2",
    Deposits: 3620,
    Withdrawals: 2096,
  },
  {
    name: "Week 3",
    Deposits: 2900,
    Withdrawals: 3192,
  },
  {
    name: "Week 4",
    Deposits: 4500,
    Withdrawals: 2550,
  },
  {
    name: "Week 5",
    Deposits: 5050,
    Withdrawals: 4200,
  },
  {
    name: "Week 6",
    Deposits: 6875,
    Withdrawals: 3200,
  },
  {
    name: "Week 7",
    Deposits: 5700,
    Withdrawals: 4205,
  },
];

export const ActivityGraph = () => {
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
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: -24,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="name"
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
              dataKey="Deposits"
              stroke="#18181b"
              fill="#18181b"
            />
            <Line
              type="monotone"
              dataKey="Withdrawals"
              stroke="#5b21b6"
              fill="#5b21b6"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
