import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import HeroForm from "../components/admin/HeroForm";
import OverviewForm from "../components/admin/OverviewForm";
import NearbyConnectivityForm from "../components/admin/NearbyConnectivityForm";
import AmenityForm from "../components/admin/AmenityForm";
import ConstructionUpdatesForm from "../components/admin/ConstructionUpdatesForm";
import FaqForm from "../components/admin/FaqForm";
import AboutForm from "../components/admin/AboutForm";
import Footer from "../components/layout/Footer";

const AdminDashboard = () => {
  return (
    <div className="w-full h-full pt-25 overflow-x-hidden">
      <HeroForm />
      <div className="pt-15 pb-14 w-full flex flex-col gap-20 px-8 md:px-10 lg:px-20">
        <OverviewForm />
        <NearbyConnectivityForm />
        <AmenityForm />
        <AboutForm />
        <ConstructionUpdatesForm />
        <FaqForm />
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
