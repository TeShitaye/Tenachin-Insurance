import React from "react";

const Card = ({ title, description, icon, onClick, bgColor = "bg-white" }) => {
  return (
    <div
      className={`${bgColor} p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer`}
      onClick={onClick}
    >
      {/* Icon */}
      {icon && (
        <div className="text-4xl text-blue-600 mb-4 flex justify-center items-center">
          {icon}
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default Card;
