import axios from 'axios';

export const fetchCountries = async () => {
  const response = await axios.get('http://localhost:3001/countries');
  return response.data;
};

export const fetchCountriesByRegion = async (region: string) => {
  const response = await axios.get(`http://localhost:3001/countries/region/${region}`);
  return response.data;
};
