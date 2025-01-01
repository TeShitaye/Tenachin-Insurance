import React from "react";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Magen</h1>
          <p className="text-sm">
            Simplifying your health insurance documentation, one step at a time.
          </p>
        </div>
        <div>
          <h4 className="no-underline text-lg font-semibold text-white mb-2">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <a href="/register" className="hover:text-yellow-500 transition no-underline">
                Profile
              </a>
            </li>
            <li>
              <a href="/policies" className="hover:text-yellow-500 transition no-underline">
                Read Policy
              </a>
            </li>
            <li>
              <a href="/claims" className="hover:text-yellow-500 transition no-underline">
                Claims
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-yellow-500 transition no-underline">
                About Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold text-white mb-2">Contact Us</h4>
          <p className="text-sm mb-2">📞 +251-941208343</p>
          <p className="text-sm mb-4">📧 support@tenachin.com</p>
          <div className="flex space-x-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="text-2xl hover:text-yellow-500 transition" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="text-2xl hover:text-yellow-500 transition" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedin className="text-2xl hover:text-yellow-500 transition" />
            </a>
          </div>
        </div>
      </div>
      <div className="text-center text-sm mt-4 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Magen. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
