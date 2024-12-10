import React from "react";
import diagnosticTestsImg from "../assets/diagnostic-tests.jpg"; // Add your own image

const DiagnosticTests = () => {
  return (
    <div
      className="bg-cover bg-center text-white p-20 flex flex-col justify-center items-center min-h-screen"
      style={{
        backgroundImage: `url(${diagnosticTestsImg})`,
      }}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Diagnostic Tests and Lab Work</h1>
      <p className="text-lg md:text-xl max-w-2xl mb-4">
        We offer a wide range of diagnostic tests, including blood work, imaging (X-rays, CT scans, and MRIs), and much more.
      </p>
      <p className="text-lg md:text-xl max-w-2xl">
        Accurate and timely results are provided to help with effective diagnosis and treatment planning.
      </p>
    </div>
  );
};

export default DiagnosticTests;
