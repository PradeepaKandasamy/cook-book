import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const RecipeDetails = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        const data = await res.json();
        setRecipe(data.meals[0]);
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-lg text-gray-500">
        Loading recipe details...
      </p>
    );
  }

  if (!recipe) {
    return (
      <p className="text-center mt-20 text-lg text-red-500">
        Recipe not found 😢
      </p>
    );
  }

  const ingredients = Array.from({ length: 20 }, (_, i) => i + 1)
    .map((num) => ({
      ingredient: recipe[`strIngredient${num}`],
      measure: recipe[`strMeasure${num}`],
    }))
    .filter((item) => item.ingredient && item.ingredient.trim() !== "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="relative min-h-screen flex flex-col items-center px-4 py-12 bg-orange-50"
    >
      {/* Back button */}
   <Link
    to="/recipes"
    className="self-start mt-6 mb-8 px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 hover:shadow-xl transition-all duration-300"
    >
    ← Back to Recipes
    </Link>



      {/* Recipe Header */}
        <div className="flex flex-col items-center max-w-4xl w-full mb-8">
        <motion.img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-full max-w-md rounded-2xl shadow-xl mb-6 object-cover"
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}  // subtle up-down floating
        transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
        }}
        whileHover={{ scale: 1.03 }}  // slight zoom on hover
        />


        {/* Recipe Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-center text-black mb-2">
            {recipe.strMeal}
        </h1>
        <p className="text-center text-lg md:text-xl text-gray-700">
            {recipe.strCategory} | {recipe.strArea}
        </p>
        </div>


      {/* Instructions */}
      <section className="max-w-4xl w-full bg-white p-6 rounded-2xl shadow-inner mb-8">
        <h2 className="text-2xl font-semibold text-black mb-4">Instructions</h2>
        <p className="text-gray-800 whitespace-pre-line leading-relaxed">
          {recipe.strInstructions}
        </p>
      </section>

      {/* Ingredients */}
      <section className="max-w-4xl w-full bg-white p-6 rounded-2xl shadow-inner mb-8">
        <h2 className="text-2xl font-semibold text-black mb-4">Ingredients</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {ingredients.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between bg-gray-100 p-2 rounded-lg text-gray-800"
            >
              <span>{item.ingredient}</span>
              <span className="font-medium">{item.measure}</span>
            </div>
          ))}
        </div>
      </section>

      {/* YouTube Video */}
      {recipe.strYoutube && (
        <section className="max-w-4xl w-full mb-12">
          <h2 className="text-2xl font-semibold text-black mb-4 text-center">
            Video Tutorial
          </h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src={`https://www.youtube.com/embed/${recipe.strYoutube.split("v=")[1]}`}
              title={recipe.strMeal}
              allowFullScreen
              className="w-full h-full rounded-2xl shadow-lg"
            />
          </div>
        </section>
      )}
    </motion.div>
  );
};

export default RecipeDetails;
