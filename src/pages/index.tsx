import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');

  const handleRegionChange = async (e) => {
    const region = e.target.value;
    setSelectedRegion(region);

    if (region !== '') {
      try {
        const response = await axios.get(`http://localhost:3001/countries/region/${region}`);
        setCountries(response.data);
      } catch (err) {
        setError(`Failed to load countries for region: ${region}`);
      }
    } else {
      // Fetch all countries if 'All Regions' is selected
      fetchCountries();
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:3001/countries');
      setCountries(response.data);
      console.log('Fetched all countries', response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load countries');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  if (error) return <p className="text-red-500">{error}</p>;

  // Filter countries based on selected region and search term
  const filteredCountries = countries.filter((country) => {
    const countryName = country?.name?.common || country?.name;
    const matchesSearch = countryName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRegion = selectedRegion ? country.region === selectedRegion : true;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="p-6">
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

      {/* Display Filtered Countries */}
      <div>
        <h2 className="text-xl font-semibold mb-4">
          {selectedRegion ? `Countries in ${selectedRegion}` : 'All Countries'}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300"
              >
                {country.flag ? (
                  <img
                    className="w-10 h-10 object-cover"
                    src={country.flag}
                    alt={`Flag of ${country.name?.common}`}
                  />
                ) : (
                  <p className="text-center">No Flag Available</p>
                )}
                <div className="mt-2 text-center">
                  <h2>{typeof country.name === 'object' ? country.name?.common : country.name}</h2>
                  <p>{country.region}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No countries found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
