import React from "react";
import emergencyCareImg from "../assets/emergency-care.jpg"; // Add your own image

const EmergencyCare = () => {
  return (
    <div
      className="bg-cover bg-center text-white p-24 flex flex-col justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${emergencyCareImg})`,
      }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
        Emergency Care Services
      </h1>
      <p className="text-lg md:text-xl max-w-3xl text-center mb-4">
        Our Emergency Care services provide immediate and professional medical assistance 24/7. This includes ambulance services, trauma care, and stabilization of critical conditions.
      </p>
      <p className="text-lg md:text-xl max-w-3xl text-center">
        Our team of skilled doctors and medical professionals ensures that you receive the best possible care during emergencies.
      </p>
    </div>
  );
};

export default EmergencyCare;
