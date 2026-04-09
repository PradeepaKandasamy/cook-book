import { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import { motion } from "framer-motion";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updated = favorites.filter((recipe) => recipe.idMeal !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen py-20 bg-orange-50 px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-center text-orange-500 mb-12">
        My Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          You have no favorite recipes yet 😢
        </p>
      ) : (
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {favorites.map((recipe, index) => (
            <motion.div
              key={recipe.idMeal}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <RecipeCard
                recipe={recipe}
                onViewRecipe={() => {}}
              />
              <button
                onClick={() => removeFavorite(recipe.idMeal)}
                className="mt-2 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Remove from Favorites
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
