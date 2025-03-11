import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedRegion: string;
  handleRegionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, selectedRegion, handleRegionChange }) => {
  return (
    <div>
      {/* Region Filter */}
      <div className="mb-4">
        <label className="block text-gray-700">Filter by Region</label>
        <select
          className="border border-gray-300 p-2"
          value={selectedRegion}
          onChange={handleRegionChange}
        >
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      {/* Search Input */}
      <div className="mb-4">
        <label className="block text-gray-700">Search for a Country</label>
        <input
          id="search"
          type="text"
          placeholder="Enter country name"
          className="border border-gray-300 p-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
