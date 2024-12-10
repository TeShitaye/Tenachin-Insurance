import React from "react";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 text-center">Admin Login</h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-bold mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border border-gray-300 rounded"
              placeholder="Enter your password"
            />
          </div>
          <button className="bg-blue-500 text-white px-6 py-3 rounded w-full">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
