import { useEffect, useState } from "react";
import API from "../../api/axios.js";

export default function HeroSection() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await API.get("/hero");

        if (res.data) {
          setHero(res.data);
        }
      } catch (err) {
        setHero(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHero();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!hero) {
    toast.error("Hero Section not available", { id: "hero-section-error" });
    return;
  }

  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between py-4 px-8 md:px-10 lg:px-20">
      <div className="w-full md:max-w-[45%]">
        <img
          className="w-full object-cover h-auto rounded-md"
          src={hero?.image?.url}
          alt={hero?.title}
        />
      </div>

      <div className="w-full flex flex-col items-center md:max-w-[45%]">
        <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-wide mb-4">
          {hero.title}
        </h1>

        <h2 className="text-xl md:text-2xl mb-4 text-yellow-400">
          {hero.subtitle}
        </h2>

        <p className="text-md md:text-lg mb-4 text-gray-200 text-center md:text-left">
          {hero.description}
        </p>

        <a
          href="#amenities"
          className="bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 transition duration-300"
        >
          Explore More
        </a>
      </div>
    </header>
  );
}
