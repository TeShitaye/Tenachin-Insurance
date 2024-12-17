import React, { useState } from "react";
import { Link, useNavigate,  } from "react-router-dom";
import axios from "axios";
import backImage from "./premium.jpeg";


const PremiumRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/premium-register', {
        username: name,
        email: email,
        phone:phone,
        password: password
      });
      alert(response.data.message); // Success message
      navigate("/premium-login");
    } catch (error) {
      alert(error.response?.data?.message || "Error registering premium user");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen pt-16"
    style={{
      backgroundImage: `url(${backImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "140vh",
    }}>
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-yellow-500">Premium User Registration</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium mb-2">Full Name</label>
            <input type="text" id="name" value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} className="w-full p-2 border bg-gray-50 border-gray-300 rounded-md" required />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium mb-2">Email Address</label>
            <input type="email" id="email" value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border bg-gray-50 border-gray-300 rounded-md" required />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-lg font-medium mb-2">Phone Nunber</label>
            <input type="text" id="phone" value={phone} placeholder="phone" onChange={(e) => setPhone(e.target.value)} className="w-full p-2 border bg-gray-50 border-gray-300 rounded-md" required />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-medium mb-2 ">Password</label>
            <input type="password" id="password" value={password} placeholder="pasword" onChange={(e) => setPassword(e.target.value)} className="w-full p-2  bg-gray-50 border border-gray-300 rounded-md" required />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-lg font-medium mb-2">Confirm Password</label>
            <input type="password" id="confirmPassword" value={confirmPassword} placeholder="password" onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 bg-gray-50 border border-gray-300 rounded-md" required />
          </div>

          <button type="submit" className="w-full px-4 py-2 text-lg text-white bg-green-500 rounded-3xl font-bold hover:bg-green-600 transition duration-200 ease-in-out">Register</button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-lg">
            Already have an account?{" "}
            <Link to="/premium-login" className="text-blue-500"><strong>Login Here</strong></Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PremiumRegister;
