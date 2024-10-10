import React, { useState, useEffect } from "react";
import logo from "../assets/logo2.png";

const ManagerApproval = () => {
  const [requests, setRequests] = useState([]); // Holds all requests
  const [currentIndex, setCurrentIndex] = useState(0); // Track current request index
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch account requests from the server
    const fetchRequests = async () => {
      try {
        const response = await fetch("http://localhost:5000/getAccountRequests");
        const data = await response.json();
        setRequests(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch requests.");
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  const handleApproval = async (isApproved) => {
    const action = isApproved ? "approve" : "reject";
    try {
      const response = await fetch(`http://localhost:5000/${action}Request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ requestId: requests[currentIndex].id }), // Assuming each request has an id
      });

      if (response.ok) {
        alert(`Request ${action}ed successfully!`);
        // Remove the approved/rejected request
        setRequests(requests.filter((_, index) => index !== currentIndex));
        // Reset currentIndex after action
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else {
        alert("Action failed.");
      }
    } catch (error) {
      alert("An error occurred.");
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

  return (
    <div className="min-h-screen flex flex-col items-center ">
      <div className="w-full flex justify-between p-4 bg-zinc-800">
        <img src={logo} alt="E-bank" className="h-10" />
        <h2 className="text-white text-2xl">Manager Approval Panel</h2>
      </div>

      <div className="w-full max-w-md mt-8 p-8 bg-zinc-800 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium text-center text-gray-400 mb-6">
          Review Account Request {currentIndex + 1} of {requests.length}
        </h3>

        {/* Display current request information */}
        <div className="text-gray-300 mb-6">
          <p><strong>Name:</strong> {requests[currentIndex].name}</p>
          <p><strong>Email:</strong> {requests[currentIndex].email}</p>
        </div>

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
