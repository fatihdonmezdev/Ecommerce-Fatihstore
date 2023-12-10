import React from "react";

const CheckBox = ({ category, selectedCategories, handleCategoryChange }) => {
  return (
    <div className="mt-10">
      <input
        id={category}
        type="checkbox"
        value={category}
        checked={selectedCategories.includes(`${category}`)}
        onChange={() => handleCategoryChange(`${category}`)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={category}
        className="ms-2 text-lg font-medium text-gray-900 dark:text-gray-300"
      >
        {category}
      </label>
    </div>
  );
};

export default CheckBox;
