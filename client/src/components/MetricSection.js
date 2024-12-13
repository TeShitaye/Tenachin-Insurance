import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaUsers, FaClipboardList, FaShieldAlt, FaCalendarAlt } from "react-icons/fa";
//import backgroundImage from '../assets/option10.jpeg'

const MetricsSection = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.3, // Trigger when 30% of the section is visible
    triggerOnce: true, // Trigger only once
  });

  const metrics = [
    { icon: <FaUsers size={40} className="text-blue-600" />, label: "Users of Service", value: 1200 },
    { icon: <FaClipboardList size={40} className="text-green-600" />, label: "Total Claims", value: 1500 },
    { icon: <FaCalendarAlt size={40} className="text-yellow-600" />, label: "Years of Experience", value: 10 },
    { icon: <FaShieldAlt size={40} className="text-purple-600" />, label: "Policies & Services", value: 500 },
  ];

  return (
    <div ref={sectionRef} className="py-9 rounded-lg shadow-xl"
    /* style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "50vh",
      width: "100%",
    }} */ >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 cursor-pointer">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex flex-col items-center bg-indigo-800 p-6 rounded-lg shadow-lg transform transition-transform hover:scale-105"
            >
              <div className="mb-4">{metric.icon}</div>
              <h3 className="text-4xl font-bold text-white">
                {sectionInView ? (
                  <CountUp end={metric.value} duration={2} />
                ) : (
                  0
                )}
              </h3>
              <p className="mt-2 text-white text-lg">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetricsSection;
