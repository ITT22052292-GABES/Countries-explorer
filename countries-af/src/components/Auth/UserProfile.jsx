import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { getAllCountries } from '../../services/api';
import { useState, useEffect } from 'react';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchFavoriteCountries = async () => {
      if (!currentUser || !currentUser.favoriteCountries.length) {
        setFavoriteCountries([]);
        setLoading(false);
        return;
      }
      
      try {
        const allCountries = await getAllCountries();
        
        // Filter only favorite countries
        const favorites = allCountries.filter(country => 
          currentUser.favoriteCountries.includes(country.cca3)
        );
        
        setFavoriteCountries(favorites);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching favorite countries:', err);
        setLoading(false);
      }
    };
    
    fetchFavoriteCountries();
  }, [currentUser]);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      
      <div className="bg-white shadow-md rounded p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Account Details</h2>
        <p className="mb-2"><span className="font-semibold">Username:</span> {currentUser.username}</p>
      </div>
      
      <div className="bg-white shadow-md rounded p-6">
        <h2 className="text-2xl font-bold mb-4">Favorite Countries</h2>
        
        {loading ? (
          <p>Loading your favorites...</p>
        ) : favoriteCountries.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600 mb-4">You haven't added any countries to your favorites yet.</p>
            <Link to="/" className="text-blue-600 hover:underline">Explore countries</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {favoriteCountries.map(country => (
              <Link key={country.cca3} to={`/country/${country.cca3}`}>
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition">
                  <img 
                    src={country.flags.png} 
                    alt={`Flag of ${country.name.common}`}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="font-bold">{country.name.common}</h3>
                    <p className="text-sm text-gray-600">{country.region}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;