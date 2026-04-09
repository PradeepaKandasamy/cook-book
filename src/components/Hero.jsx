import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const ref = useRef();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  // Scroll-based parallax for heading
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const headingScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.09]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.2 } }
  };
  const item = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 160 } }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/recipes?search=${searchTerm}`);
    }
  };

  return (
    <section
      ref={ref}
      className="relative h-screen flex flex-col items-center justify-center px-6 md:px-10 overflow-hidden"
    >
      {/* Background Food Image with smooth infinite zoom effect */}
      <motion.img
        src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=1600"
        alt="Food Background"
        initial={{ scale: 1.2, opacity: 0 }}
        animate={{ scale: [1.2, 1, 1.2], opacity: 1 }}
        transition={{ duration: 15, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className="absolute inset-0 w-full h-full object-cover -z-20"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/55 -z-10" />

      {/* Hero Content */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="max-w-3xl space-y-9 text-center drop-shadow-2xl text-white z-10"
      >
        {/* Heading */}
        <motion.h1
          variants={item}
          style={{ scale: headingScale }}
          whileHover={{ scale: 1.13, color: "#f99114" }}
          className="text-5xl md:text-7xl font-extrabold leading-tight"
        >
          <span className="bg-gradient-to-r from-orange-200 via-orange-400 to-yellow-200 bg-clip-text text-transparent">
            Discover
          </span>{" "}
          <span className="text-orange-400 animate-pulse">Delicious</span>{" "}
          Recipes 🍴
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={item}
          className="text-lg md:text-2xl font-medium text-orange-50"
        >
          Find your favorite dishes and cook with love.{" "}
          <br className="hidden md:inline" />
          Healthy, tasty and quick recipes just for you.
        </motion.p>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSearch}
          variants={item}
          className="flex items-center bg-white/90 rounded-full shadow-xl p-2 w-full max-w-md mx-auto"
        >
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search recipes…"
            className="flex-1 px-4 py-2 rounded-full outline-none text-gray-700 transition"
          />
          <motion.button
            type="submit"
            whileHover={{
              scale: 1.15,
              backgroundColor: "#ff9900",
              boxShadow: "0 0 18px #f99114"
            }}
            whileTap={{ scale: 0.9, rotate: -7 }}
            transition={{ type: "spring", stiffness: 270 }}
            className="bg-orange-500 text-white px-6 py-2 rounded-full font-semibold hover:bg-orange-600 shadow-lg transition"
          >
            Search
          </motion.button>
        </motion.form>
      </motion.div>
    </section>
  );
}
