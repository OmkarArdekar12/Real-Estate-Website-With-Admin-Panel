import { useEffect, useState } from "react";
import API from "../../api/axios";
import SectionLoader from "../common/SectionLoader";
import { motion } from "framer-motion";

export default function ConstructionSection() {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpdates = async () => {
      setLoading(true);
      try {
        const res = await API.get("/construction");

        if (res.data) {
          setUpdates(res.data);
        }
      } catch (err) {
        setUpdates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUpdates();
  }, []);

  if (loading) {
    return <SectionLoader text="Loading Construction Updates..." />;
  }

  if (!updates || !updates.length) {
    return null;
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ amount: 0.25, once: true }}
      id="construction"
      className="w-full flex flex-col gap-3 py-20"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold">
          Construction Updates
        </h1>
        <p className="text-gray-600 mt-4">
          Track the progress of your future home.
        </p>
      </div>

      <div className="relative border-l-2 flex flex-col gap-2 border-yellow-400 pl-4 space-y-16">
        {updates.map((item) => (
          <div key={item._id} className="flex flex-col gap-1 relative">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
              <h2 className="text-2xl font-semibold mb-3">{item.label}</h2>
            </div>

            <p className="text-gray-600 mb-2">{item.description}</p>

            <div className="w-full bg-gray-200 h-3 rounded-full mb-4">
              <div
                className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                style={{ width: `${item.progress || 0}%` }}
              ></div>
            </div>

            {item.image?.url && (
              <img
                src={item.image.url}
                alt={item.label}
                className="w-full md:w-[60%] rounded-md shadow-md object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </motion.section>
  );
}
