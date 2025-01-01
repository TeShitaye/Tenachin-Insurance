import React from "react";
import backgroundImage from "../assets/major.jpeg";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div
      className="relative py-2 bg-cover bg-center bg-no-repeat min-h-screen w-full"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Content Section */}
      <div className="absolute bottom-12 bg-transparent rounded-b-full shadow-2xl left-0 right-0 z-10 flex flex-col justify-center items-center text-center text-white px-4">
        <div className="mb-6 gap-4 max-w-2xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
            Get Started with Health Coverage
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl">
            Join us to unlock full access to your personalized health insurance
            tools and resources.
          </p>
          <Link to="/register">
            <button
              type="submit"
              className="mt-4 w-full sm:w-2/3 md:w-1/2 px-4 py-2 text-lg text-blue-400 bg-white rounded-3xl font-bold
              hover:bg-blue-400 hover:text-pink-600 hover:scale-105 transition duration-200 ease-in-out 
              active:bg-white active:text-blue-800 active:scale-95"
            >
              Register Now
            </button>
          </Link>
        </div>
      </div>

      {/* Premium Card */}
      <div
        className="absolute top-20 left-40 transform -translate-x-1/2 z-20 p-2 bg-gray-300 rounded-lg shadow-lg 
        w-40 sm:w-48 md:w-56 lg:w-64 xl:w-72 max-w-full flex flex-col items-center text-center space-y-2"
      >
        <span className="text-lg sm:text-lg text-yellow-500 font-bold">
          🌟 Premium
        </span>
        <p className="text-sm sm:text-base">
          Unlock premium features and benefits.
        </p>
        <Link to="/premium-login">
          <button
            type="button"
            className="w-full px-6 py-2 text-sm sm:text-base text-white bg-blue-500 rounded-3xl font-bold
            hover:bg-blue-600 transition duration-200 ease-in-out hover:scale-105"
          >
            Login
          </button>
        </Link>
        <Link to="/premium-register">
          <button
            type="button"
            className="w-full px-4 py-2 text-sm sm:text-base text-white bg-green-500 rounded-3xl font-bold
            hover:bg-green-600 transition duration-200 ease-in-out hover:scale-105"
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
