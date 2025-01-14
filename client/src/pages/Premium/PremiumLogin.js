import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import backImage from "./premium.jpeg";

const PremiumLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/premium-login', {
        email: email,
        password: password
      });
      alert(response.data.message); // Success message
      localStorage.setItem("token", response.data.token);
       // Save JWT token
       // Redirect to Premium Profile page
      navigate('/premium-profile'); // Navigate after successful login
    } catch (error) {
      alert(error.response?.data?.message || "Error logging in");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100"
    style={{
      backgroundImage: `url(${backImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "120vh",
    }}>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-500">Premium User Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">Email Address</label>
            <input type="email" id="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border bg-gray-50 border-gray-300 rounded-md" required />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium mb-2">Password</label>
            <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 bg-gray-50 border border-blue-800 rounded-md" required />
          </div>

          <button type="submit" className="w-full px-4 py-2 text-lg text-white bg-blue-500 rounded-3xl font-bold hover:bg-blue-600 transition duration-200 ease-in-out">Login</button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-lg">
            Don't have an account?{" "}
            <Link to="/premium-register" className="text-blue-500 "><strong>Register Here</strong></Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumLogin;
