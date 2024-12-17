import React, { useState } from "react";
import axios from "axios";

const PremiumClaimForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    hospital: "",
    policy: "",
    paymentMethod: "",
    description: "",
    priority: true,  // Premium users get priority
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
      await axios.post("http://localhost:5000/premiumclaims", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      alert("Claim submitted successfully.");
      setFormData({
        fullName: "",
        email: "",
        hospital: "",
        policy: "",
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
          {/* Full Name */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
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
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

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
              {hospitals.map((hospital, index) => (
                <option key={index} value={hospital}>{hospital}</option>
              ))}
            </select>
          </div>

          {/* Policy */}
          <div>
            <label className="block text-lg font-semibold text-gray-700">Policy</label>
            <select
              name="policy"
              value={formData.policy}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
              required
            >
              {policies.map((policy, index) => (
                <option key={index} value={policy}>{policy}</option>
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
              {paymentMethods.map((method, index) => (
                <option key={index} value={method}>{method}</option>
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

          {/* Priority */}
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="priority"
                checked={formData.priority}
                onChange={handleInputChange}
                className="mr-2"
              />
              <span className="text-gray-700">Priority Claim (Premium users only)</span>
            </label>
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
