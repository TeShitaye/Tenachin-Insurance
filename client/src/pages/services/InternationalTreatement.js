import React from "react";
import ServicePageTemplate from "./ServicePageTemplate";

const InternationalTreatment = () => (
  <ServicePageTemplate
    title="International Treatment"
    description="Access healthcare services in hospitals outside your country."
    price={2000}
    isPremium={true}
    highlights={["Global hospital network", "Specialized treatments", "Travel support"]}
  />
);

export default InternationalTreatment;
