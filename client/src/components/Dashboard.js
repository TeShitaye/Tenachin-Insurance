import React from "react";
import backgroundImage from "../assets/dashboard.jpg"
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div
    class="flex flex-col justify-center items-center text-center p-5 relative"

      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
        <div className="absolute inset-0 bg-black opacity-35"></div>

{/* Content goes here */}
<div className="relative z-10">
  {/* Your dashboard content */}
  <div className="dashboard-overlay flex flex-col justify-center items-center text-center h-full px-4 sm:px-10">
        {/* Main Content */}
        <div className="dashboard-header mb-8">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Get Started with Health Coverage
          </h1>
          <p className="text-xl text-white mb-6">
            Join us to unlock full access to your personalized health insurance tools and resources. <br/> <br/>
          </p>

<Link to="/register" className="no-underline px-8 py-3 bg-white text-blue-400 hover:bg-blue-400 hover:text-white text-lg font-semibold rounded-3xl transition-all shadow-lg duration-300">  Register Now</Link>

        
        </div>
      </div>
</div>
      
    </div>
  );
};

export default Dashboard;