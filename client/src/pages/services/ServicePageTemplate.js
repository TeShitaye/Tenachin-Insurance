import React from "react";
import { FaCrown, FaCheckCircle } from "react-icons/fa"; // Icons for highlights
import { Link } from "react-router-dom";

const ServicePageTemplate = ({ title, description, price, isPremium, highlights }) => {
  return (
    <div className="min-h-screen bg-gray-500 py-20">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-8">
        {/* Service Title */}
        <h1 className="text-4xl font-bold text-center mb-4 text-blue-600">{title}</h1>
        {isPremium && (
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-2 bg-yellow-400 text-white px-3 py-1 rounded-full text-lg font-semibold shadow">
              <FaCrown className="text-yellow-800" /> Premium Service
            </span>
          </div>
        )}

        {/* Service Description */}
        <p className="text-lg text-gray-700 leading-relaxed mb-8">{description}</p>

        {/* Highlights */}
        <h2 className="text-2xl font-bold mb-4">Key Highlights:</h2>
        <ul className="list-none mb-8">
          {highlights.map((point, index) => (
            <li key={index} className="flex items-center gap-2 mb-2 text-gray-600">
              <FaCheckCircle className="text-green-500" /> {point}
            </li>
          ))}
        </ul>

        {/* Pricing */}
        <div className="bg-blue-50 p-6 rounded-lg shadow-inner mb-8">
          <h3 className="text-2xl font-semibold text-blue-600 mb-2">Pricing & Payment</h3>
          <p className="text-lg text-gray-700">
            Yearly Payment: <span className="font-bold text-green-600">${price}/year</span>
          </p>
          <p className="text-gray-500 mt-2">
            Flexible payment methods available (credit card, bank transfer, mobile banking).
          </p>
        </div>

        {/* Back to Services */}
        <div className="text-center">
          <Link
            to="/services"
            className="bg-blue-600 no-underline font-semibold text-white px-6 py-3 rounded-lg shadow-md hover:bg-pink-900 transition"
          >
            Back to Services
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicePageTemplate;
