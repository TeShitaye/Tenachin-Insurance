import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from 'jwt-decode';

const PremiumProfile = () => {
  const [user, setUser] = useState(null); 
  const [claims, setClaims] = useState([]); 
  const [services, setServices] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } catch (err) {
        console.error('Token decoding failed', err);
        navigate('/login');
      }
    } else {
      navigate('/login');
    }

    axios
      .get("http://localhost:5000/premium-profile", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        if (response.data && response.data.user) {
          setUser(response.data.user);
          setClaims(response.data.claims || []);
          setServices(response.data.services || []);
        } else {
          alert("Failed to load profile. Please log in again.");
          navigate("/login");
        }
      })
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex h-screen pt-16">
      {/* Sidebar */}
      <aside className="bg-blue-500 text-white w-64 p-4 flex flex-col">
        <div className="text-2xl font-bold mb-8">Premium Dashboard</div>
        <nav className="space-y-4">
          <Link to="/premium-profile" className="block px-4 py-2 rounded hover:bg-gray-700 no-underline text-white">Profile</Link>
          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 rounded hover:bg-gray-700 text-white">
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-400 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome, {user?.username}</h1>
            <p className="text-gray-200">Manage your premium services and claims</p>
          </div>
          <img
            src={user?.profilePic || "/default-profile-pic.jpg"}
            alt="User Avatar"
            className="w-16 h-16 rounded-full border-2 border-gray-300"
          />
        </header>

        {/* User Information */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-800">User Information</h2>
            <div className="text-gray-600 mt-4 space-y-2">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Phone:</strong> {user?.phone}</p>
              <p><strong>Region:</strong> {user?.region || "N/A"}</p>
              <p><strong>Subscription Plan:</strong> {user?.subscriptionPlan || "Premium"}</p>
            </div>
          </div>

          {/* Subscribed Services */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-800">Subscribed Services</h2>
            <ul className="mt-4 list-disc list-inside text-gray-600">
              {services.length > 0 ? (
                services.map((service, index) => <li key={index}>{service}</li>)
              ) : (
                <p>No services subscribed yet.</p>
              )}
            </ul>
          </div>

          {/* Claims */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-800">Claim Status</h2>
            {claims.length > 0 ? (
              <div className="space-y-4 mt-4">
                {claims.map((claim, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-gray-600">{claim.service}</span>
                    <span className={`px-3 py-1 rounded-full text-white text-sm ${claim.status === "approved" ? "bg-green-500" : "bg-yellow-500"}`}>
                      {claim.status === "approved" ? "Approved" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 mt-4">No claims submitted yet.</p>
            )}
          </div>
        </section>

        {/* Request Claim Button */}
        <div className="text-center">
          <Link to="/premium-claim-form" className="font-semibold no-underline px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
            Request Priority Claim
          </Link>
        </div>
      </main>
    </div>
  );
};

export default PremiumProfile;
