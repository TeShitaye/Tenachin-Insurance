import React from "react";
import { Link } from "react-router-dom";
//import backgroundImage from '../assets/backXYZ.jpg'

const AboutUsSummary = () => {
  return (
    <div className="bg-transparent shadow-2xl px-6 h-128 py-16">
    {/* style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "80vh",
      width: "100%",
    }}*/ }
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-gray-200 mb-6">About Us</h2>
        <p className="text-lg text-gray-200 mb-6">
        Welcome to Magem Health Insurance, where we transform healthcare accessibility in Ethiopia. <br/>
  Our mission is to bridge the gap between individuals and quality medical care by partnering with leading hospitals<br/>across the country. 
  We provide innovative and affordable health insurance plans that reduce financial barriers, ensuring<br/>our clients can focus on their health and well-being. 
  Explore how our dedicated team works tirelessly to empower families<br/>and communities by simplifying access to essential health services and fostering trust through reliable coverage.
        </p>
        <div className="mt-6">
        <Link
    to="/about">
    <button className="no-underline px-8 py-3 bg-blue-400 text-white text-lg font-semibold 
    rounded-2xl shadow-lg hover:bg-pink-700 hover:text-blue-400 
    hover:scale-110 ease-in-out transition-all duration-300">    Learn More</button>
  </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutUsSummary;
