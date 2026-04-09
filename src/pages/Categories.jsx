import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import dummyImage from "../assets/dummy.webp"; // import local image

const categories = [
  { name: "Breakfast", image: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0" },
  { name: "Lunch", image: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" },
  { name: "Dinner", image: "https://images.unsplash.com/photo-1523983301-30d9c93f2df6" },
  { name: "Dessert", image: "https://images.unsplash.com/photo-1505253218016-9c1f3e2f1f38" },
  { name: "Italian", image: "https://images.unsplash.com/photo-1589308078051-2186cbe7e3c7" },
  { name: "Vegetarian", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c" },
];

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/recipes?search=${category}`);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-extrabold text-center text-orange-500 mb-10">
        Explore by Categories
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <motion.div
            key={idx}
            className="relative rounded-3xl overflow-hidden cursor-pointer shadow-lg"
            whileHover={{ scale: 1.08, rotate: 1, transition: { duration: 0.3 } }}
            onClick={() => handleCategoryClick(cat.name)}
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-48 object-cover"
              onError={(e) => (e.currentTarget.src = dummyImage)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
              <motion.span
                className="text-white font-bold text-xl drop-shadow-lg"
                whileHover={{ scale: 1.1 }}
              >
                {cat.name}
              </motion.span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
