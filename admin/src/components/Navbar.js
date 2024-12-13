import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-wide text-yellow-300">
              Admin Panel
            </h1>
          </div>

          {/* Navbar Links (Desktop) */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/admin/dashboard"
              className={({ isActive }) =>
                `hover:text-yellow-300 transition duration-300 ${
                  isActive ? "text-yellow-300 underline" : ""
                }no-underline font-bold text-lg px-4`
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/admin/users"
              className={({ isActive }) =>
                `hover:text-yellow-300 transition duration-300 ${
                  isActive ? "text-yellow-300 underline" : ""
                }no-underline font-bold text-lg px-4`
              }
            >
              Users
            </NavLink>
            <NavLink
              to="/admin/claims"
              className={({ isActive }) =>
                `hover:text-yellow-300 transition duration-300 ${
                  isActive ? "text-yellow-300 underline" : ""
                } no-underline font-bold text-lg px-4`
              }
            >
              Claims
            </NavLink>
            <NavLink
              to="/admin/reports"
              className={({ isActive }) =>
                `hover:text-yellow-300 transition duration-300 ${
                  isActive ? "text-yellow-300 underline" : ""
                }no-underline font-bold text-lg px-4`
              }
            >
              Reports
            </NavLink>
          </div>

          {/* Right Section (Notifications & Profile) */}
          <div className="flex items-center space-x-4">
            {/* Notifications Icon */}
            <button className="relative text-yellow-300 hover:text-yellow-500">
              <FaBell className="text-xl" />
              <span className="absolute top-0 right-0 bg-red-500 text-xs rounded-full w-4 h-4 text-center text-white">
                5
              </span>
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center space-x-2 hover:text-yellow-300"
              >
                <FaUserCircle className="text-2xl" />
                <span>Admin</span>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg z-10">
                  <NavLink
                    to="/admin/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Settings
                  </NavLink>
                  <NavLink
                    to="/logout"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </NavLink>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-yellow-300 hover:text-yellow-500"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-700">
          <NavLink
            to="/admin/dashboard"
            className="block px-4 py-2 hover:bg-blue-600 text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/admin/users"
            className="block px-4 py-2 hover:bg-blue-600 text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Users
          </NavLink>
          <NavLink
            to="/admin/claims"
            className="block px-4 py-2 hover:bg-blue-600 text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Claims
          </NavLink>
          <NavLink
            to="/admin/reports"
            className="block px-4 py-2 hover:bg-blue-600 text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Reports
          </NavLink>
          <NavLink
            to="/admin/settings"
            className="block px-4 py-2 hover:bg-blue-600 text-white"
            onClick={() => setIsMenuOpen(false)}
          >
            Settings
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
