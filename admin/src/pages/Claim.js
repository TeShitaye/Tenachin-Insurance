import React, { useEffect, useState } from "react";
import axios from "axios";

const ClaimsManagement = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await axios.get("http://localhost:5000/claims");
        setClaims(response.data);
      } catch (err) {
        console.error("Error fetching claims:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, []);

  const handleAction = async (claimId, action) => {
    try {
      // Update claim status
      await axios.put(`http://localhost:5000/claims/${claimId}`, { status: action });

      // Notify user's profile about the update
      await axios.put(`http://localhost:5000/claims/user-profile/${claimId}`, { status: action });

      // Update the local state
      setClaims((prev) =>
        prev.map((claim) =>
          claim._id === claimId ? { ...claim, status: action } : claim
        )
      );

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

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Claims Management</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Claim ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left">User</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Hospital</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Policy</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Payment Method</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr key={claim._id} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{claim._id}</td>
              <td className="border border-gray-300 px-4 py-2">{claim.fullName}</td>
              <td className="border border-gray-300 px-4 py-2">{claim.hospital}</td>
              <td className="border border-gray-300 px-4 py-2">{claim.policy}</td>
              <td className="border border-gray-300 px-4 py-2">{claim.paymentMethod}</td>
              <td
                className={`border border-gray-300 px-4 py-2 font-medium ${
                  claim.status === "Approved"
                    ? "text-green-600"
                    : claim.status === "Rejected"
                    ? "text-red-600"
                    : "text-yellow-600"
                }`}
              >
                {claim.status}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {claim.status === "Pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAction(claim._id, "Approved")}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(claim._id, "Rejected")}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
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
};

export default ClaimsManagement;
