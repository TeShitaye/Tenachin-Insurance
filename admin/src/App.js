import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

// Import Pages
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import ClaimsManagement from "./pages/Claim";
import Services from "./pages/Service";
import Reports from "./pages/Report";
import Settings from "./pages/Setting";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <Router>
      <div className={`flex ${isAuthenticated ? "" : "justify-center items-center min-h-screen"}`}>
        {/* Sidebar and Navbar will only render when authenticated */}
        {isAuthenticated && <Sidebar />}
        <div className={`flex-1 ${isAuthenticated ? "flex flex-col" : ""}`}>
          {isAuthenticated && <Navbar />}
          <div className={isAuthenticated ? "flex-1 bg-gray-100" : ""}>
            <Routes>
              {/* Public Route */}
              <Route path="/" element={<AdminLogin />} />

              {/* Protected Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/claims"
                element={
                  <ProtectedRoute>
                    <ClaimsManagement />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/services"
                element={
                  <ProtectedRoute>
                    <Services />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/reports"
                element={
                  <ProtectedRoute>
                    <Reports />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/settings"
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          {/* Footer only visible when authenticated */}
          {isAuthenticated && <Footer />}
        </div>
      </div>
    </Router>
  );
};

export default App;
