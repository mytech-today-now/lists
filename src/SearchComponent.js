// src/SearchComponent.js

import React, { useState } from 'react';

const SearchComponent = ({ lists }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    const filteredResults = lists.map(list => ({
      ...list,
      items: list.items.filter(item => item.toLowerCase().includes(value.toLowerCase()))
    }));
    setResults(filteredResults);
  };

  const getHighlightedText = (text, highlight) => {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return <span> {parts.map((part, i) => 
      <span key={i} style={part.toLowerCase() === highlight.toLowerCase() ? { backgroundColor: 'yellow' } : {}}>
          {part}
      </span>)} </span>;
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div>
        {results.map((list, index) => (
          <div key={index}>
            <h3>{list.title}</h3>
            <ul>
              {list.items.map((item, idx) => (
                <li key={idx}>{getHighlightedText(item, searchTerm)}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchComponent;
