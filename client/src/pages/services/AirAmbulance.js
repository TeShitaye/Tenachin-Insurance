import React from "react";
import ServicePageTemplate from "./ServicePageTemplate";

const AirAmbulance = () => (
  <ServicePageTemplate
    title="Air Ambulance Services"
    description="Fast and safe medical air transport in critical situations."
    price={1000}
    isPremium={true}
    highlights={["Quick response times", "Critical care transport", "Global coverage"]}
  />
);

export default AirAmbulance;
