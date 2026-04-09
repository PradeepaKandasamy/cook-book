import React, { useState, useEffect } from "react";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import dummyRecipes from "../assets/recipes.json"; // fallback data

const Recipes = () => {
  const [allRecipes, setAllRecipes] = useState([]); // all recipes
  const [filteredRecipes, setFilteredRecipes] = useState([]); // filtered search results
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch recipes on mount
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          "https://www.themealdb.com/api/json/v1/1/search.php?s="
        );
        const data = await res.json();

        if (data.meals && data.meals.length) {
          setAllRecipes(data.meals);
          setFilteredRecipes(data.meals);

          // Save to localStorage for offline use
          localStorage.setItem("offlineRecipes", JSON.stringify(data.meals));
        } else {
          throw new Error("No API data");
        }
      } catch (error) {
        console.warn("Offline mode: using saved or dummy data");
        const savedRecipes = JSON.parse(localStorage.getItem("offlineRecipes"));

        if (savedRecipes && savedRecipes.length) {
          setAllRecipes(savedRecipes);
          setFilteredRecipes(savedRecipes);
        } else {
          setAllRecipes(dummyRecipes);
          setFilteredRecipes(dummyRecipes);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Filter recipes based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredRecipes(allRecipes);
    } else {
      const filtered = allRecipes.filter((recipe) =>
        recipe.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  }, [searchTerm, allRecipes]);

  return (
    <div className="relative min-h-screen flex flex-col items-center px-4">
      <h1 className="text-3xl font-bold text-center my-6">All Recipes</h1>

      {/* Search Bar */}
      <div className="mb-6 w-full max-w-md">
        <SearchBar
          onSearch={(term) => setSearchTerm(term)}
          initialValue={searchTerm}
        />
      </div>

      {/* Recipes Grid */}
      {loading ? (
        <p className="text-lg">Loading recipes...</p>
      ) : filteredRecipes.length === 0 ? (
        <p className="text-lg text-gray-500">No recipes found 😢</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
