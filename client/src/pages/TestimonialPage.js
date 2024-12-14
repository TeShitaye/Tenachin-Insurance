import React from "react";
import emergency from '../assets/emergency.jpg'
import chronic from '../assets/chronic.jpg'
//import backgr from '../assets/admin.jpg'

const TestimonialsAndCaseStudies = () => {
  const testimonials = [
    {
      name: "Sarah J.",
      location: "Addis Ababa, Ethiopia",
      image: "https://via.placeholder.com/150",
      feedback:
        "Thanks to this health insurance plan, I received quick access to specialists for my treatment. The claim process was smooth and stress-free!",
    },
    {
      name: "Abebe K.",
      location: "Dire Dawa, Ethiopia",
      image: "https://via.placeholder.com/150",
      feedback:
        "After a sudden medical emergency, the 24/7 support and cashless hospitalization saved my family from financial stress. Highly recommend!",
    },
    {
      name: "Hanna T.",
      location: "Bahir Dar, Ethiopia",
      image: "https://via.placeholder.com/150",
      feedback:
        "The preventive care services included in my plan encouraged me to go for regular check-ups. It’s reassuring to know I’m covered for every stage of my health journey.",
    },
  ];

  const caseStudies = [
    {
      title: "Emergency Surgery Coverage",
      description:
        "John, a farmer from a rural area, suffered an accident and needed immediate surgery. Our health insurance plan covered 90% of the expenses, ensuring he received top-notch care without financial strain.",
      image: emergency,
    },
    {
      title: "Chronic Disease Management",
      description:
        "Mary, diagnosed with diabetes, benefited from our comprehensive chronic care package, including regular check-ups, medication coverage, and diet counseling. Her health improved significantly while reducing out-of-pocket expenses.",
      image: chronic,
    },
  ];

  return (
    <div className=" pt-20 pb-16 text-white  rounded-lg shadow-xl">
    {/*  style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "110vh",
        width: "100%",
      }} */ }
      <h2 className="text-4xl font-extrabold text-center text-white mb-8">
        What Our Customers Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-200 shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
          >
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="w-24 h-24 bg-transparent rounded-full mb-4"
            />
            <h3 className="text-xl font-semibold text-blue-700">
              {testimonial.name}
            </h3>
            <p className="text-sm text-black mb-4">{testimonial.location}</p>
            <p className="text-black ">{testimonial.feedback}</p>
          </div>
        ))}
      </div>

      <h2 className="text-4xl font-extrabold text-center text-white my-12">
        Real-Life Case Studies
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-6">
        {caseStudies.map((caseStudy, index) => (
          <div
            key={index}
            className="bg-gray-200 shadow-lg rounded-lg p-6 flex flex-col items-center text-center"
          >
            <img
              src={caseStudy.image}
              alt={caseStudy.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <h3 className="text-2xl font-bold text-blue-700">
              {caseStudy.title}
            </h3>
            <p className="text-lg text-black  mt-2">{caseStudy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsAndCaseStudies;
