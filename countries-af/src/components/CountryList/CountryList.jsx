// CountryList.jsx
import React, { useState, useEffect } from 'react';
import { 
  getAllCountries, 
  searchCountriesByName, 
  getCountriesByRegion, 
  getUniqueLanguages,
  filterCountriesByLanguage
} from '../../services/api';
import CountryCard from './CountryCard';
import SearchBar from '../SearchFilter/SearchBar';
import RegionFilter from '../SearchFilter/RegionFilter';
import LanguageFilter from '../SearchFilter/LanguageFilter';

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  // Load all countries initially
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setLoading(true);
        const data = await getAllCountries();
        setCountries(data);
        setFilteredCountries(data);
        
        // Extract unique languages
        const uniqueLanguages = getUniqueLanguages(data);
        setLanguages(uniqueLanguages);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch countries. Please try again later.');
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Handle search by name
  const handleSearch = async (term) => {
    setSearchTerm(term);
    
    if (term.trim() === '') {
      // If search term is empty, reset to all countries with current filters
      applyFilters(countries, selectedRegion, selectedLanguage);
    } else {
      try {
        const searchResults = await searchCountriesByName(term);
        applyFilters(searchResults, selectedRegion, selectedLanguage);
      } catch (err) {
        setError('Search failed. Please try again.');
        // Reset to showing all countries with current filters
        applyFilters(countries, selectedRegion, selectedLanguage);
      }
    }
  };

  // Handle region filter change
  const handleRegionChange = async (region) => {
    setSelectedRegion(region);
    
    if (region === '') {
      // If no region is selected, use search results or all countries
      if (searchTerm.trim() !== '') {
        const searchResults = await searchCountriesByName(searchTerm);
        applyFilters(searchResults, '', selectedLanguage);
      } else {
        applyFilters(countries, '', selectedLanguage);
      }
    } else {
      try {
        const regionCountries = await getCountriesByRegion(region);
        
        // Apply search term filter if it exists
        let filteredBySearch = regionCountries;
        if (searchTerm.trim() !== '') {
          filteredBySearch = regionCountries.filter(country => 
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        // Apply language filter
        applyFilters(filteredBySearch, region, selectedLanguage);
      } catch (err) {
        setError('Failed to filter by region. Please try again.');
      }
    }
  };

  // Handle language filter change
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    
    // Apply all current filters with the new language
    if (searchTerm.trim() !== '' || selectedRegion !== '') {
      // We already have filtered countries, just filter by language
      const filtered = filterCountriesByLanguage(filteredCountries, language);
      setFilteredCountries(filtered);
    } else {
      // Filter all countries by language
      const filtered = filterCountriesByLanguage(countries, language);
      setFilteredCountries(filtered);
    }
  };

  // Helper function to apply all filters
  const applyFilters = (countryList, region, language) => {
    let result = countryList;
    
    // Apply region filter if set
    if (region && region !== '') {
      result = result.filter(country => 
        country.region.toLowerCase() === region.toLowerCase()
      );
    }
    
    // Apply language filter if set
    if (language && language !== '') {
      result = filterCountriesByLanguage(result, language);
    }
    
    setFilteredCountries(result);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl">Loading countries...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4 bg-red-100 text-red-700 rounded">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Explore Countries</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <SearchBar onSearch={handleSearch} />
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <RegionFilter 
              selectedRegion={selectedRegion} 
              onRegionChange={handleRegionChange} 
            />
            <LanguageFilter 
              languages={languages} 
              selectedLanguage={selectedLanguage} 
              onLanguageChange={handleLanguageChange} 
            />
          </div>
        </div>
      </div>
      
      {filteredCountries.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">No countries found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCountries.map(country => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryList;