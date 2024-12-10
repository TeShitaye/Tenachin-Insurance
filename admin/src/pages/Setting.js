import React from "react";

const Settings = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Admin Settings</h1>
      <form className="bg-white p-6 shadow rounded-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Change Password</label>
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded"
            placeholder="Enter new password"
          />
        </div>
        <button className="bg-green-500 text-white px-6 py-3 rounded">Save</button>
      </form>
    </div>
  );
};

export default Settings;
