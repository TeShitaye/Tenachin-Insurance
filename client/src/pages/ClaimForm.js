import React, { useState } from "react";
import axios from "axios";

const ClaimRequestForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    hospital: "",
    policy: "",
    paymentMethod: "",
    description: "",
  });

  const hospitals = ["City Hospital", "HealthCare Plus", "Sunrise Medical", "St. Mary's"];
  const policies = ["Emergency Care", "Doctor Appointments", "Surgical Procedures", "Inpatient Services"];
  const paymentMethods = ["Credit Card", "Debit Card", "Bank Transfer", "Cash"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await axios.post("http://localhost:5000/claims", formData);
      alert("Claim submitted successfully.");
      setFormData({
        fullName: "",
        email: "",
        hospital: "",
        policy: "",
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
          {/* Full Name */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Hospital Selection */}
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
              {hospitals.map((hospital, index) => (
                <option key={index} value={hospital}>
                  {hospital}
                </option>
              ))}
            </select>
          </div>

          {/* Policy Selection */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Select Policy</label>
            <select
              name="policy"
              value={formData.policy}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            >
              <option value="" disabled>
                Select a policy
              </option>
              {policies.map((policy, index) => (
                <option key={index} value={policy}>
                  {policy}
                </option>
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
              <option value="" disabled>
                Select a payment method
              </option>
              {paymentMethods.map((method, index) => (
                <option key={index} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
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

          {/* Submit Button */}
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
