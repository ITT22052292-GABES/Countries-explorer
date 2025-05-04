// API service for REST Countries API
const BASE_URL = 'https://restcountries.com/v3.1';

// Endpoint 1: Get all countries
export const getAllCountries = async () => {
  try {
    const response = await fetch(`${BASE_URL}/all`);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching all countries:', error);
    throw error;
  }
};

// Endpoint 2: Search countries by name
export const searchCountriesByName = async (name) => {
  try {
    const response = await fetch(`${BASE_URL}/name/${name}`);
    if (!response.ok) {
      if (response.status === 404) {
        return []; // Return empty array when no countries match
      }
      throw new Error('Failed to search countries');
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching countries by name:', error);
    throw error;
  }
};

// Endpoint 3: Filter countries by region
export const getCountriesByRegion = async (region) => {
  try {
    const response = await fetch(`${BASE_URL}/region/${region}`);
    if (!response.ok) {
      throw new Error('Failed to fetch countries by region');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching countries by region:', error);
    throw error;
  }
};

// Endpoint 4: Get country details by code
export const getCountryByCode = async (code) => {
  try {
    const response = await fetch(`${BASE_URL}/alpha/${code}`);
    if (!response.ok) {
      throw new Error('Failed to fetch country details');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching country by code:', error);
    throw error;
  }
};

// Helper function to extract unique languages from all countries
export const getUniqueLanguages = (countries) => {
  const languagesSet = new Set();
  
  countries.forEach(country => {
    if (country.languages) {
      Object.values(country.languages).forEach(language => {
        languagesSet.add(language);
      });
    }
  });
  
  return Array.from(languagesSet).sort();
};

// Helper function to filter countries by language
export const filterCountriesByLanguage = (countries, language) => {
  if (!language) return countries;
  
  return countries.filter(country => {
    if (country.languages) {
      return Object.values(country.languages).some(
        lang => lang.toLowerCase() === language.toLowerCase()
      );
    }
    return false;
  });
};