import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCountryByCode } from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

const CountryDetail = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { currentUser, toggleFavoriteCountry } = useAuth();
  
  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);
        const data = await getCountryByCode(countryCode);
        if (data && data.length > 0) {
          setCountry(data[0]);
        } else {
          setError('Country not found');
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch country details. Please try again later.');
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [countryCode]);

  const handleGoBack = () => {
    navigate(-1);
  };
  
  const isFavorite = currentUser?.favoriteCountries?.includes(countryCode);
  
  const handleFavoriteToggle = () => {
    toggleFavoriteCountry(countryCode);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading country details...</div>
      </div>
    );
  }

  if (error || !country) {
    return (
      <div className="text-center p-4 bg-red-100 text-red-700 rounded">
        <p>{error || 'Country not found'}</p>
        <button 
          onClick={handleGoBack}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Extract languages
  const languages = country.languages ? Object.values(country.languages) : [];
  
  // Extract currencies
  const currencies = country.currencies ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`) : [];

  return (
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={handleGoBack}
        className="mb-6 flex items-center text-red-600 hover:text-red-800"
      >
        ← Back to Countries
      </button>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img 
              src={country.flags.svg || country.flags.png} 
              alt={`Flag of ${country.name.common}`}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="p-6 md:w-1/2">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
              
              {currentUser && (
                <button 
                  onClick={handleFavoriteToggle}
                  className="text-2xl focus:outline-none"
                  aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                  {isFavorite ? '❤️' : '🤍'}
                </button>
              )}
            </div>
            
            <p className="text-gray-600 mb-6">{country.name.official}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="mb-2"><span className="font-semibold">Capital:</span> {country.capital?.[0] || 'N/A'}</p>
                <p className="mb-2"><span className="font-semibold">Region:</span> {country.region}</p>
                <p className="mb-2"><span className="font-semibold">Subregion:</span> {country.subregion || 'N/A'}</p>
                <p className="mb-2"><span className="font-semibold">Population:</span> {country.population.toLocaleString()}</p>
              </div>
              
              <div>
                <p className="mb-2"><span className="font-semibold">Languages:</span> {languages.length > 0 ? languages.join(', ') : 'N/A'}</p>
                <p className="mb-2"><span className="font-semibold">Currencies:</span> {currencies.length > 0 ? currencies.join(', ') : 'N/A'}</p>
                <p className="mb-2"><span className="font-semibold">Area:</span> {country.area.toLocaleString()} km²</p>
                <p className="mb-2">
                  <span className="font-semibold">Top Level Domain:</span> {country.tld?.join(', ') || 'N/A'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {country.borders && country.borders.length > 0 && (
          <div className="p-6 border-t">
            <h2 className="text-xl font-bold mb-3">Border Countries</h2>
            <div className="flex flex-wrap gap-2">
              {country.borders.map(border => (
                <button
                  key={border}
                  onClick={() => navigate(`/country/${border}`)}
                  className="bg-gray-100 px-3 py-1 rounded shadow-sm hover:bg-gray-200 transition"
                >
                  {border}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {country.maps && (
          <div className="p-6 border-t">
            <h2 className="text-xl font-bold mb-3">Maps</h2>
            <div className="flex gap-4">
              <a 
                href={country.maps.googleMaps} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google Maps
              </a>
              <a 
                href={country.maps.openStreetMaps} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                OpenStreetMap
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default CountryDetail;