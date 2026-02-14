import HeroSection from "../components/public/HeroSection.jsx";
import OverviewSection from "../components/public/OverviewSection.jsx";
import ConnectivitySection from "../components/public/ConnectivitySection.jsx";
import AboutSection from "../components/public/AboutSection.jsx";
import AmenitiesSection from "../components/public/Amenities.jsx";
import ConstructionSection from "../components/public/Construction.jsx";
import FaqSection from "../components/public/FAQ.jsx";
import { FaOtter } from "react-icons/fa";
import Footer from "../components/layout/Footer.jsx";

export default function HomePage() {
  return (
    <main className="w-full pt-25 overflow-x-hidden">
      <HeroSection />
      <div className="pt-15 pb-10 w-full flex flex-col gap-3 px-8 md:px-10 lg:px-20">
        <OverviewSection />
        <ConnectivitySection />
        <AmenitiesSection />
        <AboutSection />
        <ConstructionSection />
        <FaqSection />
      </div>
      <Footer />
    </main>
  );
}
