import React, { useState, useEffect } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import RecentSearches from "./components/RecentSearches";
import { getWeatherData } from "./services/weatherAPI";

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    const savedSearches = localStorage.getItem("recentWeatherSearches");
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  useEffect(() => {
    if (recentSearches.length > 0) {
      localStorage.setItem(
        "recentWeatherSearches",
        JSON.stringify(recentSearches)
      );
    }
  }, [recentSearches]);

  const handleSearch = async (city) => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getWeatherData(city);
      setWeatherData(data);

      const searchEntry = `${data.location.name}, ${data.location.country}`;
      if (!recentSearches.includes(searchEntry)) {
        const updatedSearches = [searchEntry, ...recentSearches.slice(0, 4)];
        setRecentSearches(updatedSearches);
      }
    } catch (err) {
      setError(
        err.message || "Failed to fetch weather data. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Weather App</h1>
        <p>Get instant weather conditions for your outdoor adventures</p>
      </div>

      <div className="search-section">
        <SearchBar onSearch={handleSearch} loading={loading} />

        {recentSearches.length > 0 && (
          <RecentSearches searches={recentSearches} onSearch={handleSearch} />
        )}
      </div>
      <div className="weather-display">
        {loading && (
          <div className="loading">
            <p>Loading weather data...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && weatherData && (
          <WeatherCard weatherData={weatherData} />
        )}

        {!loading && !error && !weatherData && (
          <div className="loading">
            <p>
              Enter a city name to get current weather conditions in Celsius
            </p>
            <p>Try: Paris, Tokyo, Sydney, etc.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
