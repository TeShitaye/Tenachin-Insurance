import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion for animations
import { FaFileInvoice, FaAmbulance, FaStethoscope } from 'react-icons/fa'; // Importing relevant icons

const ServiceSummary = () => {
  const featuredServices = [
    {
      id: "claims-management",
      title: "Claims Management",
      description: "File and track claims easily and efficiently.",
      link: "/claims-management",
      icon: <FaFileInvoice className="text-4xl text-blue-500" />,
    },
    {
      id: "emergency-assistance",
      title: "Emergency Assistance",
      description: "24/7 support for medical emergencies.",
      link: "/emergency-assistance",
      icon: <FaAmbulance className="text-4xl text-red-500" />,
    },
    {
      id: "telemedicine-services",
      title: "Telemedicine Services",
      description: "Connect with doctors online anytime.",
      link: "/telemedicine",
      icon: <FaStethoscope className="text-4xl text-green-500" />,
    },
  ];

  return (
    <div className="p-8 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6">Service Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredServices.map((service) => (
          <motion.div
            key={service.id}
            className="relative p-4 bg-white rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.05, // 5% growth on hover
              boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.3)", // Box shadow effect on hover
              zIndex: 10, // Bring hovered card to the top
            }}
          >
            {/* Icon */}
            <div className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-lg">
              {service.icon}
            </div>

            {/* Card Content */}
            <h3 className="text-xl font-bold mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <Link to={service.link}>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                View More
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/services">
          <button className="px-6 py-3 bg-yellow-600 text-white rounded hover:bg-yellow-700">
            View All Services
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceSummary;
