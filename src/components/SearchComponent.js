import React, { useState } from 'react';

// Function to highlight the matched text
const highlightText = (text, search) => {
  const parts = text.split(new RegExp(`(${search})`, 'gi'));
  return (
    <span>
      {parts.map((part, index) =>
        part.toLowerCase() === search.toLowerCase() ? (
          <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
        ) : (
          part
        )
      )}
    </span>
  );
};

const SearchComponent = ({ data }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Search function
  const search = (e) => {
    const searchTerm = e.target.value;
    setQuery(searchTerm);

    if (!searchTerm) {
      setResults([]);
      return;
    }

    const filteredData = data.filter(item =>
      Object.values(item).some(val =>
        val.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    
    setResults(filteredData);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={search}
        placeholder="Search..."
      />
      <ul>
        {results.map((item, index) => (
          <li key={index}>
            {Object.entries(item).map(([key, value]) => (
              <p key={key}>
                <strong>{key}:</strong> {highlightText(value.toString(), query)}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchComponent;
