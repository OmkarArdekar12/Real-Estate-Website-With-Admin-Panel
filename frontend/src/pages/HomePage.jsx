import HeroSection from "../components/public/HeroSection.jsx";
import OverviewSection from "../components/public/OverviewSection.jsx";
import ConnectivitySection from "../components/public/ConnectivitySection.jsx";
import AboutSection from "../components/public/AboutSection.jsx";
import AmenitiesSection from "../components/public/Amenities.jsx";
import ConstructionSection from "../components/public/Construction.jsx";

export default function HomePage() {
  return (
    <main className="w-full pt-16 pb-10 overflow-x-hidden px-8 md:px-10 lg:px-20">
      <HeroSection />
      <div className="pt-15 w-full flex flex-col gap-3">
        <OverviewSection />
        <ConnectivitySection />
        <AmenitiesSection />
        <AboutSection />
        <ConstructionSection />
      </div>
    </main>
  );
}
