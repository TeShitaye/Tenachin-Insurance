import React, { useState, useEffect } from "react";
import axios from "axios";

const PremiumClaimForm = () => {
  const [formData, setFormData] = useState({
    hospital: "",
    service: "",
    paymentMethod: "",
    description: "",
    priority: true,
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

    try {
      await axios.post("http://localhost:5000/premiumclaims", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      alert("Claim submitted successfully.");
      setFormData({
        hospital: "",
        service: "",
        paymentMethod: "",
        description: "",
        priority: true,
      });
    } catch (error) {
      console.error("Error submitting claim:", error.response?.data || error.message);
      alert("Failed to submit the claim request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-16">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">Premium Claim Request Form</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Hospital */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Hospital</label>
            <select
              name="hospital"
              value={formData.hospital}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            >
              {options.hospitals.map((hospital, index) => (
                <option key={index} value={hospital.name}>{hospital.name}</option>
              ))}
            </select>
          </div>

          {/* Service */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Service</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            >
              {options.services.map((service, index) => (
                <option key={index} value={service.name}>{service.name}</option>
              ))}
            </select>
          </div>

          {/* Payment Method */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Payment Method</label>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            >
              {options.paymentMethods.map((method, index) => (
                <option key={index} value={method.name}>{method.name}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Claim Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="5"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 focus:outline-none"
            >
              Submit Claim
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PremiumClaimForm;
