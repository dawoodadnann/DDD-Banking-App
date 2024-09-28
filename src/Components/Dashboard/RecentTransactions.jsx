import React from "react";
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal } from "react-icons/fi";

export const RecentTransactions = () => {
  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiDollarSign /> Recent Transactions
        </h3>
        <button className="text-sm text-violet-500 hover:underline">
          See all
        </button>
      </div>
      <table className="w-full table-auto">
        <TableHead />

        <tbody>
          <TableRow
            transactionId="#TXN48149"
            description="ATM Withdrawal"
            date="Sept 5th"
            amount="$300"
            order={1}
          />
          <TableRow
            transactionId="#TXN1942s"
            description="Direct Deposit"
            date="Sept 4th"
            amount="$1500"
            order={2}
          />
          <TableRow
            transactionId="#TXN4192"
            description="Utility Bill Payment"
            date="Sept 3rd"
            amount="$120"
            order={3}
          />
          <TableRow
            transactionId="#TXN99481"
            description="Grocery Purchase"
            date="Sept 2nd"
            amount="$94.75"
            order={4}
          />
          <TableRow
            transactionId="#TXN1304"
            description="Money Transfer"
            date="Sept 1st"
            amount="$500"
            order={5}
          />
          <TableRow
            transactionId="#TXN1305"
            description="ATM Deposit"
            date="Aug 31st"
            amount="$700"
            order={6}
          />
        </tbody>
      </table>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Transaction ID</th>
        <th className="text-start p-1.5">Description</th>
        <th className="text-start p-1.5">Date</th>
        <th className="text-start p-1.5">Amount</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  transactionId,
  description,
  date,
  amount,
  order,
})=> {
// }: {
//   transactionId: string;
//   description: string;
//   date: string;
//   amount: string;
//   order: number;
// }) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">
        <a
          href="#"
          className="text-violet-600 underline flex items-center gap-1"
        >
          {transactionId} <FiArrowUpRight />
        </a>
      </td>
      <td className="p-1.5">{description}</td>
      <td className="p-1.5">{date}</td>
      <td className="p-1.5">{amount}</td>
      <td className="w-8">
        <button className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
          <FiMoreHorizontal />
        </button>
      </td>
    </tr>
  );
};
