import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-8 text-center bg-gray-50">
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-7xl md:text-9xl font-bold font-serif text-yellow-400"
      >
        404
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-2xl md:text-4xl font-semibold mt-6"
      >
        Page Not Found
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-gray-600 mt-4 max-w-xl"
      >
        The page you are looking for doesn’t exist or has been moved. Let’s get
        you back to something beautiful.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <Link
          to="/"
          className="inline-block mt-8 bg-yellow-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-yellow-500 transition duration-300"
        >
          Back to Home
        </Link>
      </motion.div>
    </section>
  );
}
