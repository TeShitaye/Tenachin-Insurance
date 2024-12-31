import React from "react";
import ServicePageTemplate from "./ServicePageTemplate";

const Telemedicine = () => {
  return (
    <ServicePageTemplate
      title="Telemedicine Services"
      description="Connect with qualified doctors online from the comfort of your home. Telemedicine offers convenient and affordable access to healthcare professionals via video consultation."
      price={150}
      isPremium={true}
      highlights={[
        "24/7 virtual consultations",
        "Instant appointment scheduling",
        "Affordable and accessible healthcare",
        "Secure and private video calls",
      ]}
    />
  );
};

export default Telemedicine;
