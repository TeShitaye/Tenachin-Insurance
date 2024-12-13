import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand and Description */}
          <div className="flex flex-col items-start">
            <h1 className="text-2xl font-semibold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-400 text-sm font-light">
              Manage users, monitor claims, and oversee services with ease.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start">
            <h4 className="text-xl font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/admin/dashboard"
                  className="text-gray-400 hover:text-yellow-400 transition duration-300"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/admin/users"
                  className="text-gray-400 hover:text-yellow-400 transition duration-300"
                >
                  User Management
                </a>
              </li>
              <li>
                <a
                  href="/admin/claims"
                  className="text-gray-400 hover:text-yellow-400 transition duration-300"
                >
                  Claims
                </a>
              </li>
              <li>
                <a
                  href="/services"
                  className="text-gray-400 hover:text-yellow-400 transition duration-300"
                >
                  Services
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-start">
            <h4 className="text-xl font-semibold text-white mb-4">Contact Support</h4>
            <p className="text-gray-400 text-sm">📞 +251-941208343</p>
            <p className="text-gray-400 text-sm">📧 support@tenachin.com</p>

            {/* Social Links */}
            <div className="mt-4 flex space-x-4">
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-yellow-400 transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram size={24} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-yellow-400 transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter size={24} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-yellow-400 transition duration-300"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Admin Panel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
