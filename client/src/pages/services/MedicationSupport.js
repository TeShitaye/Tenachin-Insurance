import React from "react";
import ServicePageTemplate from "./ServicePageTemplate";

const MedicationSupport = () => (
  <ServicePageTemplate
    title="Medication Support"
    description="Get discounts and support for regular medication costs."
    price={150}
    isPremium={false}
    highlights={["Discounted prescriptions", "Pharmacy network access", "Medication tracking"]}
  />
);

export default MedicationSupport;
