import React, { useState } from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend);

const Reports = () => {
  const [filter, setFilter] = useState("");

  // Mock Data for Charts
  const barData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "Total Claims",
        data: [50, 60, 45, 70, 55],
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ["January", "February", "March", "April", "May"],
    datasets: [
      {
        label: "User Registrations",
        data: [20, 35, 25, 40, 30],
        fill: false,
        borderColor: "rgba(255, 99, 132, 1)",
        tension: 0.1,
      },
    ],
  };

  // Mock Table Data
  const reports = [
    { id: 1, title: "Claim Approval Rate", value: "75%", date: "2023-12-01" },
    { id: 2, title: "Total Users", value: "150", date: "2023-12-02" },
    { id: 3, title: "Pending Claims", value: "20", date: "2023-12-03" },
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Reports</h1>

      {/* Filter Section */}
      <div className="mb-6">
        <label htmlFor="filter" className="block text-gray-700 mb-2">Filter Reports:</label>
        <input
          type="text"
          id="filter"
          placeholder="Search by title or date"
          className="p-2 border rounded w-full"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Claims by Month</h2>
          <Bar data={barData} />
        </div>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">User Registrations</h2>
          <Line data={lineData} />
        </div>
      </div>

      {/* Reports Table */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Detailed Reports</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr>
              <th className="border border-gray-200 p-2">ID</th>
              <th className="border border-gray-200 p-2">Title</th>
              <th className="border border-gray-200 p-2">Value</th>
              <th className="border border-gray-200 p-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {reports
              .filter((report) =>
                report.title.toLowerCase().includes(filter.toLowerCase()) ||
                report.date.includes(filter)
              )
              .map((report) => (
                <tr key={report.id}>
                  <td className="border border-gray-200 p-2">{report.id}</td>
                  <td className="border border-gray-200 p-2">{report.title}</td>
                  <td className="border border-gray-200 p-2">{report.value}</td>
                  <td className="border border-gray-200 p-2">{report.date}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
