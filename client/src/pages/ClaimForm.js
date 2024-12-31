import React, { useState, useEffect } from "react";
import axios from "axios";

const ClaimRequestForm = () => {
  const [formData, setFormData] = useState({
    hospital: "",
    service: "",
    paymentMethod: "",
    description: "",
  });

  const [options, setOptions] = useState({
    hospitals: [],
    services: [],
    paymentMethods: [],
  });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/options");
        setOptions(response.data);
      } catch (error) {
        console.error("Error fetching options:", error.response?.data || error.message);
      }
    };
    fetchOptions();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token"); // Assuming you store the JWT in local storage
  
    if (!token) {
      alert("User not authenticated.");
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:5000/claims", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      alert(response.data.Status + ": " + response.data.Message);
      setFormData({
        hospital: "",
        service: "",
        paymentMethod: "",
        description: "",
      });
    } catch (error) {
      console.error("Error submitting claim:", error.response?.data || error.message);
      alert("Failed to submit the claim request. Please try again.");
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-16">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Claim Request Form</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-gray-700">Select Hospital</label>
            <select
              name="hospital"
              value={formData.hospital}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>
                Select a hospital
              </option>
              {options.hospitals.map((hospital) => (
                <option key={hospital.id} value={hospital.name}>
                  {hospital.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700">Select Services</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>
                Select a service
              </option>
              {options.services.map((service) => (
                <option key={service.id} value={service.name}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>
                Select a payment method
              </option>
              {options.paymentMethods.map((method) => (
                <option key={method.id} value={method.name}>
                  {method.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700">Additional Details</label>
            <textarea
              name="description"
              placeholder="Provide any additional details about your claim..."
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              rows="4"
            ></textarea>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300"
            >
              Submit Claim Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClaimRequestForm;
