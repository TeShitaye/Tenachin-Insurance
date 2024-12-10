import React from "react";
import claim_header from "../assets/claim_header.png";

const claimsData = [
  {
    id: 1,
    service: "Emergency Care",
    policyTitle: "Emergency Care",
    claimStatus: "Pending",
    adminApproval: false,
  },
  {
    id: 2,
    service: "Doctor Appointments",
    policyTitle: "Doctor Appointments",
    claimStatus: "Approved",
    adminApproval: true,
  },
  {
    id: 3,
    service: "Surgical Procedures",
    policyTitle: "Surgical Procedures",
    claimStatus: "Denied",
    adminApproval: false,
  },
  {
    id: 4,
    service: "Inpatient Services",
    policyTitle: "Inpatient Services",
    claimStatus: "Pending",
    adminApproval: false,
  },
  {
    id: 5,
    service: "Diagnostic Tests and Lab Work",
    policyTitle: "Diagnostic Tests and Lab Work",
    claimStatus: "Approved",
    adminApproval: true,
  },
];

// Helper function to calculate statistics
const calculateStats = (data) => {
  const totalClaims = data.length;
  const approved = data.filter((claim) => claim.claimStatus === "Approved").length;
  const pending = data.filter((claim) => claim.claimStatus === "Pending").length;
  const denied = data.filter((claim) => claim.claimStatus === "Denied").length;

  return { totalClaims, approved, pending, denied };
};

const ClaimsReport = () => {
  const stats = calculateStats(claimsData);

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-400 bg-cover bg-center min-h-screen pt-0 pb-24">
      <img src={claim_header} alt="Claim Header" className="w-full brightness-75" />

      <h1 className="text-4xl font-extrabold text-white mb-6 text-center pt-12">
        Claims Report
      </h1>
      <p className="text-2xl text-white mb-10 text-center">
        Overview of claims processed through our system.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-8">
        {/* Total Claims */}
        <div className="bg-white shadow-md rounded-lg p-6 text-center">
          <h2 className="text-3xl font-bold text-blue-700">{stats.totalClaims}</h2>
          <p className="text-lg text-gray-600">Total Claims</p>
        </div>

        {/* Approved Claims */}
        <div className="bg-green-50 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-3xl font-bold text-green-700">{stats.approved}</h2>
          <p className="text-lg text-gray-600">Approved Claims</p>
        </div>

        {/* Pending Claims */}
        <div className="bg-yellow-50 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-3xl font-bold text-yellow-700">{stats.pending}</h2>
          <p className="text-lg text-gray-600">Pending Claims</p>
        </div>

        {/* Denied Claims */}
        <div className="bg-red-50 shadow-md rounded-lg p-6 text-center">
          <h2 className="text-3xl font-bold text-red-700">{stats.denied}</h2>
          <p className="text-lg text-gray-600">Denied Claims</p>
        </div>
      </div>

      <div className="mt-10 px-8">
        <h2 className="text-2xl font-bold text-white mb-4">Claims Breakdown</h2>
        <div className="space-y-6">
          {claimsData.map((claim) => (
            <div
              key={claim.id}
              className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600"
            >
              <h3 className="text-xl font-bold text-blue-700">{claim.service}</h3>
              <p className="text-gray-700 mt-2">Policy: {claim.policyTitle}</p>
              <p className="text-lg font-medium text-gray-800">
                Claim Status:{" "}
                <span
                  className={`${
                    claim.claimStatus === "Approved"
                      ? "text-green-600"
                      : claim.claimStatus === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {claim.claimStatus}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClaimsReport;
