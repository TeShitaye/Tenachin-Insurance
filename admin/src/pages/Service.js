import React from "react";

const Services = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Manage Services</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold text-blue-600">Emergency Care</h2>
          <p className="text-gray-600">Details about the service</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold text-green-600">Lab Tests</h2>
          <p className="text-gray-600">Details about the service</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
