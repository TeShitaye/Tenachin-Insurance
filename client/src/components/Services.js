import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import backImage from "../assets/admin1.jpg";
import docMan from '../assets/docMan.png';
import claim from '../assets/claims.png';
import emergency from '../assets/emergency-care.jpg';
import custSuppo from '../assets/customer_support.jpg';
import telemed from '../assets/telemedicine.jpg';
import { FaHeartbeat, FaFileAlt, FaAmbulance, FaLaptopMedical, FaRegFileAlt, FaPhoneAlt } from 'react-icons/fa'; // Importing icons for the services
import headerImg from '../assets/back12.jpg'
import hosp from '../assets/hospNet.png'
import preAproval from '../assets/policies.jpg'
import wellnes from '../assets/chronic.jpg'
import manage from '../assets/manag.jpeg'
export const Services = () => {
  const services = [
    {
      id: "network-access",
      title: "Hospital Network Access",
      description: "Access a wide network of trusted hospitals and healthcare providers.",
      link: "/hospital-network",
      icon: <FaHeartbeat className="text-4xl text-green-500" />,
      Image: hosp,
    },
    {
      id: "claims-management",
      title: "Claims Management",
      description: "Easily file and track claims for medical expenses and treatments.",
      link: "/claims-management",
      icon: <FaFileAlt className="text-4xl text-blue-500" />,
      Image: claim
    },
    {
      id: "pre-authorization",
      title: "Pre-Authorization Support",
      description: "Get pre-approval for treatments and procedures without hassle.",
      link: "/pre-authorization",
      icon: <FaRegFileAlt className="text-4xl text-orange-500" />,
      Image: preAproval,
    },
    {
      id: "document-management",
      title: "Document Management",
      description: "Securely share and manage your insurance and hospital documents.",
      link: "/document-management",
      icon: <FaFileAlt className="text-4xl text-purple-600" />,
      Image: docMan
    },
    {
      id: "emergency-assistance",
      title: "Emergency Assistance",
      description: "Round-the-clock support for medical emergencies.",
      link: "/emergency-assistance",
      icon: <FaAmbulance className="text-4xl text-red-600" />,
      Image: emergency
    },
    {
      id: "wellness-benefits",
      title: "Wellness Benefits",
      description: "Stay healthy with wellness programs and preventive care discounts.",
      link: "/wellness-benefits",
      icon: <FaHeartbeat className="text-4xl text-green-400" />,
      Image: wellnes
    },
    {
      id: "telemedicine-services",
      title: "Telemedicine Services",
      description: "Connect with doctors online from the comfort of your home.",
      link: "/telemedicine",
      icon: <FaLaptopMedical className="text-4xl text-teal-500" />,
      Image: telemed
    },
    {
      id: "customer-support",
      title: "Customer Support",
      description: "24/7 assistance for all your insurance and healthcare queries.",
      link: "/customer-support",
      icon: <FaPhoneAlt className="text-4xl text-yellow-500" />,
      Image: custSuppo
    },
    {
      id: "policy-management",
      title: "Policy Management Tools",
      description: "Easily renew, upgrade, or modify your insurance policy online.",
      link: "/policy-management",
      icon: <FaFileAlt className="text-4xl text-indigo-500" />,
      Image: manage
    },
  ];


  return (
    <div
      className="relative text-white"
      style={{
        backgroundImage: `url(${backImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "200vh",
      }}
    >
      <img src={headerImg} alt="" className="top-0 w-full h-64 brightness-100" />
      <div className="relative z-10 px-6 py-20">
        <h1 className="text-5xl font-extrabold text-center mb-8 animate__animated animate__fadeIn animate__delay-1s">
          Our Services
        </h1>
        <p className="text-lg text-center mb-12 animate__animated animate__fadeIn animate__delay-2s">
          Explore the services we provide to connect you with quality healthcare.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.id}
              className="bg-white text-black shadow-lg p-6 border rounded-3xl h-96 relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 0.92, // Increased scale to 1.25 for 25% growth
                boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.3)", // Increased shadow effect for hover
                zIndex: 10, // Bring the hovered card to the top of others
              }}
            >
              {/* Icon */}
              <div className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-lg">
                {service.icon}
              </div>
              {/* Image */}
              {service.Image && (
                <img src={service.Image} alt={service.title} className="w-full h-40 mx-auto rounded-2xl object-cover mb-4" />
              )}
              <h2 className="text-xl font-bold text-center mb-2">{service.title}</h2>
              <p className="text-center text-gray-700 mb-2">{service.description}</p>
              <Link to={service.link}>
                <button className="font-medium text-lg w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl hover:opacity-80 transition-all duration-300">
                  Learn More
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
