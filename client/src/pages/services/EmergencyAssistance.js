import React from "react";
import ServicePageTemplate from "./ServicePageTemplate";

const EmergencyAssistance = () => (
  <ServicePageTemplate
    title="Emergency Assistance"
    description="Get 24/7 emergency medical support when you need it most."
    price={300}
    isPremium={false}
    highlights={["Round-the-clock support", "Emergency transport", "Immediate care assistance"]}
  />
);

export default EmergencyAssistance;
