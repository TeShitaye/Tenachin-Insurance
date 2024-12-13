import React, { useState } from "react";
import policiesImg from '../assets/policy_header.png'

const policies = [
  {
    id: 1,
    title: "Emergency Care",
    description:
      "Coverage for emergency medical services, including ambulance transport and immediate hospital care.",
    payment:
      "Full coverage up to $5,000 per event; co-payment of 20% for costs above $5,000.",
    detailedInfo:
      "Emergency care policies cover emergency services such as ambulance transport, trauma care, and immediate hospital interventions. The full coverage ensures that patients have access to life-saving services without worrying about the costs associated with emergency situations.",
  },
  {
    id: 2,
    title: "Doctor Appointments",
    description:
      "Coverage for consultations with general practitioners and specialists within the network.",
    payment: "Co-payment of $10 per visit; fully covered for in-network doctors.",
    detailedInfo:
      "This policy allows policyholders to consult with any of our in-network healthcare providers, ensuring convenience and affordability for regular doctor visits. Specialist consultations are also fully covered within the network.",
  },
  {
    id: 3,
    title: "Surgical Procedures",
    description:
      "Includes pre-operative assessments, surgical procedures, and post-operative care.",
    payment: "Coverage up to 80% for in-network hospitals; patient pays 20% co-payment.",
    detailedInfo:
      "This policy covers a wide range of surgical procedures, ensuring that patients receive high-quality care throughout their surgery journey. Pre-surgical assessments and post-operative care are also included in the coverage.",
  },
  {
    id: 4,
    title: "Inpatient Services",
    description:
      "Covers hospital stays, including room charges, nursing care, and basic medical supplies.",
    payment: "Private room: 70% coverage; shared room: 90% coverage.",
    detailedInfo:
      "Inpatient services are crucial for extended medical care, such as post-surgery recovery or serious health conditions. The coverage includes private or shared rooms, as well as essential nursing and medical supplies.",
  },
  {
    id: 5,
    title: "Diagnostic Tests and Lab Work",
    description:
      "Includes blood tests, imaging (X-rays, MRIs, CT scans), and other diagnostic procedures.",
    payment: "Coverage up to $2,000 annually; co-payment of 15% for excess costs.",
    detailedInfo:
      "Our diagnostic testing policy ensures that policyholders have access to essential diagnostic tests, which are critical for the accurate diagnosis of various health conditions. Coverage includes lab work, imaging, and other necessary tests.",
  },
  {
    id: 6,
    title: "Maternity Services",
    description:
      "Coverage for prenatal care, delivery, and postnatal care at participating hospitals.",
    payment: "Coverage up to $3,500 per delivery; patient pays remaining costs.",
    detailedInfo:
      "Maternity services provide comprehensive coverage for prenatal care, childbirth, and postnatal care. The policy ensures that expectant mothers receive the best possible care throughout their pregnancy journey and delivery.",
  },
];

const Policies = () => {
  const [showDetails, setShowDetails] = useState(null);

  const toggleDetails = (id) => {
    if (showDetails === id) {
      setShowDetails(null); // Hide details if already showing
    } else {
      setShowDetails(id); // Show the details for the clicked policy
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-400 bg-cover bg-center min-h-screen pt-0 pb-24"
  >
    <img src={policiesImg} alt="" className="w-full"/>
      <h1 className="font-extrabold text-5xl text-white mb-4 text-center py-6">
        Our Policies
      </h1>
      <p className="text-xl text-gray-100 mb-10 text-center">
        Explore the comprehensive coverage our policies provide for your healthcare needs.
      </p>

      <div className="space-y-6 pd-6">
        {policies.map((policy) => (
          <article
            key={policy.id}
            className="bg-gray-600 w-5/6 rounded-lg shadow-md p-8 border-l-4 border border-blue-600 mx-12"
          >
            <header>
              <h2 className="text-2xl font-bold text-white">
                {policy.id}. {policy.title}
              </h2>
            </header>
            <p className="text-gray-100 mt-4">{policy.description}</p>

            <footer className="mt-4">
              <p className="text-green-200 font-large">{policy.payment}</p>
            </footer>

            {/* View More Button */}
            <button
              onClick={() => toggleDetails(policy.id)}
              className="mt-4 text-orange-500 hover:text-orange-900 text-1.5xl font-extrabold "
            >
              {showDetails === policy.id ? "Show Less" : "View More"}
            </button>

            {/* Detailed Information */}
            {showDetails === policy.id && (
              <div className="mt-4 text-gray-700">
                <p>{policy.detailedInfo}</p>
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

export default Policies;
