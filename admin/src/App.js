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
import Login from "./pages/Login";
import Modal from "./components/Modal";

const App = () => {
  return (  
    <Router>
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 bg-gray-100">
            <Routes>
              {/* Define Routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/users" element={<Users/>} />
              <Route path="/admin/claims" element={<ClaimsManagement />} />
              <Route path="/admin/services" element={<Services />} />
              <Route path="/admin/reports" element={<Reports/>} />
              <Route path="/admin/settings" element={<Settings />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/modal" element={<Modal/>} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
