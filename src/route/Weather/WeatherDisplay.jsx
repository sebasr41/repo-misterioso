import { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { WeathersContext } from '../../context/WeathersContext';
import './WeatherDisplay.css';

const WeatherDisplay = () => {
  const { id } = useParams();
  const { weathers } = useContext(WeathersContext);
  const [weather] = weathers.filter((weather) => weather.id === Number(id));

  return (
    <div className="weather-display-container">
      <div className="weather-display-card">
        <h1 className="weather-display-name">{weather.name}</h1>
        <h2 className="weather-display-name">{weather.windspeed}</h2>
        <h3 className="weather-display-name">{weather.temperature}</h3>
      </div>
      <Link className="btn-back" to="/">
        Volver al Inicio
      </Link>
    </div>
  );
};

export default WeatherDisplay;
