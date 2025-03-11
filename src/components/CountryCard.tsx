import React from 'react';

interface CountryCardProps {
  country: {
    name: { common: string } | string;
    flag?: string;
    region: string;
  };
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const countryName = typeof country.name === 'object' ? country.name?.common : country.name;

  return (
    <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-300">
      {country.flag ? (
        <img className="w-10 h-10 object-cover" src={country.flag} alt={`Flag of ${countryName}`} />
      ) : (
        <p className="text-center">No Flag Available</p>
      )}
      <div className="mt-2 text-center">
        <h2>{countryName}</h2>
        <p>{country.region}</p>
      </div>
    </div>
  );
};

export default CountryCard;
