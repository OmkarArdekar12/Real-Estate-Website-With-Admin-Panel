import React from "react";
import OverviewSection from "./OverviewSection.jsx";
import ConnectivitySection from "./ConnectivitySection.jsx";
import AboutSection from "./AboutSection.jsx";

const Sections = () => {
  return (
    <div className="w-full flex flex-col items-center justify-between py-4">
      <OverviewSection />
      <ConnectivitySection />
      <AboutSection />
    </div>
  );
};

export default Sections;
