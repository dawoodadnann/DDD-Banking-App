import React, { useState, useEffect } from "react";
import logo from "../assets/logo2.png";

const UpdateCustomer = () => {
  const [customer, setCustomer] = useState(null); // Holds customer data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the customer data from the server
    const fetchCustomerData = async () => {
      try {
        const response = await fetch("http://localhost:5000/getCustomerData"); // Adjust with actual endpoint
        const data = await response.json();
        setCustomer(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch customer data.");
        setLoading(false);
      }
    };
    fetchCustomerData();
  }, []);

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:5000/updateCustomer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });

      if (response.ok) {
        alert("Customer data updated successfully!");
      } else {
        alert("Failed to update customer data.");
      }
    } catch (error) {
      alert("An error occurred.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!customer) return <div>No customer data available.</div>;

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full flex justify-between p-4 bg-zinc-800">
        <img src={logo} alt="E-bank" className="h-10" />
        <h2 className="text-white text-2xl">Update Customer Data</h2>
      </div>

      <div className="w-full max-w-md mt-8 p-8 bg-zinc-800 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium text-center text-gray-400 mb-6">
          Update Customer Information
        </h3>

        <div className="text-gray-300 mb-6">
          <form>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Name:</label>
              <input
                type="text"
                name="name"
                value={customer.name}
                onChange={handleChange}
                className="w-full px-4 py-2 text-black rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Email:</label>
              <input
                type="email"
                name="email"
                value={customer.email}
                onChange={handleChange}
                className="w-full px-4 py-2 text-black rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Phone:</label>
              <input
                type="text"
                name="phone"
                value={customer.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 text-black rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400 mb-2">Address:</label>
              <input
                type="text"
                name="address"
                value={customer.address}
                onChange={handleChange}
                className="w-full px-4 py-2 text-black rounded"
              />
            </div>
            {/* Add more fields as needed */}
          </form>
        </div>

        <div className="flex justify-between mt-6">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={handleSave}
          >
            Save Changes
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            onClick={() => window.history.back()} // Simply go back if cancel
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateCustomer;
