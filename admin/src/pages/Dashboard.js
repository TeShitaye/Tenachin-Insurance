import React from "react";
import { Link } from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const dashboardItems = [
    {
      id: "users",
      title: "Users",
      description: "Manage all registered users",
      color: "text-blue-600",
      link: "/admin/users",
    },
    {
      id: "claims",
      title: "Claims",
      description: "View and approve user claims",
      color: "text-green-600",
      link: "/admin/claims",
    },
    {
      id: "services",
      title: "Services",
      description: "Track and manage services",
      color: "text-yellow-600",
      link: "/admin/services",
    },
    {
      id: "reports",
      title: "Reports",
      description: "Generate detailed reports",
      color: "text-purple-600",
      link: "/admin/reports",
    },
  ];

  const pieData = {
    labels: ['Approved', 'Pending', 'Rejected'],
    datasets: [
      {
        label: 'Claims Status',
        data: [10, 20, 5], // Example data
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>

      {/* Summary Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-3xl font-bold text-blue-600">150</h2>
          <p className="text-gray-600">Total Users</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 text-center">
          <h2 className="text-3xl font-bold text-green-600">35</h2>
          <p className="text-gray-600">Active Claims</p>
        </div>
      </div>

      {/* Dashboard Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {dashboardItems.map((item) => (
          <Link
            key={item.id}
            to={item.link}
            className="transform transition-transform duration-300 hover:scale-105"
          >
            <div className="bg-white p-6 shadow rounded-lg text-center hover:shadow-lg">
              <h2 className={`text-2xl font-semibold ${item.color} mb-2`}>{item.title}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* Pie Chart Section */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Claims Overview</h2>
        <Pie data={pieData} />
      </div>
    </div>
  );
};

export default Dashboard;
