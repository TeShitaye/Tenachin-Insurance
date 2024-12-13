import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Import framer-motion for animations
import { FaFileInvoice, FaAmbulance, FaStethoscope } from 'react-icons/fa'; // Importing relevant icons
//import backgroundImage from '../assets/admin.jpg'


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
    <div className="p-8 bg-transparent rounded-lg shadow-xl ">
    {/*  style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "110vh",
        width: "100%",
      }} */ }
    <h2 className="text-4xl font-extrabold mb-6 text-center text-white">Our Services</h2>
<hr className="w-64 h-1 mx-auto bg-red-500 border-0 rounded-full mt-4 mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-col">
        {featuredServices.map((service) => (
          <motion.div
            key={service.id}
            className="relative h-64 p-4 text-white  bg-indigo-800 rounded-lg shadow-lg hover:scale-125 transition-transform duration-300 ease-in-out"
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
            <div className="px-32 py-0">
              {service.icon}
            </div>

            {/* Card Content */}
            <h3 className="text-xl font-bold mb-2 pt-6 px-12">{service.title}</h3>
            <p className="text-white mb-4 px-12">{service.description}</p>
            <Link to={service.link}>
              <button className="w-64 py-2 px-2 mx-12 bg-blue-600 text-white rounded hover:bg-blue-700">
                View More
              </button>
            </Link>
          </motion.div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link to="/services">
          <button className="no-underline px-8 py-3 bg-blue-400 text-white text-lg font-semibold rounded-lg shadow-lg hover:bg-pink-700 hover:text-blue-400 hover: transition-all duration-300">
            View All Services
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceSummary;
