import { useEffect, useState } from "react";
import API from "../../api/axios";

export default function HeroSection() {
  const [hero, setHero] = useState(null);

  useEffect(() => {
    // const fetchHero = async () => {
    //   try {
    //     const res = await API.get("/hero");
    //     setHero(res.data);
    //   } catch (err) {
    //     console.log(err);
    //   }
    // };

    // fetchHero();
    setHero({
      _id: "664c1234abcde12345678901",
      title: "INFINITY",
      subtitle: "Luxury Living Redefined",
      description:
        "Experience premium lifestyle apartments designed with modern architecture, world-class amenities, and seamless connectivity in the heart of the city.",
      image: {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        public_id: "RealEstate_Project/hero_sample",
      },
      createdAt: "2025-06-01T10:30:00.000Z",
      updatedAt: "2025-06-01T10:30:00.000Z",
    });
  }, []);

  if (!hero) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <header className="w-full flex flex-col md:flex-row items-center justify-between py-4 px-8 md:px-10 lg:px-20">
      <div className="w-full md:max-w-[45%]">
        <img
          className="w-full object-cover h-auto rounded-md"
          src={hero?.image?.url}
          alt=""
        />
      </div>

      <div className="w-full flex flex-col items-center md:max-w-[45%]">
        <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-wide mb-4">
          {hero.title}
        </h1>
        <h2 className="text-xl md:text-2xl mb-4 text-yellow-400">
          {hero.subtitle}
        </h2>
        <p className="text-md md:text-lg mb-4 text-gray-200">
          {hero.description}
        </p>
        <a
          href="#amenties"
          className="bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 transition duration-300"
        >
          Explore More
        </a>
      </div>
    </header>
  );
}
