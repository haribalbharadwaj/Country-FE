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
        console.log('Countries for region:', response.data); 
        setCountries(response.data);
      } catch (err) {
        setError(`Failed to load countries for region: ${region}`);
      }
    } else {
      // Reset to all countries if no region selected
      fetchCountries();
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://localhost:3001/countries');
      setCountries(response.data);
      console.log(response.data);
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

 /*const filteredCountries = countries.filter((country: any) => {
  return (
    typeof country.name === 'string' &&
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
});*/

const filteredCountries = countries.filter((country) => {
  const countryName = country?.name?.common || '';
  return countryName.toLowerCase().includes(searchTerm.toLowerCase());
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
        <label className="block text-gray-700">
          Search for a Country
        </label>
        <input
          id="search"
          type="text"
          placeholder="Enter country name"
          className="border border-gray-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Display filtered countries */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.name?.common} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
             {country.flags?.svg ?(
                <img
                  className="w-10 h-10 object-cover"
                  src={country.flags.svg}
                  alt={`Flag of ${country.name?.common}`}
                />
              ) : (
                <p className="text-center">No Flag Available</p>
              )}

              <div className="mt-2 text-center">
                <h2>{country.name?.common}</h2>
                <p>{country.region}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No countries found.</p>
        )}
      </div>
    </div>
  );
}
