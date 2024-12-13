import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from '../assets/backXYZ.jpg'

const AboutUsSummary = () => {
  return (
    <div className="bg-gradient-to-tl from-cyan-900 to-gray-400 py-12 px-6"
    style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "90vh",
      width: "100%",
    }}>
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-200 mb-6">About Us</h2>
        <p className="text-lg text-gray-200 mb-6">
          Welcome to HealthCare, your trusted partner in high-quality healthcare
          services. We are dedicated to making healthcare accessible,
          affordable, and tailored to meet your needs. Explore how we empower
          communities through comprehensive health insurance plans.
        </p>
        <div className="flex justify-center">
          <ul className="text-left text-gray-200 space-y-4">
            <li>
              <strong>Mission:</strong> To provide accessible, affordable, and
              comprehensive healthcare for all.
            </li>
            <li>
              <strong>Vision:</strong> Building healthier communities by
              fostering long-term wellness.
            </li>
            <li>
              <strong>Our Team:</strong> A dedicated group of professionals
              passionate about your health and well-being.
            </li>
          </ul>
        </div>
        <div className="mt-6">
        <Link
    to="/about"
    className="no-underline px-8 py-3 bg-blue-400 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-pink-700 hover:text-blue-400 transition-all duration-300"
  >
    Learn More
  </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSummary;
