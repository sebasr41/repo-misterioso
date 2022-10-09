import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { WeathersContext } from '../../context/WeathersContext';
import './WeatherDisplay.css';
import icon from "../../assets/icon.png"

const WeatherDisplay = () => {
  
  const { id} = useParams();
  const { weathers } = useContext(WeathersContext);
  const [weather] = weathers.filter((weather) => weather.id === (id));
  console.log(weather);
  return (
    <div className="weather-display-container">
      <div className="weather-display-card">
        <h4 className="weather-display-titule">Infomation Weather</h4>
        <h6 className="weather-display-zone">{weather.timezone}</h6>
        <img className="weather-display-img" src={icon} alt="icon"/>
        <div class="weather-temp-windspeed">
            <div className="details">
                <p>temperature</p>
                <span className="weather-wind-temp">{weather.temperature}<sup>&deg;</sup></span>
            </div>
            <div className="details">
                <p>windspeed</p>
                <span className="weather-wind-temp">{weather.windspeed}</span>
            </div>
        </div>
      </div>
      <Link className="btn-back" to="/">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default WeatherDisplay;
