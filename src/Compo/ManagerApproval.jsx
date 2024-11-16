import React, { useState, useEffect } from "react";
import logo from "../assets/logo2.png";

const ManagerApproval = () => {
  const [requests, setRequests] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('jwttoken');     
        
        const response = await fetch("https://online-banking-system-backend.vercel.app/getunapprove", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",'Authorization': `Bearer ${token}`
          },
        });
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setRequests(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch requests: " + error.message);
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleApproval = async (isApproved) => {
    const action = isApproved ? "approve" : "reject";
    
    // Debugging: log the current request to ensure correct data
    console.log("Current request data:", requests[currentIndex]);
  
    const requestId = requests[currentIndex].user_id ||requests[currentIndex].admin_id; // Ensure 'user_id' is correct
    if (!requestId) {
      setMessage("Request ID not found.");
      return;
    }
  
    try {
      const token = localStorage.getItem('jwttoken');     
      
      
      const response = await fetch(`https://online-banking-system-backend.vercel.app/updateapproval`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ requestId, status: isApproved }),
      });
  
      if (response.ok) {
        setMessage(`Request ${action}d successfully!`);
        setRequests(requests.filter((_, index) => index !== currentIndex));
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else {
        setMessage("Action failed.");
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
    }
  };
  

  const handleNext = () => {
    if (currentIndex < requests.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!requests.length) return <div>No account requests available.</div>;

  const { fname, lname, email,user_id,cnic,admin_id,nationality } = requests[currentIndex];

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full flex justify-between p-4 col-span-12 p-4 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-700 text-white">
        <img src={logo} alt="E-bank" className="h-10" />
        <h2 className="text-white text-2xl">Manager Approval Panel</h2>
      </div>

      <div className="w-full max-w-md mt-8 p-8 col-span-12 p-4 rounded-lg shadow-md bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-lg shadow-lg">
        <h3 className="text-lg font-medium text-center text-white mb-6">
          Review Account Request {currentIndex + 1} of {requests.length}
        </h3>

        <div className="text-gray-300 mb-6">
          <p><strong>User Id:</strong> {user_id || admin_id}</p>
          <p><strong>Name:</strong> {fname} {lname}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>CNIC :</strong> {cnic}</p>
          <p><strong>Nationality:</strong> {nationality}</p>
        </div>

        {message && <div className="text-green-500 mb-4">{message}</div>}

        <div className="flex justify-between mt-6">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => handleApproval(true)}
          >
            Approve
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => handleApproval(false)}
          >
            Reject
          </button>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <button
            className="bg-gray-600 text-white px-4 py-2 rounded"
            onClick={handleNext}
            disabled={currentIndex === requests.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManagerApproval;
