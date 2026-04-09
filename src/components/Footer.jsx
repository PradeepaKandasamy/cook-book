import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Brand */}
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-orange-400">RecipeHub</h2>
          <p className="text-gray-400 text-sm">Discover and cook delicious recipes.</p>
        </div>

        {/* Links */}
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="/" className="hover:text-orange-400 transition">Home</a>
          <a href="/recipes" className="hover:text-orange-400 transition">Recipes</a>
          <a href="/favorites" className="hover:text-orange-400 transition">Favorites</a>
          <a href="/about" className="hover:text-orange-400 transition">About</a>
        </div>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:text-orange-400 transition">🌐</a>
          <a href="#" className="hover:text-orange-400 transition">🐦</a>
          <a href="#" className="hover:text-orange-400 transition">📸</a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-500 text-sm mt-6">
        &copy; {new Date().getFullYear()} RecipeHub. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
