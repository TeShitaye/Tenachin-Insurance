import React from "react";
import doctorAppointmentImg from "../assets/doctor-appointment.jpg"; // Add your own image

const DoctorAppointments = () => {
  return (
    <div
      className="bg-cover bg-center text-white p-24 flex flex-col justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${doctorAppointmentImg})`,
      }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
        Doctor Appointments
      </h1>
      <p className="text-lg md:text-xl max-w-3xl text-center mb-4">
        Schedule consultations with our network of top-rated doctors, including general practitioners and specialists.
      </p>
      <p className="text-lg md:text-xl max-w-3xl text-center">
        Get personalized care and expert medical advice. We are committed to providing you with the best healthcare experience.
      </p>
    </div>
  );
};

export default DoctorAppointments;
