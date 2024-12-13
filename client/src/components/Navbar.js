import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from '../assets/main_logo.png'

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu toggle
  const location = useLocation();

  // Scroll behavior for hiding/showing navbar
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      setIsVisible(false); // Hide navbar on scroll down
    } else {
      setIsVisible(true); // Show navbar on scroll up
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
              className="w-18 h-18 md:w-40 md:h-40 object-contain transition-transform duration-200 hover:scale-105"
            />
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          {[ 
            { name: "Home", path: "/" },
            { name: "Profile", path: "/profile" },
            { name: "Policies", path: "/policies" },
            { name: "Claims", path: "/claims" },
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
          <Link
            to="/login"
            className="no-underline px-6 py-2 bg-white text-blue-400 hover:bg-blue-400 hover:text-white text-lg font-semibold rounded-3xl transition-all shadow-lg duration-300"
          >
            Login
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
            { name: "Profile", path: "/profile" },
            { name: "Policies", path: "/policies" },
            { name: "Claims", path: "/claims" },
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
