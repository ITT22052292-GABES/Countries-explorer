import React from 'react';

const RegionFilter = ({ selectedRegion, onRegionChange }) => {
  const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  
  return (
    <div className="w-full md:w-auto">
      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Filter by Region</option>
        {regions.map(region => (
          <option key={region} value={region.toLowerCase()}>
            {region}
          </option>
        ))}
      </select>
    </div>
  );
};
export default RegionFilter;