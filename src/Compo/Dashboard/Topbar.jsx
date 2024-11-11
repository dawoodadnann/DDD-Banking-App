import { useState, useEffect } from "react";
import React from "react";

const getFormattedDate = () => {
  const date = new Date();
  
  const options = {
    weekday: 'long', 
    month: 'short',
    day: 'numeric', 
    year: 'numeric' 
  };

  const day = date.getDate();
  const suffix = getDaySuffix(day);
  const formattedDate = date.toLocaleDateString('en-US', options);

  return formattedDate.replace(/\d+/, day + suffix);
};

const getDaySuffix = (day) => {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1: return 'st';
    case 2: return 'nd';
    case 3: return 'rd';
    default: return 'th';
  }
};

export const TopBar = () => {
   const [email, setEmail] = useState(null);
   const [date, setDate] = useState(null);

   useEffect(() => {
    setDate(getFormattedDate());
    const fetchemail = async () => {
      try {
        const token = localStorage.getItem('jwttoken');     
        
        const response = await fetch("https://online-banking-system-backend.vercel.app/getuserfullname", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json", 
            'Authorization': `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.fullname) {
            console.log("Data retrieved successfully!", data.fullname);
            setEmail(data.fullname);
          }
        } else {
          console.log("Failed to retrieve fullname. Status:", response.status);
        }
      } catch (error) {
        console.error("Error retrieving fullname:", error);
      }
    };

    fetchemail();
  }, []); 

  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block" style={{ color: "#004AAD" }}>🚀 Good morning, {email}</span>
          <span className="text-xs block" style={{ color: "#004AAD" }}>
            {date}
          </span>
        </div>
      </div>
    </div>
  );
};
