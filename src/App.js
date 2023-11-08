import axios from "axios";
import React, { useState, useEffect } from "react";
import style from "./styles.css";
import icon from "./images/icon.png";

function App() {
  // State variables to store data and location
  const [data, setData] = useState({});
  const [location, setLocation] = useState("Hyderabad");
  // API URL for fetching weather data
  // Function to handle location search on pressing Enter key
  const searchLocation = (event) => {
    if (event.key === "Enter" || event.type === "click") {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=c7641068ba27ee3f464773cc45d249c8&units=metric`;
      // Fetch weather data from the API
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      // Reset the location input field
      setLocation("");
    }
  };
  useEffect(() => {
    searchLocation({ key: "Enter" });
  }, []);

  return (
    <div className="App">
      <nav className="navbar" data-bs-theme="dark">
        <div className="container-fluid ">
          <img src={icon} alt="logo" />
          <a className="navbar-brand">Weather_Now</a>
        </div>
      </nav>
      <div className="search">
        <input
          value={location}
          type="text"
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter the city "
          onKeyPress={searchLocation}
        ></input>
        <button onClick={searchLocation}>Search</button>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp} °C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>
        <div className="bottom">
          <div className="feels">
            {data.main ? <p className="bold">{data.main.feels_like}</p> : null}
            <p>Feels like</p>
          </div>
          <div className="humidity">
            {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            <p>Humidity</p>
          </div>
          <div className="wind">
            {data.wind ? <p className="bold">{data.wind.speed} Mph</p> : null}
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
