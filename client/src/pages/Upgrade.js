import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const UpgradePage = () => {
  const navigate = useNavigate();

  const handleUpgrade = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("/users/upgrade", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/premium");
    } catch (error) {
      console.error("Error upgrading to premium:", error);
    }
  };

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-blue-500">Upgrade to Premium</h1>
      <p className="mt-5 text-lg">Get exclusive access and enhanced services.</p>
      <Link to="/register?premium=true">
  <button
    type="button"
    className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-200"
  >
    Upgrade Now
  </button>
</Link>

    </div>
  );
};

export default UpgradePage;
