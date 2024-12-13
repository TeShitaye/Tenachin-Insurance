import React from "react";
import backgroundImage from "../assets/Amarach333.jpg";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div
      className="pt-32 pb-32 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "140vh",
        width: "100%",
      }}
    >
      {/* Content Section */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col justify-center items-center text-center text-white">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-4">
            Get Started with Health Coverage
          </h1>
          <p className="text-2xl mb-6">
            Join us to unlock full access to your personalized health insurance
            tools and resources. <br /> <br />
          </p>

          {/* Register Button */}
          <Link
            to="/register"
            className="no-underline px-8 py-3 bg-blue-600 text-white hover:bg-pink-700 hover:scale-125 transition duration-200 ease-in-out  text-lg font-semibold rounded-3xl "
          >
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
