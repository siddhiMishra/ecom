// src/components/Filter.js
import React from 'react';

const Filter = ({ filters, setFilters }) => {
  const categories = ['All', 'Drinkware', 'Stationery'];
  const colors = ['All', 'Green', 'Black'];
  const sizes = ['All', 'Small', 'Medium', 'Large'];

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };

  const handleSearchChange = (e) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: e.target.value,
    }));
  };

  return (
    <div className="bg-gray-100 p-4 rounded-md mb-8">
      <h3 className="text-lg font-medium mb-4">Filters</h3>
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search Products"
          value={filters.search}
          onChange={handleSearchChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        />
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="mt-1 block w-32 p-2 border border-gray-300 rounded-md"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Color</label>
          <select
            value={filters.color}
            onChange={(e) => handleFilterChange('color', e.target.value)}
            className="mt-1 block w-32 p-2 border border-gray-300 rounded-md"
          >
            {colors.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="block text-sm font-medium text-gray-700">Size</label>
          <select
            value={filters.size}
            onChange={(e) => handleFilterChange('size', e.target.value)}
            className="mt-1 block w-32 p-2 border border-gray-300 rounded-md"
          >
            {sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
