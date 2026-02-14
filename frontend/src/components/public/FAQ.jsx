import { useEffect, useState } from "react";
import API from "../../api/axios";
import { FaChevronDown } from "react-icons/fa";
import SectionLoader from "../common/SectionLoader";
import { motion } from "framer-motion";

export default function FaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const res = await API.get("/faqs");
        if (res.data) setFaqs(res.data);
      } catch {
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFaqs();
  }, []);

  if (loading) {
    return <SectionLoader text="Loading FAQs..." />;
  }

  if (!faqs || !faqs.length) {
    return;
  }

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ amount: 0.25, once: true }}
      id="faq"
      className="w-full py-20"
    >
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 mt-4">
          Everything you need to know before making a decision.
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, index) => (
          <div
            key={faq._id}
            className="border border-gray-200 rounded-lg shadow-sm"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left cursor-pointer"
            >
              <span className="text-lg font-semibold">{faq.question}</span>

              <FaChevronDown
                className={`transition-transform duration-300 ${
                  activeIndex === index
                    ? "rotate-180 text-yellow-400"
                    : "text-gray-500"
                }`}
              />
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                activeIndex === index ? "max-h-96 px-6 pb-6" : "max-h-0"
              }`}
            >
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
