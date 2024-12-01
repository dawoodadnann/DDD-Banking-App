import React, { useState, useEffect } from "react";
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal } from "react-icons/fi";

export const RecentTransactions = () => {
  const [bills, setBills] = useState([]);
  const [trans, setTrans] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const token = localStorage.getItem('jwttoken');
        
        const response = await fetch("https://online-banking-system-backend.vercel.app/getbillhistory", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.bills) {
            setBills(data.bills);
            console.log("Data retrieved successfully!", data.bills);
          }
        } else {
          console.log("Failed to retrieve bills. Status:", response.status);
        }
      } catch (error) {
        console.error("Error retrieving bills:", error);
      }
    };

    fetchBills();
  }, []);

  useEffect(() => {
    const fetchTrans = async () => {
      try {
        const token = localStorage.getItem('jwttoken');
        
        const response = await fetch("https://online-banking-system-backend.vercel.app/gettranshistory", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.bills) {
            setTrans(data.bills);
            console.log("Data retrieved successfully!", data.bills);
          }
        } else {
          console.log("Failed to retrieve bills. Status:", response.status);
        }
      } catch (error) {
        console.error("Error retrieving bills:", error);
      }
    };

    fetchTrans();
  }, []);

  return (
    <div
      className="col-span-12 p-4 rounded"
      style={{ background: "linear-gradient(90deg, #1E90FF 0%, #004AAD 100%)" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium text-white text-lg">
          <FiDollarSign /> Recent Transactions
        </h3>
        <button className="text-sm text-white hover:underline">
          See all
        </button>
      </div>
      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {bills.length > 0 ? (
            bills.map((bill, index) => (
              <TableRow
                key={bill.bill_id}
                transactionId={bill.bill_id}
                description={`${bill.selected_company} - ${bill.select_type}`}
                date={new Date(bill.paid_at).toLocaleDateString()}
                amount={`$${parseFloat(bill.amount).toFixed(2)}`}
                order={index + 1}
              />
            ))
          ) : ( 
            <tr>
              <td colSpan="5" className="p-4 text-center text-white">
                No Bills found.
              </td>
            </tr>
          )}
          {trans.length > 0 ? (
            trans.map((trans, index) => (
              <TableRow
                key={trans.trans_id}
                transactionId={trans.trans_id}
                description={`${trans.receiver_email} - ${trans.receiver_user_id}`}
                date={new Date(trans.paid_at).toLocaleDateString()}
                amount={`$${parseFloat(trans.amount).toFixed(2)}`}
                order={index + 1}
              />
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-4 text-center text-white">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-white">
        <th className="text-start p-1.5">Transaction ID</th>
        <th className="text-start p-1.5">Description</th>
        <th className="text-start p-1.5">Date</th>
        <th className="text-start p-1.5">Amount</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({ transactionId, description, date, amount, order }) => {
  return (
    <tr className={order % 2 ? "bg-opacity-10 text-sm text-white" : "text-sm text-white"}>
      <td className="p-1.5">
        <a href="#" className="text-white underline flex items-center gap-1">
          {transactionId} <FiArrowUpRight />
        </a>
      </td>
      <td className="p-1.5">{description}</td>
      <td className="p-1.5">{date}</td>
      <td className="p-1.5">{amount}</td>
      <td className="w-8">
        <button className="hover:bg-white hover:bg-opacity-20 transition-colors grid place-content-center rounded text-sm size-8">
          <FiMoreHorizontal />
        </button>
      </td>
    </tr>
  );
};
