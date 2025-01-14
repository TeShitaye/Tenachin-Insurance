import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

// Connect to the Socket.IO server
const socket = io("http://localhost:5000");

const OptionsManagement = () => {
  const [options, setOptions] = useState({
    hospitals: [],
    services: [],
    paymentMethods: [],
  });
  const [newOption, setNewOption] = useState({ type: "", name: "" });
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
  const fetchOptions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/options");
      console.log("Fetched options:", response.data); // Debugging log
      
      if (response.data) {
        // Transform the fetched array into an object with arrays for each type
        const organizedOptions = response.data.reduce(
          (acc, option) => {
            if (!acc[option.type]) acc[option.type] = []; // Initialize if not present
            acc[option.type].push({ id: option._id, name: option.name });
            return acc;
          },
          { hospitals: [], services: [], paymentMethods: [] } // Default structure
        );
        
        setOptions(organizedOptions);
      }
    } catch (error) {
      console.error("Error fetching options:", error.response?.data || error.message);
    } finally {
      setLoading(false); // Stop loading after fetch
    }
  };

  fetchOptions();

  // Listen for real-time updates
  socket.on("optionsUpdated", (updatedOptions) => {
    if (updatedOptions) {
      setOptions(updatedOptions);
    }
  });

  return () => socket.off("optionsUpdated");
}, []);

  const handleAddOption = async () => {
    if (!newOption.type || !newOption.name) {
      alert("Please provide both type and name.");
      return;
    }

    try {
      // Optimistically update the UI with the new option
      const updatedOptions = { ...options };
      updatedOptions[newOption.type].push({ name: newOption.name, id: Date.now() }); // Temporary ID

      setOptions(updatedOptions);  // Immediately update the state

      // Save the new option to the server
      await axios.post("http://localhost:5000/options", newOption);

      // Emit event to notify clients
      socket.emit("optionsChanged");

      // Clear the form
      setNewOption({ type: "", name: "" });
    } catch (error) {
      console.error("Error adding option:", error.response?.data || error.message);
    }
  };

  const handleRemoveOption = async (type, id) => {
    try {
      await axios.delete(`http://localhost:5000/options/${id}`);
      
      // Optimistically remove the item from the state to update UI immediately
      const updatedOptions = { ...options };
      updatedOptions[type] = updatedOptions[type].filter((item) => item.id !== id);
      
      setOptions(updatedOptions);

      // Emit event to update options on all clients
      socket.emit("optionsChanged");
    } catch (error) {
      console.error("Error removing option:", error.response?.data || error.message);
    }
  };

  // Show loading message while data is being fetched
  if (loading) {
    return <div>Loading options...</div>;
  }

  // Check if any of the options arrays are undefined or empty
  const isOptionsEmpty = 
    (!options.hospitals.length && !options.services.length && !options.paymentMethods.length);

  if (isOptionsEmpty) {
    return <div>No options available. Please try again later.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-8 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Options Management</h1>

        {/* Add New Option */}
        <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-center">
          <div className="w-full md:w-1/3">
            <label className="block text-gray-700 font-medium">Type:</label>
            <select
              value={newOption.type}
              onChange={(e) => setNewOption({ ...newOption, type: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            >
              <option value="">Select Type</option>
              <option value="hospitals">Hospital</option>
              <option value="services">Service</option>
              <option value="paymentMethods">Payment Method</option>
            </select>
          </div>

          <div className="w-full md:w-1/3">
            <label className="block text-gray-700 font-medium">Name:</label>
            <input
              type="text"
              placeholder="Enter name"
              value={newOption.name}
              onChange={(e) => setNewOption({ ...newOption, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <button
            onClick={handleAddOption}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-all duration-300"
          >
            Add Option
          </button>
        </div>

        {/* Display Options */}
        <div className="space-y-6">
          {Object.keys(options).map((type) => (
            <div key={type} className="bg-gray-50 rounded-lg shadow p-4">
              <h2 className="text-xl font-bold text-blue-700 capitalize mb-4">{type}</h2>
              <ul className="divide-y divide-gray-200">
                {options[type] && options[type].length > 0 ? (
                  options[type].map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center py-2 px-4 hover:bg-gray-100 rounded-md transition"
                    >
                      <span className="text-gray-800 font-medium">{item.name}</span>
                      <button
                        onClick={() => handleRemoveOption(type, item.id)}
                        className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
                      >
                        Remove
                      </button>
                    </li>
                  ))
                ) : (
                  <li>No options available for {type}</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OptionsManagement;
