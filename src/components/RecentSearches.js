import React from "react";

const RecentSearches = ({ searches, onSearch }) => {
  const handleSearch = (search) => {
    const city = search.split(",")[0];
    onSearch(city);
  };

  return (
    <div className="recent-searches">
      <h3>Recent Searches:</h3>
      <div className="recent-list">
        {searches.map((search, index) => (
          <div
            key={index}
            className="recent-item"
            onClick={() => handleSearch(search)}
          >
            {search}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentSearches;
