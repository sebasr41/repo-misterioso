import { FaRegTimesCircle } from 'react-icons/fa';
import { useContext } from 'react';
import './Weather.css';
import { Link } from 'react-router-dom';
import { WeathersContext } from '../../context/WeathersContext';

const Weather = ({ weather }) => {
  const { id, latitude, longitude, timezone } = weather;
  const { weathers, setWeathers } = useContext(WeathersContext);

  const handleEliminate = () => {
    setWeathers(weathers.filter((weather) => weather.id !== id));
  };

  return (
    <div className="weather-container">
      <div className="weather">
        <span>{timezone}</span>

        <span>{latitude}</span>

        <span>{longitude}</span>
      </div>
      <div className="weather-actions">
        <div className="delete" onClick={handleEliminate}>
          <FaRegTimesCircle />
        </div>
        <Link className="btn-see-more" to={`/weather/${id}`}>
          Ver más
        </Link>
      </div>
    </div>
  );
};
export default Weather;
