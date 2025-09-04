import React, { useState } from 'react';
import axios from 'axios';
import './Weather.css';

import Search_icon from './assets/search.png';
import clear_icon from './assets/clear.png';
import drizzle_icon from './assets/drizzle.png';
import humidity_icon from './assets/humidity.png';
import rain_icon from './assets/rain.png';
import weather_icon from './assets/weather.png';
import wind_icon from './assets/wind.png';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);

    const API_KEY = "896ea9016341fefef9f1f8001be1d388"; // replace with your OpenWeatherMap key

    const fetchWeather = async () => {
        if (!city) return;
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeather(response.data);
        } catch (error) {
            alert("City not found!");
        }
    };

    return (
        <div className="Weather">
            <div className="search-bar">
                <input 
                    type="text" 
                    placeholder="Enter city name" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)} 
                />
                <img src={Search_icon} alt="Search" onClick={fetchWeather}/>
            </div>

            {weather && (
                <>
                    <img src={weather_icon} alt="Weather Icon"/>
                    <p className="temperature">{Math.round(weather.main.temp)}°C</p>
                    <p className="location">{weather.name}</p>

                    <div className="weatherdata">
                        <div className="col">
                            <img src={humidity_icon} alt="Humidity"/>
                            <div>
                                <p>{weather.main.humidity}%</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind_icon} alt="Wind"/>
                            <div>
                                <p>{weather.wind.speed} km/h</p>
                                <span>Wind Speed</span>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Weather;
