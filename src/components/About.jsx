import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="relative py-16 bg-gradient-to-b from-orange-50 via-orange-100 to-orange-50">
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12">
        {/* Image */}
        <motion.img
          src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800"
          alt="About Image"
          className="w-full md:w-1/2 rounded-2xl shadow-xl object-cover"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.05 }}
        />

        {/* Text */}
        <motion.div
          className="md:w-1/2 space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl font-bold text-orange-500">
            About Our Recipes
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Discover a world of delicious recipes curated for every taste and skill level.
            Our goal is to make cooking fun, easy, and enjoyable for everyone. From quick meals
            to gourmet dishes, find inspiration and step-by-step guides to bring joy to your kitchen.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            Whether you are a beginner or a professional chef, our platform provides a
            rich collection of recipes, ingredients tips, and video tutorials to make your
            cooking experience seamless and delightful.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
