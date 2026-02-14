import { useEffect, useState } from "react";
import API from "../../api/axios";
import { FaChevronDown } from "react-icons/fa";

export default function FaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
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
    return <div className="w-full py-20 text-center">Loading FAQs...</div>;
  }

  if (!faqs.length) return null;

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="w-full py-20">
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
              className="w-full flex justify-between items-center px-6 py-4 text-left"
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
    </section>
  );
}
