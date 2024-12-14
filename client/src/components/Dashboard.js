import React from "react";
import backgroundImage from "../assets/Amarach333.jpg";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <div
      className="pt-64 pb-64 relative"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "150vh",
        width: "100%",
      }}
    >
      {/* Content Section */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex flex-col justify-center items-center text-center text-white">
        {/* Header Section */}
        <div className="mb-2">
          <h1 className="text-4xl font-extrabold mb-4">
            Get Started with Health Coverage
          </h1>
          <p className="text-2xl">
            Join us to unlock full access to your personalized health insurance
            tools and resources. <br /> <br />
          </p>

          {/* Register Button */}
          <Link to="/register">
            <button
              type="submit"
              className="mt-0 mx-20 w-1/6 px-2 py-2 text-lg text-blue-400 bg-white rounded-3xl font-bold
              hover:bg-blue-400 hover:text-pink-600 hover:scale-125 transition duration-200 ease-in-out 
              active:bg-white-100 active:text-blue-800 active:scale-95"
            >
              Register Now
            </button>
          </Link>
        </div>
        <div>
          <p className="text-2xl mb-6">
            Become a premium member to enjoy exclusive benefits.
          </p>
          <Link to="/upgrade">
            <button
              type="button"
              className="mx-20 w-1/3 px-2 py-2 text-lg text-white bg-green-500 rounded-3xl font-bold
    hover:bg-green-600 hover:scale-125 transition duration-200 ease-in-out"
            >
              Upgrade to Premium
            </button>
          </Link>
        </div>
      </div>

      {/* Premium Card in the Top-Right Corner */}
      <div className="w-60 h-60 absolute top-20 right-2 z-20 p-2 bg-white rounded-lg shadow-lg">
        <div className=" items-center">
          {/* Premium Icon */}
          <div className="mr-3">
            <span className="text-2xl text-yellow-500">🌟<strong>Premium</strong> </span>
          </div>
          {/* Premium Registration Button */}
          <div>
            <p className="text-lg font-normal">Unlock premium features and benefits</p>
            <Link to="/premium-login">
              <button
                type="button"
                className="w-full px-2 py-2 text-lg text-white bg-blue-500 rounded-3xl font-semibold
                    hover:bg-blue-600 transition duration-200 ease-in-out"
              >
                Login as Premium
              </button>
            </Link>
            <div className="mt-3 text-center">
              <Link to="/premium-register">
                <button
                  type="button"
                  className="w-full px-2 py-2 text-lg text-white bg-green-500 rounded-3xl font-bold
                      hover:bg-green-600 transition duration-200 ease-in-out"
                >
                  Register for Premium
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
