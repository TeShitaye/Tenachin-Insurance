import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaUsers,
  FaFileAlt,
  FaChartBar,
  FaCogs,
  FaBars,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar Container */}
      <div
        className={`bg-gradient-to-t from-blue-800 to-blue-600 text-white ${
          isOpen ? "w-64" : "w-16"
        } min-h-screen transition-width duration-300 shadow-lg`}
      >
        <button
          onClick={toggleSidebar}
          className="text-yellow-300 hover:text-yellow-500 p-3 focus:outline-none"
        >
          <FaBars size={24} />
        </button>

        {/* Logo */}
        <div
          className={`flex items-center justify-center ${
            isOpen ? "h-20" : "h-16"
          }`}
        >
          <h1
            className={`text-2xl font-bold text-yellow-300 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            Admin
          </h1>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6">
          <ul className="space-y-4">
            <li>
              <NavLink
                to="/admin/dashboard"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 ${
                    isActive ? "bg-blue-700" : "hover:bg-blue-700"
                  } rounded-md transition duration-300`
                }
              >
                <FaTachometerAlt size={20} />
                <span className={`${isOpen ? "block" : "hidden"} text-sm font-semibold`}>
                  Dashboard
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 ${
                    isActive ? "bg-blue-700" : "hover:bg-blue-700"
                  } rounded-md transition duration-300`
                }
              >
                <FaUsers size={20} />
                <span className={`${isOpen ? "block" : "hidden"} text-sm font-semibold`}>
                  Users
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/claims"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 ${
                    isActive ? "bg-blue-700" : "hover:bg-blue-700"
                  } rounded-md transition duration-300`
                }
              >
                <FaFileAlt size={20} />
                <span className={`${isOpen ? "block" : "hidden"} text-sm font-semibold`}>
                  Claims
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/reports"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 ${
                    isActive ? "bg-blue-700" : "hover:bg-blue-700"
                  } rounded-md transition duration-300`
                }
              >
                <FaChartBar size={20} />
                <span className={`${isOpen ? "block" : "hidden"} text-sm font-semibold`}>
                  Reports
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/settings"
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 ${
                    isActive ? "bg-blue-700" : "hover:bg-blue-700"
                  } rounded-md transition duration-300`
                }
              >
                <FaCogs size={20} />
                <span className={`${isOpen ? "block" : "hidden"} text-sm font-semibold`}>
                  Settings
                </span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Content Area */}
    </div>
  );
};

export default Sidebar;
