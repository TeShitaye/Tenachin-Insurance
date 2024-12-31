import React from "react";
// import backgroundImage from "../assets/dashboard.jpg"; // Background image
import teamImage from "../assets/background3.jpg"; // Team image
import topImg from '../assets/magen3.jpg'
import back3 from '../assets/admin1.jpg'

const AboutUs = () => {
  return (
    
    <div
      className="bg-cover bg-center min-h-screen "
      style={{
        backgroundImage: `url(${back3})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "200vh",
      }}
    >
      <img src={topImg} alt="" className="w-full h-80 brightness-100"/>
         
      {/* Main content container with gradient background overlay */}
      <div className="min-h-screen py-12 px-4 sm:px-10 w-full">
        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-transparent text-white text-center mb-8">
          About Us
        </h1>

        {/* About Us Section */}
        <section className="text-white ">
          <div className="max-w-4xl mx-auto ">
            <div className="bg-transparent shadow-2xl rounded-w-full px-32 py-8">
            <p className="text-lg text-white leading-relaxed mb-8 ">
            <strong>Welcome to Magen Health Insurance</strong> <br/>
At Magen Health Insurance, we are committed to empowering individuals and families
 by ensuring access to quality healthcare without the financial burden. Our service provides comprehensive coverage of hospital service fees, 
helping our users focus on their health and recovery without worrying about the cost.
With a user-friendly platform and partnerships with leading hospitals, 
Tenachin Health Insurance strives to simplify health insurance while delivering exceptional value. Whether you're seeking coverage for routine care or unexpected medical expenses,
 we are here to support you every step of the way.
            </p>
            <p className="text-lg text-white leading-relaxed mb-8">
            < strong>Why Choose Magen Health Insurance?</strong> <br/>
            <ul class="list-disc">
            <li>Transparent and reliable health insurance plans.</li>
            <li>Broad network of partnered hospitals across the country.</li>
            <li>Dedicated support to help you navigate your healthcare needs.</li>
            </ul>
            </p>
            </div>
          <div className="bg-transparent shadow-2xl rounded-t-full px-32 py-2">
          <h2 className="text-3xl font-semibold text-white mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-white leading-relaxed mb-8">
            < strong>Why Choose Magen Health Insurance?</strong> <br/>
            <ul class="list-disc">
            <li>Offering innovative solutions to reduce the financial barriers to healthcare.</li>
            <li>Building strong relationships with hospitals to ensure seamless service delivery.</li>
            <li>Promoting health awareness and empowering communities to prioritize their well-being</li>
            </ul>
            </p>
          </div>
          <div className="bg-transparent shadow-2xl rounded-b-full px-32 py-4 w-full">
          <h2 className="text-3xl font-semibold text-white mb-6 text-center">
              Our Vision
            </h2>
            <p className="text-lg text-gray-200 leading-relaxed mb-8 bx-8">
            To become the foremost health insurance provider in Ethiopia, transforming the way people access healthcare by 
            ensuring financial security and peace of mind.
             By fostering trust, strengthening partnerships with healthcare providers, and leveraging technology, we aim to set a benchmark for excellence in
             health insurance services and contribute to the nation’s overall health and prosperity.
            </p>
          </div>
          
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
        <section className="bg-transparent py-12">
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
