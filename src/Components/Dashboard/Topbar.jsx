import { useState,useEffect } from "react";
import React from "react";

export const TopBar = () => {
   const [email,setEmail]=useState(null);

   useEffect(() => {
    const fetchemail = async () => {
      try {
        // Sending a GET request to the backend
        const response = await fetch("http://localhost:5000/getuseremail", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Check if the response is OK
        if (response.ok) {
          const data = await response.json();
          if (data.email) {
            console.log("Email retrieved successfully!");
            setEmail(data.email);  // Set the email from the response
          } else {
            console.log(data.message || "Email not found.");
          }
        } else {
          console.log("Failed to retrieve email. Status:", response.status);
        }
      } catch (error) {
        console.error("Error retrieving email:", error);
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