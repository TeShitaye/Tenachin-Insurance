import React from "react";
// import backgroundImage from "../assets/dashboard.jpg"; // Background image
import teamImage from "../assets/background3.jpg"; // Team image
import topImg from '../assets/aboutUs_Cover.png'

const AboutUs = () => {
  return (
    
    <div
      className="bg-cover bg-center min-h-screen "
      /* style={{
        backgroundImage: `url(${backgroundImage})`,
      }} */
    >
      <img src={topImg} alt="" className="w-full brightness-75"/>
         
      {/* Main content container with gradient background overlay */}
      <div className="bg-gradient-to-t from-black via-black to-transparent min-h-screen py-12 px-4 sm:px-10">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-transparent text-white text-center mb-8">
          About Us
        </h1>

        {/* About Us Section */}
        <section className="text-white">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-white leading-relaxed mb-8">
              Welcome to HealthCare, where we provide high-quality healthcare services designed to meet your needs.
              Our team is dedicated to delivering compassionate, expert care to ensure that you and your loved ones are
              well taken care of. With a range of services and coverage options, we strive to make healthcare accessible,
              affordable, and convenient for everyone.
            </p>

            <p className="text-lg text-white leading-relaxed mb-8">
              At HealthCare, we understand the importance of having reliable health coverage. Whether it's emergency
              care, doctor appointments, or surgical procedures, we provide comprehensive policies to support your health
              and well-being. Our goal is to ensure that you receive the best care possible when you need it the most.
            </p>

            <h2 className="text-3xl font-semibold text-white mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-white leading-relaxed mb-8">
              Our mission is to provide comprehensive, accessible, and affordable healthcare to all our members. We aim
              to be a leader in the healthcare industry by offering innovative services and solutions that put the needs of
              our patients first.
            </p>

            <h2 className="text-3xl font-semibold text-white mb-6 text-center">
              Our Vision
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed mb-8">
              To create a healthier community by ensuring that everyone has access to quality healthcare services. We
              envision a world where healthcare is not only about treatment but about fostering long-term wellness.
            </p>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="text-white mt-20">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-semibold text-white mb-6">Meet Our Team</h2>
            <p className="text-lg text-gray-200 leading-relaxed mb-6">
              Our team is comprised of dedicated professionals who are passionate about providing the best possible
              healthcare services. We work together to ensure that every patient receives the highest level of care.
            </p>
            <img
              src={teamImage}
              alt="Our team"
              className="w-full h-auto rounded-xl shadow-xl transform transition-transform duration-300 hover:scale-105"
            />
          </div>
        </section>

        {/* Contact Section (Optional) */}
        <section className="bg-black py-12">
          <div className="max-w-5xl mx-auto text-center text-white">
            <h3 className="text-3xl font-bold mb-4">Get In Touch With Us</h3>
            <p className="mb-6 text-lg">
              For any questions or more information about our services, feel free to reach out. We are here to help!
            </p>
            <a
              href="mailto:contact@healthcare.com"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition-all duration-300"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
