import React, { useEffect, useState } from "react";
import axios from "axios";

const ClaimsManagement = () => {
  const [regularClaims, setRegularClaims] = useState([]);
  const [premiumClaims, setPremiumClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Token missing");

        const [regularResponse, premiumResponse] = await Promise.all([
          axios.get("http://localhost:5000/claims", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/premiumclaims", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        console.log("Regular Claims:", regularResponse.data);
        console.log("Premium Claims:", premiumResponse.data);
        setRegularClaims(regularResponse.data);
        setPremiumClaims(premiumResponse.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching claims:", error);
        setError(error.response ? error.response.data.message : "Failed to fetch claims.");
        setLoading(false); // Ensure loading is false even if there is an error
      }
    };

    fetchClaims();
  }, []);

  const handleAction = async (claimId, action, isPremium) => {
    try {
      await axios.put(`http://localhost:5000/claims/${claimId}`, { status: action });
      // Update state locally after the action
      if (isPremium) {
        setPremiumClaims((prev) =>
          prev.map((claim) => (claim._id === claimId ? { ...claim, status: action } : claim))
        );
      } else {
        setRegularClaims((prev) =>
          prev.map((claim) => (claim._id === claimId ? { ...claim, status: action } : claim))
        );
      }
      alert(`Claim ${action.toLowerCase()}d successfully!`);
    } catch (err) {
      console.error("Error updating claim:", err);
      setError(err.response ? err.response.data.message : "Failed to update claim. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-600">
        {error}
      </div>
    );
  }

  const renderTable = (claims, title, isPremium) => (
    <div className="m-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <table className="min-w-full border-collapse border border-gray-200">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Hospital</th>
            <th className="border border-gray-300 px-4 py-2">Service</th>
            <th className="border border-gray-300 px-4 py-2">Payment Method</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim._id}>
              <td className="border border-gray-300 px-4 py-2">{claim.hospital}</td>
              <td className="border border-gray-300 px-4 py-2">{claim.service}</td>
              <td className="border border-gray-300 px-4 py-2">{claim.paymentMethod}</td>
              <td className="border border-gray-300 px-4 py-2">{claim.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 mr-2 rounded"
                  onClick={() => handleAction(claim._id, "Approved", isPremium)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleAction(claim._id, "Rejected", isPremium)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-4">
      {renderTable(regularClaims, "Regular Claims", false)}
      {renderTable(premiumClaims, "Premium Claims", true)}
    </div>
  );
};

export default ClaimsManagement;
