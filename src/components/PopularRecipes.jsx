import { useEffect, useState } from "react";
import RecipeCard from "../components/RecipeCard";
import { motion } from "framer-motion";

export default function PopularRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch some popular recipes
  useEffect(() => {
    const fetchPopular = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        const data = await res.json();
        setRecipes(data.meals ? data.meals.slice(0, 6) : []); // show first 6
      } catch (error) {
        console.error("Error fetching popular recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPopular();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-3xl md:text-5xl font-bold text-center text-orange-500 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Popular Recipes
        </motion.h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading recipes...</p>
        ) : recipes.length === 0 ? (
          <p className="text-center text-gray-500">No recipes found 😢</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {recipes.map((recipe, index) => (
              <motion.div
                key={recipe.idMeal}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <RecipeCard recipe={recipe} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
