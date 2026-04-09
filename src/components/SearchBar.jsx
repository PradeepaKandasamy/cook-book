import React, { useState, useEffect } from "react";

const SearchBar = ({ onSearch, initialValue = "" }) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  // 🔑 Call onSearch as user types
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onSearch(newValue); // update instantly
  };

  return (
    <div className="flex items-center bg-white rounded-full shadow-md p-2">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder="Search recipes..."
        className="flex-1 px-4 py-2 rounded-full outline-none text-gray-700"
      />
    </div>
  );
};

export default SearchBar;
