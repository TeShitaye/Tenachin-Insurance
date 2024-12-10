import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 shadow rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-blue-600 mb-2">Users</h2>
          <p className="text-gray-600">Manage all registered users</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-green-600 mb-2">Claims</h2>
          <p className="text-gray-600">View and approve user claims</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-yellow-600 mb-2">Services</h2>
          <p className="text-gray-600">Track and manage services</p>
        </div>
        <div className="bg-white p-6 shadow rounded-lg text-center">
          <h2 className="text-2xl font-semibold text-purple-600 mb-2">Reports</h2>
          <p className="text-gray-600">Generate detailed reports</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
