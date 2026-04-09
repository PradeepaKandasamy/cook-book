import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import dummyImage from "../assets/dummy.webp"; // fallback image

const RecipeCard = ({ recipe }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);
  const [imgSrc, setImgSrc] = useState(recipe.strMealThumb || dummyImage); // fallback image

  // Check if recipe is already in favorites
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((fav) => fav.idMeal === recipe.idMeal));
  }, [recipe.idMeal]);

  const handleViewRecipe = () => {
    navigate(`/recipes/${recipe.idMeal}`);
  };

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (isFavorite) {
      const updated = favorites.filter((fav) => fav.idMeal !== recipe.idMeal);
      localStorage.setItem("favorites", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer flex flex-col justify-between"
      whileHover={{ scale: 1.05, y: -5 }}
      transition={{ type: "spring", stiffness: 200 }}
    >
      {/* Recipe Image with favorite icon */}
      <div className="relative">
        <motion.img
          src={imgSrc}
          alt={recipe.strMeal}
          onError={() => setImgSrc(dummyImage)} // fallback if image fails
          className="w-full h-48 object-cover rounded-t-2xl"
          whileHover={{ scale: 1.08 }}
          transition={{ type: "spring", stiffness: 200 }}
        />
        <motion.button
          onClick={toggleFavorite}
          className="absolute top-3 right-3 text-2xl text-red-500 hover:text-red-600"
          whileTap={{ scale: 1.2 }}
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </motion.button>
      </div>

      {/* Recipe Info */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="text-xl font-bold text-gray-800">{recipe.strMeal}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {recipe.strInstructions
            ? recipe.strInstructions.substring(0, 100) + "..."
            : "No instructions available."}
        </p>

        {/* View Recipe Button */}
        <motion.button
          onClick={handleViewRecipe}
          className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Recipe
        </motion.button>
      </div>
    </motion.div>
  );
};

export default RecipeCard;
