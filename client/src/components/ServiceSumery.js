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
    <div className="p-4 sm:p-8 bg-transparent rounded-lg shadow-xl">
      <h2 className="text-2xl sm:text-4xl font-extrabold mb-6 text-center text-white">Our Services</h2>
      <hr className="w-32 sm:w-64 h-1 mx-auto bg-red-500 border-0 rounded-full mt-4 mb-8" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {featuredServices.map((service) => (
          <motion.div
            key={service.id}
            className="relative h-48 sm:h-64 p-4 text-white bg-indigo-800 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            whileHover={{
              scale: 1.1, // Slightly increased scale on hover
              boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)", // Adjusted shadow effect on hover
              zIndex: 10, // Bring hovered card to the top
            }}
          >
            <div className="flex justify-center items-center mb-4">
              {service.icon}
            </div>

            <h3 className="text-lg sm:text-xl font-bold mb-2 text-center">{service.title}</h3>
            <p className="text-sm sm:text-base text-center mb-4">{service.description}</p>
            <div className="flex justify-center">
              <Link to={service.link}>
                <button className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300">
                  View More
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/services">
          <button className="px-4 py-3 bg-blue-400 text-white text-base sm:text-lg font-semibold rounded-lg shadow-lg hover:scale-105 hover:bg-pink-700 hover:text-blue-400 transition duration-300">
            View All Services
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceSummary;
