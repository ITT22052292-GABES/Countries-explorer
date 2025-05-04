import React from 'react';

const LanguageFilter = ({ languages, selectedLanguage, onLanguageChange }) => {
  return (
    <div className="w-full md:w-auto">
      <select
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Filter by Language</option>
        {languages.map(language => (
          <option key={language} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  );
};
export default LanguageFilter;