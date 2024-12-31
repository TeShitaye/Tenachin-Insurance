import React from "react";
import ServicePageTemplate from "./ServicePageTemplate";

const MaternityCare = () => (
  <ServicePageTemplate
    title="Maternity Care"
    description="Comprehensive maternity care and delivery coverage."
    price={500}
    isPremium={false}
    highlights={["Pre and postnatal care", "Delivery support", "Specialist consultations"]}
  />
);

export default MaternityCare;
