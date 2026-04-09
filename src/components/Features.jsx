import { motion } from "framer-motion";
import { FaClock, FaLeaf, FaVideo } from "react-icons/fa";

const features = [
  {
    icon: <FaClock className="text-orange-500 w-10 h-10" />,
    title: "Quick Recipes",
    description: "Cook delicious meals in under 30 minutes with easy-to-follow instructions.",
  },
  {
    icon: <FaLeaf className="text-green-500 w-10 h-10" />,
    title: "Healthy Choices",
    description: "Nutritious and balanced recipes for a healthier lifestyle.",
  },
  {
    icon: <FaVideo className="text-red-500 w-10 h-10" />,
    title: "Video Tutorials",
    description: "Step-by-step video guides to make cooking fun and simple.",
  },
];

export default function Features() {
  return (
    <section className="relative py-20 bg-orange-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center text-orange-500 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Features
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

