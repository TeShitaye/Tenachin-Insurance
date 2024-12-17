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
        const [regularResponse, premiumResponse] = await Promise.all([
          axios.get("http://localhost:5000/claims"),
          axios.get("http://localhost:5000/premiumclaims"),
        ]);

        setRegularClaims(regularResponse.data);
        setPremiumClaims(premiumResponse.data);
      } catch (err) {
        setError("Failed to fetch claims. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const handleAction = async (claimId, action, isPremium) => {
    try {
      await axios.put(`http://localhost:5000/claims/${claimId}`, { status: action });

      if (isPremium) {
        setPremiumClaims((prev) =>
          prev.map((claim) =>
            claim._id === claimId ? { ...claim, status: action } : claim
          )
        );
      } else {
        setRegularClaims((prev) =>
          prev.map((claim) =>
            claim._id === claimId ? { ...claim, status: action } : claim
          )
        );
      }

      alert(`Claim ${action.toLowerCase()}d successfully!`);
    } catch (err) {
      console.error(`Failed to ${action.toLowerCase()} claim:`, err);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-gray-600">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-lg text-red-600">
        {error}
      </div>
    );

  const renderTable = (claims, title, isPremium) => (
    <div className="m-4">
      <h2 className="text-2xl font-bold text-white py-4">{title}</h2>
      <table className="min-w-full border bg-white">
        <thead>
          <tr>
            <th className="border px-2 py-2 text-blue-600 border-blue-700 bg-gray-100">Claim ID</th>
            <th className="border px-2 py-2 text-blue-600 border-blue-700 bg-gray-100">User</th>
            <th className="border px-2 py-2 text-blue-600 border-blue-700 bg-gray-100">Hospital</th>
            <th className="border px-2 py-2 text-blue-600 border-blue-700 bg-gray-100">Policy</th>
            <th className="border px-2 py-2 text-blue-600 border-blue-700 bg-gray-100">Payment Method</th>
            <th className="border px-2 py-2 text-blue-600 border-blue-700 bg-gray-100">Status</th>
            <th className="border px-4 py-2 text-blue-600 border-blue-700 bg-gray-100">Actions</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim._id} className="hover:bg-gray-50">
              <td className="border border-black px-2 py-2 text-center">{claim._id}</td>
              <td className="border border-black px-2 py-2 text-center">{claim.fullName}</td>
              <td className="border border-black px-2 py-2 text-center">{claim.hospital}</td>
              <td className="border border-black px-2 py-2 text-center">{claim.policy}</td>
              <td className="border border-black px-1 py-2 text-center">{claim.paymentMethod}</td>
              <td
                className={`border border-black px-2 py-2 text-center font-medium ${
                  claim.status === "Approved"
                    ? "text-green-600"
                    : claim.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {claim.status}
              </td>
              <td className="border border-black py-2 text-center">
                {claim.status === "Pending" && (
                  <div className="flex gap-2 justify-center">
                    <button
                      onClick={() => handleAction(claim._id, "Approved", isPremium)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(claim._id, "Rejected", isPremium)}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="bg-gradient-to-t from-slate-600 to-slate-400 h-full py-8 px-4">
      <h1 className="text-3xl font-extrabold text-white">Claims Management</h1>
      {renderTable(regularClaims, "Regular Claims", false)}
      {renderTable(premiumClaims, "Premium Claims", true)}
    </div>
  );
};

export default ClaimsManagement;