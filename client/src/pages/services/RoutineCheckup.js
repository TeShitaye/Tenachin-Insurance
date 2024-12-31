import React from "react";
import ServicePageTemplate from "./ServicePageTemplate";

const RoutineCheckups = () => (
  <ServicePageTemplate
    title="Routine Checkups"
    description="Schedule routine medical checkups to stay on top of your health."
    price={120}
    isPremium={false}
    highlights={["Annual checkups", "Preventive care", "Comprehensive health screenings"]}
  />
);

export default RoutineCheckups;
