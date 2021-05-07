import React, { useState } from 'react';
import axios from 'axios';

export default function WeatherSearch() {
  const [city, setCity] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState(null);

  function displayTemp(response) {
    setWeather({
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
    setLoaded(true);
  }
  function changeCity(event) {
    setCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d38b3fbab5d2bec8684d5a27e2c576ad&units=metric`;
    axios.get(apiUrl).then(displayTemp);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Search city..." onChange={changeCity} />

      <input type="submit" value="Submit" />
    </form>
  );

  if (loaded) {
    return (
      <div>
        {" "}
        {form}
        <ul>
          <li> Temperature: {Math.round(weather.temperature)}℃</li>
          <li> Description: {weather.description} </li>
          <li> Wind: {weather.wind} KMs/H </li>
          <li> Humidity:{weather.humidity}% </li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
