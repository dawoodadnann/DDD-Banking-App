import React, { useState, useEffect } from "react";
import logo from "../assets/logo2.png";

const UpdateCustomer = () => {
  const [idOrEmail, setIdOrEmail] = useState(""); // Holds the entered user/admin ID or email
  const [customer, setCustomer] = useState(null); // Holds customer/admin data
  const [loading, setLoading] = useState(false); // Manage loading state
  const [error, setError] = useState("");

  // Fetch the customer/admin data based on the ID or email
  const handleFetchCustomer = async () => {
    setLoading(true);
    setError(""); // Reset error

    try {
      const response = await fetch("http://localhost:5000/getalluser", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      // Check if the input is either user_id/admin_id or email
      const selectedCustomer = data.find(
        (item) =>
          item.user_id === idOrEmail ||
          item.admin_id === idOrEmail ||
          item.email === idOrEmail
      );

      if (selectedCustomer) {
        setCustomer(selectedCustomer);
      } else {
        setError("User/Admin not found.");
      }

      setLoading(false);
    } catch (error) {
      setError("Failed to fetch customer data.");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      
    
      const response = await fetch("http://localhost:5000/updateuser", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
      });
      if (response.ok) {
        alert("Customer/Admin data updated successfully!");
      } else {
        alert("Failed to update data.");
      }
    } catch (error) {
      alert("An error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <div className="w-full flex justify-between p-4 bg-zinc-800">
        <img src={logo} alt="E-bank" className="h-10" />
        <h2 className="text-white text-2xl">Update Customer/Admin Data</h2>
      </div>

      <div className="w-full max-w-md mt-8 p-8 bg-zinc-800 rounded-lg shadow-lg">
        <h3 className="text-lg font-medium text-center text-gray-400 mb-6">
          Enter ID or Email to Fetch Data
        </h3>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter User/Admin ID or Email"
            value={idOrEmail}
            onChange={(e) => setIdOrEmail(e.target.value)}
            className="w-full px-4 py-2 text-black rounded"
          />
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 w-full"
            onClick={handleFetchCustomer}
          >
            Fetch Data
          </button>
        </div>

        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {customer && (
          <div className="text-gray-300 mb-6">
            <form>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">First Name:</label>
                <input
                  type="text"
                  name="fname"
                  value={customer.fname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-black rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Last Name:</label>
                <input
                  type="text"
                  name="lname"
                  value={customer.lname}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-black rounded"
                />
              </div>
             
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">CNIC:</label>
                <input
                  type="text"
                  name="cnic"
                  value={customer.cnic}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-black rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Gender:</label>
                <input
                  type="text"
                  name="gender"
                  value={customer.gender}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-black rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Nationality:</label>
                <input
                  type="text"
                  name="nationality"
                  value={customer.nationality}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-black rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Date of Birth:</label>
                <input
                  type="date"
                  name="dob"
                  value={customer.dob && customer.dob.substring(0, 10)}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-black rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Joined:</label>
                <input
                  type="datetime-local"
                  name="joined"
                  value={customer.joined && customer.joined.substring(0, 19)}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-black rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Info:</label>
                <input
                  type="text"
                  name="info"
                  value={customer.info}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-black rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 mb-2">Approved:</label>
                <select
                  name="approved"
                  value={customer.approved}
                  onChange={handleChange}
                  className="w-full px-4 py-2 text-black rounded"
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </form>
          </div>
        )}

        {customer && (
          <div className="flex justify-between mt-6">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleSave}
            >
              Save Changes
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              onClick={() => window.history.back()}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateCustomer;
