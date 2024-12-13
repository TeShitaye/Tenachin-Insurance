import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null); // To hold the user data
  const [claims, setClaims] = useState([]); // To hold claim statuses
  const [services, setServices] = useState([]); // To hold user services
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        if (response.data && response.data.user) {
          setUser(response.data.user);
          setClaims(response.data.claims || []); // Ensure claims are updated
          setServices(response.data.services || []);
        } else {
          alert("Failed to load profile. Please log in again.");
          navigate("/login");
        }
      })
      .catch(() => navigate("/login"))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleClaimRequest = () => {
    if (!user) return;

    axios
      .post(
        "http://localhost:5000/claim-request",
        { userId: user.id },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then(() => alert("Claim request sent to admin."))
      .catch(() => alert("Error submitting claim request."));
  };

  const handleSettings = () => {
    // Redirect to a settings page
    navigate("/settings");
  };

  const handleLogout = () => {
    // Clear token and redirect to login
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <div className="flex h-screen pt-16">
      {/* Sidebar */}
      <aside className="bg-blue-500 text-white w-64 p-4 flex flex-col">
        <div className="text-2xl font-bold mb-8">Dashboard</div>
        <nav className="space-y-4">
          <a href="/profile" className="block px-4 py-2 rounded hover:bg-gray-700 no-underline text-white">
            Profile
          </a>
          <button
            onClick={handleSettings}
            className="block w-full text-left px-4 py-2 rounded hover:bg-gray-700 text-white"
          >
            Settings
          </button>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 rounded hover:bg-gray-700 text-white"
          >
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
            <p className="text-gray-200">Manage your profile and claims</p>
          </div>
          <img
            src={user?.profilePic || "/default-profile-pic.jpg"}
            alt="User Avatar"
            className="w-16 h-16 rounded-full border-2 border-gray-300"
          />
        </header>

        {/* User Details */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-xl font-bold text-gray-800">User Information</h2>
            <div className="text-gray-600 mt-4 space-y-2">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Phone:</strong> {user?.phone}</p>
              <p><strong>Region:</strong> {user?.region || "N/A"}</p>
              <p><strong>Zone:</strong> {user?.zone || "N/A"}</p>
              <p><strong>Woreda:</strong> {user?.woreda || "N/A"}</p>
              <p><strong>Kebele:</strong> {user?.kebele || "N/A"}</p>
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
                {claims
                  .filter((claim) => claim.status === "approved")
                  .map((claim, index) => (
                    <div key={index} className="flex justify-between">
                      <span className="text-gray-600">{claim.service}</span>
                      <span
                        className="px-3 py-1 rounded-full text-white text-sm bg-green-500"
                      >
                        Approved
                      </span>
                    </div>
                  ))}
                {claims.filter((claim) => claim.status !== "approved").length === 0 && (
                  <p className="text-gray-600">No approved claims yet.</p>
                )}
              </div>
            ) : (
              <p className="text-gray-600 mt-4">No claims submitted yet.</p>
            )}
          </div>
        </section>

        {/* Request Claim Button */}
        <div className="text-center">
          <button
            onClick={handleClaimRequest}
          >
            <Link to="/claimform " className="font-semibold no-underline px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
              Request Claim to Admin
            </Link>
          </button>
        </div>
      </main>
    </div>
  );
};

export default Profile;