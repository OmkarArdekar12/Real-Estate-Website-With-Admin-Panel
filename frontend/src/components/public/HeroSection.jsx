import { useEffect, useState } from "react";
import API from "../../api/axios.js";
import toast from "react-hot-toast";
import SectionLoader from "../common/SectionLoader.jsx";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [hero, setHero] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHero = async () => {
      setLoading(true);
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
    return <SectionLoader />;
  }

  if (!hero) {
    return;
  }

  return (
    <motion.header
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ amount: 0.25, once: true }}
      id="hero"
      className="w-full flex flex-col md:flex-row items-center justify-between py-4 px-8 md:px-10 lg:px-20"
    >
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
    </motion.header>
  );
}
