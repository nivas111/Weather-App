import React from "react";
import {
  getWeatherIcon,
  getWeatherCondition,
  getOutdoorTips,
  getHumidityLevel,
} from "../services/weatherAPI";

const WeatherCard = ({ weatherData }) => {
  const { current, location } = weatherData;

  return (
    <>
      <div className="location">
        {location.name}, {location.country}
      </div>

      <div className="current-weather">
        <div className="weather-card">
          <h3>TEMPERATURE</h3>
          <div className="temperature">
            {Math.round(current.temperature_2m)}°C
          </div>
          <div className="condition">
            Feels like {Math.round(current.apparent_temperature)}°C
          </div>
        </div>

        <div className="weather-card">
          <h3>CONDITIONS</h3>
          <div className="weather-icon">
            {getWeatherIcon(current.weather_code)}
          </div>
          <div className="condition">
            {getWeatherCondition(current.weather_code)}
          </div>
        </div>

        <div className="weather-card">
          <h3>HUMIDITY</h3>
          <div style={{ fontSize: "2em", margin: "15px 0" }}>
            💧 {current.relative_humidity_2m}%
          </div>
          <div className="condition">
            {getHumidityLevel(current.relative_humidity_2m)} humidity
          </div>
        </div>

        <div className="weather-card">
          <h3>WIND</h3>
          <div style={{ fontSize: "2em", margin: "15px 0" }}>
            💨 {Math.round(current.wind_speed_10m)} km/h
          </div>
          <div className="condition">
            {current.precipitation} mm precipitation
          </div>
        </div>
      </div>
      <div className="outdoor-tips">
        <h3>OUTDOOR ACTIVITY TIPS</h3>
        <p>
          {getOutdoorTips(
            current.weather_code,
            current.temperature_2m,
            current.wind_speed_10m,
            current.relative_humidity_2m
          )}
        </p>
      </div>
    </>
  );
};

export default WeatherCard;
