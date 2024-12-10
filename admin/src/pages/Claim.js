import React from "react";

const Claims = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Manage Claims</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-bold text-gray-700 mb-2">Claim #12345</h2>
          <p className="text-gray-600">Status: Pending</p>
          <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Approve</button>
          <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded ml-2">Reject</button>
        </div>
      </div>
    </div>
  );
};

export default Claims;
