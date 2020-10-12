import React,{useState} from 'react';
const api = {
  key: "da15525bacb97073ba76ed249089b401",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  // using hooks in react
  // query and weather are state variables 
  const [query,setQuery] = useState(''); // initializing the state as an empty string 
  const [weather, setWeather] = useState({}); 
  
  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        });
    }
  }

  const getDate = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[d.getDay()];    
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let date = d.getDate();
    return `${day} ${date} ${month} ${year}`
  }

  const getWeatherType = (w) =>{
    switch(w){
      case "Haze":
        return "app haze";
      case "Rain":
        return "app rainy";
      case "Clear":
        return "app sunny";
      case "Snow":
        return "app winter";
      case "Clouds":
        return "app cloudy";
      case "Thunderstorm":
        return "app thunderstorm";
      case "Drizzle":
        return "app drizzle";
      case "Mist":
        return "app mist";
      default:
        return "app";
      
    }
  }



  return (
    <div className={(typeof weather.main != "undefined")
      ? (getWeatherType(weather.weather[0].main))
    : 'app'}>
      <main>
        <title>Weather App in React JS</title>
        <div className="search-container">
          <input type="text" className = "search-bar" placeholder="Search a place for weather info..."
            onChange={e=>setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-container">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{getDate(new Date())}</div>
          </div>
          <div className="weather-container">
            <div className="temperature">
              {Math.round(weather.main.temp)}°C
            </div>
            <div className="weather">{weather.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}
      </main> 
    </div>
  );
}

export default App;

