import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing the search icon from react-icons

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query.trim() !== '') {
      onSearch(query);
    }
  };

  return (
    <div className="mb-6 flex justify-center">
      <div className="relative w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        {/* Search Icon - Make it clickable */}
        <FaSearch
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
          onClick={handleSearch}
        />
        <input
          type="text"
          value={query}
          onChange={handleSearchChange}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          placeholder="Search for images..."
          className="pl-10 pr-4 py-2 border-2 border-gray-300 rounded-full focus:border-white focus:outline-none transition duration-200 w-full"
        />
      </div>
    </div>
  );
};

export default SearchBar;
