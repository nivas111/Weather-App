import React, { useState } from "react";

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(city);
  };

  return (
    <form onSubmit={handleSubmit} className="search-box">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name (e.g., Paris, Tokyo, Sydney)..."
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Loading..." : "Get Weather"}
      </button>
    </form>
  );
};

export default SearchBar;
