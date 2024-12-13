import React from "react";
import claim_header from "../assets/back12.jpg";
import backgroundImage from '../assets/admin.jpg'
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
    <div className="transparent bg-gradient-to-r from-gray-800 to-gray-400 bg-cover bg-center min-h-screen pt-0 pb-24"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "280vh",
      width: "100%",
    
    }}>
      <img src={claim_header} alt="Claim Header" className="w-full brightness-60 h-64" />

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
          <p className="text-lg text-blue-600">Denied Claims</p>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="mt-16 px-8 space-y-12">
        <div className="transparent p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-white mb-4">Advantages to Claim</h2>
          <p className="text-lg text-white leading-relaxed">
            Making claims on your insurance policy comes with several benefits. By doing so, you
            ensure financial stability in times of unexpected medical or other emergencies.
            Our streamlined claims processing provides hassle-free experiences for policyholders.
          </p>
          <p className="text-lg text-white leading-relaxed">
            Additionally, you gain peace of mind knowing that you are covered for significant
            expenses, letting you focus on your recovery or essential tasks instead of worrying
            about finances.
          </p>
        </div>

        <div className="bg-transparent p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-white mb-4">Procedures to Claim</h2>
          <p className="text-lg text-white leading-relaxed mb-4">
            Filing a claim is a straightforward process designed to minimize stress. Here are the
            steps you need to follow:
          </p>
          <ol className="list-decimal list-inside text-white text-lg space-y-2">
            <li>Gather all required documents such as medical bills or receipts.</li>
            <li>Submit a claim application through our portal or in person.</li>
            <li>Undergo a brief review process by our claims team.</li>
            <li>Receive notifications on the status and outcome of your claim.</li>
          </ol>
        </div>

        <div className="transparent p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-extrabold text-white mb-4">Types of Claims</h2>
          <p className="text-lg text-white leading-relaxed mb-4">
            Insurance policies cover a broad range of claims tailored to meet specific needs.
            Here are the main types:
          </p>
          <ul className="list-disc list-inside text-white text-lg space-y-2">
            <li><strong>Medical Claims:</strong> Covers hospital, doctor, and surgical expenses.</li>
            <li><strong>Travel Claims:</strong> Addresses incidents like flight delays or lost luggage.</li>
            <li><strong>Property Claims:</strong> Provides coverage for damage to insured properties.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClaimsReport;
