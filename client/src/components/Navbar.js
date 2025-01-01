import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from '../assets/Logo1234.png';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
  const location = useLocation();

  // Memoizing handleScroll to avoid unnecessary re-renders
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setIsVisible(false); // Hide navbar on scroll down
    } else {
      setIsVisible(true); // Show navbar on scroll up
    }
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // Adding handleScroll as a dependency

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 w-full h-16 shadow-lg transition-transform duration-300 z-50 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex container mx-auto px-4 sm:px-6 lg:px-8 justify-between items-center h-16">
        {/* Logo */}
        <div className="flex-wrap">
          <Link to="/">
            <img
              src={Logo}
              alt="Logo"
              className="hover:bg-white w-16 h-8 sm:w-24 sm:h-10 md:w-40 md:h-16 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {[ 
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
            { name: "Services", path: "/services" },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`no-underline text-lg font-bold tracking-wide transition-all duration-300 ${
                isActive(link.path)
                  ? "text-yellow-500 scale-105"
                  : "text-white hover:text-yellow-500 hover:scale-110"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Login Button */}
        <div className="hidden md:block">
          <Link to="/login">
              <button
              type="submit"
              className="mt-0 mx-20 w-1/2 px-2 py-1 text-lg text-blue-400 bg-white rounded-3xl font-bold
              hover:bg-blue-400 hover:text-pink-600 hover:scale-125 transition duration-200 ease-in-out 
              active:bg-white-100 active:text-blue-800 active:scale-95"
            >
            Login
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button (Hamburger) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col items-center mt-4 space-y-4 bg-gray-800 text-white p-4">
          {[ 
            { name: "Home", path: "/" },
            { name: "About Us", path: "/about" },
            { name: "Services", path: "/services" },
          ].map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)} // Close menu on link click
              className={`text-lg font-medium ${
                isActive(link.path)
                  ? "text-yellow-500"
                  : "text-white hover:text-yellow-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {/* Mobile Login Button */}
          <Link
            to="/login"
            onClick={() => setIsMenuOpen(false)} // Close menu on login click
            className="mt-4 px-6 py-2 bg-white text-blue-400 hover:bg-pink-600 text-lg font-semibold rounded-3xl transition-all shadow-lg duration-300"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
