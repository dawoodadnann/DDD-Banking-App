import { useState,useEffect } from "react";
import React from "react";

export const TopBar = () => {
   const [email,setEmail]=useState(null);

  useEffect(() => {
    const fetchemail = async () => {
      try {
        // Sending a POST request to the backend
        const response = await fetch("http://localhost:5000/getemail", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

      if (data.email) {
          setEmail(data.email);
      }else {
          console.log(data.message);
        }
      } catch (error) {
        console.error("Error retrieving balance:", error);
        console.log("An error occurred. Please try again.");
      }
    };

    fetchemail();
  }, []); 
  return (
    <div className="border-b px-4 mb-4 mt-2 pb-4 border-stone-200">
      <div className="flex items-center justify-between p-0.5">
        <div>
          <span className="text-sm font-bold block">🚀 Good morning, {email}</span>
          <span className="text-xs block text-stone-500">
            Tuesday, Aug 8th 2023
          </span>
        </div>

        
      </div>
    </div>
  );
};