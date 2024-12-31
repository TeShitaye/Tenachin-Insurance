import React from "react";
import ServicePageTemplate from "./ServicePageTemplate";

const ClaimsManagement = () => {
  return (
    <ServicePageTemplate
      title="Claims Management"
      description="Easily file and track insurance claims with our hassle-free claims management system. Get quick approvals and updates."
      price={100}
      isPremium={false}
      highlights={[
        "Seamless claim filing process",
        "Track claims status in real-time",
        "Fast approvals for eligible cases",
        "Dedicated customer support for queries",
      ]}
    />
  );
};

export default ClaimsManagement;
