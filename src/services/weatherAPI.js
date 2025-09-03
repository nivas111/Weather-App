export const getWeatherData = async (city) => {
  const geocodingUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    city
  )}&count=1`;
  const geocodingResponse = await fetch(geocodingUrl);
  const geocodingData = await geocodingResponse.json();

  if (!geocodingData.results || geocodingData.results.length === 0) {
    throw new Error("City not found. Please try another city.");
  }

  const { latitude, longitude, name, country } = geocodingData.results[0];

  const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_direction_10m&temperature_unit=celsius&wind_speed_unit=kmh&precipitation_unit=mm`;
  const weatherResponse = await fetch(weatherUrl);
  const weatherData = await weatherResponse.json();

  return {
    ...weatherData,
    location: { name, country },
  };
};

export const getWeatherIcon = (weatherCode) => {
  if (weatherCode === 0) return "☀️";
  if (weatherCode <= 3) return "🌤️";
  if (weatherCode <= 48) return "🌫️";
  if (weatherCode <= 67) return "🌧️";
  if (weatherCode <= 77) return "❄️";
  if (weatherCode <= 99) return "⛈️";
  return "🌤️";
};

export const getWeatherCondition = (weatherCode) => {
  const conditions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    95: "Thunderstorm",
    96: "Thunderstorm with hail",
    99: "Heavy thunderstorm with hail",
  };
  return conditions[weatherCode] || "Unknown conditions";
};

export const getOutdoorTips = (weatherCode, temp, windSpeed, humidity) => {
  if (weatherCode >= 95)
    return "⚠️ Avoid outdoor activities. Thunderstorms are dangerous. Seek shelter immediately.";
  if (weatherCode >= 80)
    return "🌧️ Rain showers expected. Waterproof gear recommended. Good for photography!";
  if (weatherCode >= 71)
    return "❄️ Snow conditions. Perfect for skiing or snowshoeing. Dress in layers.";
  if (weatherCode >= 61)
    return "☔ Rainy conditions. Waterproof clothing essential. Great for forest hikes.";
  if (weatherCode >= 45)
    return "🌫️ Foggy conditions. Stay on marked trails. Good for photography.";

  let tip = "";

  if (temp > 30) {
    tip = "☀️ Hot weather. Stay hydrated, wear sunscreen. ";
  } else if (temp > 18) {
    tip = "🌤️ Perfect hiking weather! ";
  } else if (temp > 7) {
    tip = "🍂 Cool conditions. Layer up for comfort. ";
  } else {
    tip = "🧊 Cold weather. Dress warmly. ";
  }

  if (humidity > 80) {
    tip += "High humidity may make it feel warmer than actual temperature. ";
  } else if (humidity < 30) {
    tip +=
      "Low humidity can lead to quicker dehydration. Drink plenty of water. ";
  }

  if (temp > 18 && temp < 30 && humidity < 70) {
    tip += "Ideal for all outdoor activities.";
  } else if (temp > 7 && temp < 18) {
    tip += "Great for brisk walks and hiking.";
  } else {
    tip += "Good for winter sports.";
  }

  return tip;
};

export const getHumidityLevel = (humidity) => {
  if (humidity < 30) return "Low";
  if (humidity < 60) return "Moderate";
  if (humidity < 80) return "High";
  return "Very High";
};
