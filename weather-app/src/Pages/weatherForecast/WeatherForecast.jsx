import React, { useState, useEffect } from 'react';
import './WeatherForecast.css'
import { onedayWeatherForecast } from '../../services/allApi';
// Import your API function

function WeatherForecast() {
  const [dailyForecasts, setDailyForecasts] = useState([]);

  const fetchData = async () => {
    try {
      const response = await onedayWeatherForecast();
      console.log(response);
      if (response && response.DailyForecasts) {
        setDailyForecasts(response.DailyForecasts);
      } else {
        console.error('Invalid response:', response);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };
  console.log(dailyForecasts);
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="weather-forecast">
        <div className="daily-forecasts">
          {dailyForecasts.map((forecast, index) => (
            <div key={index} className="forecast">
              <h3>{forecast.Date}</h3>
              <p>Temperature: {forecast.Temperature.Minimum.Value}°F - {forecast.Temperature.Maximum.Value}°F</p>
              <p>Day: {forecast.Day.IconPhrase}</p>
              <p>Night: {forecast.Night.IconPhrase}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WeatherForecast;
