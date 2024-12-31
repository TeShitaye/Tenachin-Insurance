import React from "react";
import ServicePageTemplate from "./ServicePageTemplate";

const NetworkAccess = () => (
  <ServicePageTemplate
    title="Hospital Network Access"
    description="Access a wide range of trusted hospitals and healthcare providers in your insurance network."
    price={200}
    isPremium={false}
    highlights={["Wide hospital coverage", "Preferred partner hospitals", "Easy accessibility"]}
  />
);

export default NetworkAccess;
