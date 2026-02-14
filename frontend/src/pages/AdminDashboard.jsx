import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import HeroForm from "../components/admin/HeroForm";
import OverviewForm from "../components/admin/OverviewForm";

const AdminDashboard = () => {
  return (
    <div className="w-full h-full pt-25 overflow-x-hidden">
      <HeroForm />
      <div className="pt-15 pb-10 w-full flex flex-col gap-3 px-8 md:px-10 lg:px-20">
        <OverviewForm />
        {/* <ConnectivitySection /> */}
        {/* <AmenitiesSection /> */}
        {/* <AboutSection /> */}
        {/* <ConstructionSection /> */}
        {/* <FaqSection /> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
