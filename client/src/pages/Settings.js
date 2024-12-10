import React, { useState } from "react";
import axios from "axios";

const Settings = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = () => {
    // API call to update profile
    axios
      .put("http://localhost:5000/update-profile", formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setSuccessMessage("Profile updated successfully.");
        setErrorMessage("");
      })
      .catch(() => {
        setErrorMessage("Failed to update profile.");
        setSuccessMessage("");
      });
  };

  const handleChangePassword = () => {
    // API call to change password
    axios
      .put(
        "http://localhost:5000/change-password",
        { currentPassword: formData.currentPassword, newPassword: formData.newPassword },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then((response) => {
        setSuccessMessage("Password changed successfully.");
        setErrorMessage("");
        setFormData((prev) => ({ ...prev, currentPassword: "", newPassword: "" }));
      })
      .catch(() => {
        setErrorMessage("Failed to change password.");
        setSuccessMessage("");
      });
  };

  return (
    <div className="flex h-screen pt-16">
      {/* Sidebar */}
      <aside className="bg-blue-500 text-white w-64 p-4 flex flex-col">
        <div className="text-2xl font-bold mb-8">Dashboard</div>
        <nav className="space-y-4">
          <a href="/profile" className="block px-4 py-2 rounded hover:bg-gray-700 no-underline text-white">
            Profile
          </a>
          <a href="/settings" className="block px-4 py-2 rounded hover:bg-gray-700 no-underline text-white">
            Settings
          </a>
          <a href="/login" className="block px-4 py-2 rounded hover:bg-gray-700 no-underline text-white">
            Logout
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-400 overflow-y-auto">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
        </header>

        {/* Profile Update Section */}
        <section className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Update Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            onClick={handleUpdateProfile}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Update Profile
          </button>
        </section>

        {/* Password Change Section */}
        <section className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Change Password</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
          </div>
          <button
            onClick={handleChangePassword}
            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Change Password
          </button>
        </section>

        {/* Feedback Section */}
        {successMessage && (
          <p className="mt-4 text-green-600 font-semibold">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-4 text-red-600 font-semibold">{errorMessage}</p>
        )}
      </main>
    </div>
  );
};

export default Settings;
