import { useEffect, useState } from "react";
import API from "../../api/axios";
import SectionLoader from "../common/SectionLoader";
import { motion } from "framer-motion";

export default function AboutSection() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      setLoading(true);
      try {
        const res = await API.get("/sections/about");

        if (res.data) {
          setData(res.data);
        }
      } catch {
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  if (loading) {
    return <SectionLoader text="Loading About..." />;
  }

  if (!data) {
    return;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ amount: 0.2, once: true }}
      id="about"
      className="w-full flex flex-col md:flex-row items-center justify-between py-4"
    >
      <div className="w-full md:max-w-[45%]">
        <img
          className="w-full h-auto object-cover rounded-md"
          src={data?.image?.url}
          alt={data?.title}
        />
      </div>

      <div className="w-full flex flex-col items-center md:max-w-[45%]">
        <h1 className="text-4xl md:text-6xl font-bold font-serif tracking-wide mb-4">
          {data.title}
        </h1>

        <p className="text-md md:text-lg mb-4 text-gray-200">
          {data.description}
        </p>
      </div>
    </motion.section>
  );
}
