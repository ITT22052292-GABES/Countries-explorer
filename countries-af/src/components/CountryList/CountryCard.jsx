
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const CountryCard = ({ country }) => {
  const { currentUser, toggleFavoriteCountry } = useAuth();
  
  const isFavorite = currentUser?.favoriteCountries?.includes(country.cca3);
  
  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavoriteCountry(country.cca3);
  };
  
  return (
    <Link to={`/country/${country.cca3}`} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition h-full flex flex-col">
        <div className="h-40 overflow-hidden">
          <img 
            src={country.flags.svg || country.flags.png} 
            alt={`Flag of ${country.name.common}`}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-4 flex-grow">
          <div className="flex justify-between items-start">
            <h2 className="text-xl font-bold mb-2">{country.name.common}</h2>
            {currentUser && (
              <button 
                onClick={handleFavoriteToggle}
                className="text-2xl focus:outline-none"
              >
                {isFavorite ? '❤️' : '🤍'}
              </button>
            )}
          </div>
          
          <div className="space-y-1 text-gray-700">
            <p><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
            <p><span className="font-semibold">Region:</span> {country.region}</p>
            <p><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;