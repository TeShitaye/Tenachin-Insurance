import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Magem from '../assets/magen3.jpg'
import backImage from "../assets/admin1.jpg";

import {
  //FaHeartbeat,
  FaFileAlt,
  FaAmbulance,
  FaLaptopMedical,
 // FaRegFileAlt,
  FaPhoneAlt,
  FaCrown,
  FaPlane,
  FaHospital,
  FaStethoscope,
  FaUserMd,
  FaDiagnoses,
  FaPills,
  FaBaby,
  FaCapsules,
  FaUserShield,
} from "react-icons/fa"; // Added more icons


export const Services = () => {
  const services = [
    // Regular Services
    {
      id: "network-access",
      title: "Hospital Network Access",
      description: "Access trusted hospitals within your network.",
      link: "/services/hospital-network",
      icon: <FaHospital className="text-4xl text-green-500" />,
      isPremium: false,
    },
    {
      id: "claims-management",
      title: "Claims Management",
      description: "File and track your insurance claims seamlessly.",
      link: "/services/claims-management",
      icon: <FaFileAlt className="text-4xl text-blue-500" />,
      isPremium: false,
    },
    {
      id: "emergency-assistance",
      title: "Emergency Assistance",
      description: "24/7 emergency support for medical needs.",
      link: "/services/emergency-assistance",
      icon: <FaAmbulance className="text-4xl text-red-600" />,
      isPremium: false,
    },
    {
      id: "routine-checkups",
      title: "Routine Checkups",
      description: "Standard checkups to monitor your health.",
      link: "/services/routine-checkups",
      icon: <FaStethoscope className="text-4xl text-gray-600" />,
      isPremium: false,
    },
    {
      id: "medication-support",
      title: "Prescribed Medications",
      description: "Coverage for basic prescribed medicines.",
      link: "/services/medication-support",
      icon: <FaPills className="text-4xl text-purple-600" />,
      isPremium: false,
    },
    {
      id: "minor-surgeries",
      title: "Minor Surgeries",
      description: "Coverage for minor hospital procedures.",
      link: "/services/minor-surgeries",
      icon: <FaUserMd className="text-4xl text-yellow-600" />,
      isPremium: false,
    },
    {
      id: "maternity-care",
      title: "Maternity Care",
      description: "Basic maternity and postnatal services.",
      link: "/services/maternity-care",
      icon: <FaBaby className="text-4xl text-pink-500" />,
      isPremium: false,
    },
    {
      id: "customer-support",
      title: "Customer Support",
      description: "24/7 assistance for insurance and queries.",
      link: "/services/customer-support",
      icon: <FaPhoneAlt className="text-4xl text-yellow-500" />,
      isPremium: false,
    },

    // Premium Services
    {
      id: "international-treatment",
      title: "International Treatment",
      description: "Get coverage for treatments abroad.",
      link: "/services/international-treatment",
      icon: <FaPlane className="text-4xl text-blue-700" />,
      isPremium: true,
    },
    {
      id: "private-rooms",
      title: "Private Room Access",
      description: "Private room coverage during hospitalization.",
      link: "/services/private-rooms",
      icon: <FaUserShield className="text-4xl text-gray-700" />,
      isPremium: true,
    },
    {
      id: "advanced-diagnostics",
      title: "Advanced Diagnostics",
      description: "Access MRI, PET scans, and more.",
      link: "/services/advanced-diagnostics",
      icon: <FaDiagnoses className="text-4xl text-teal-500" />,
      isPremium: true,
    },
    {
      id: "air-ambulance",
      title: "Air Ambulance Service",
      description: "Emergency air transport for critical cases.",
      link: "/services/air-ambulance",
      icon: <FaAmbulance className="text-4xl text-red-700" />,
      isPremium: true,
    },
    {
      id: "preventive-healthcare",
      title: "Preventive Healthcare",
      description: "Vaccines, health programs, and checkups.",
      link: "/services/preventive-healthcare",
      icon: <FaCapsules className="text-4xl text-green-600" />,
      isPremium: true,
    },
    {
      id: "telemedicine",
      title: "Telemedicine Services",
      description: "Unlimited virtual doctor consultations.",
      link: "/services/telemedicine",
      icon: <FaLaptopMedical className="text-4xl text-teal-700" />,
      isPremium: true,
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
      {/* Header Image */}
      <img src={Magem} alt="Header" className="top-0 w-full h-80 brightness-100" />
      <div className="bg-transparent relative z-10 px-6 py-20">
        {/* Page Heading */}
        <h1 className="text-5xl font-extrabold text-center mb-8">Our Services</h1>
        <p className="text-lg text-center mb-12">
          Explore the services we provide to connect you with quality healthcare.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16">
          {services.map((service) => (
            <Link to={service.link} key={service.id} className="no-underline block">
              <motion.div
                className="bg-white text-black shadow-lg p-6 border rounded-3xl h-64 relative overflow-hidden cursor-pointer hover:shadow-2xl transition-all"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                whileHover={{
                  scale: 0.95,
                  boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.3)",
                  zIndex: 10,
                }}
              >
                {/* Premium Badge */}
                {service.isPremium && (
                  <div className="absolute top-2 right-2 bg-yellow-400 text-white px-2 py-1 rounded-full flex items-center gap-1 text-sm font-semibold shadow-md">
                    <FaCrown className="text-yellow-800" /> Premium
                  </div>
                )}

                {/* Service Icon */}
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gray-100 rounded-full shadow-lg">
                    {service.icon}
                  </div>
                </div>

                {/* Service Content */}
                <h2 className="text-xl font-bold text-center mb-2">{service.title}</h2>
                <p className="text-center text-gray-700 mb-4">{service.description}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
