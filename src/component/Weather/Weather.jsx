import { FaRegTimesCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import "./Weather.css";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WeathersContext } from "../../context/WeathersContext";
import { FavoritesContext } from "../../context/FavoritesContext";

const Weather = ({ weather }) => {
  const { id, latitude, longitude, timezone } = weather;
  const { weathers, setWeathers } = useContext(WeathersContext);
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [dataParsed, setDataParsed] = useState({});

  let dataStored;

  useEffect(() => {
    dataStored = localStorage.getItem("data");
    if (dataStored) {
      setDataParsed(JSON.parse(dataStored));
      // setCurrentUser(dataParsed.user);
    }
  }, []);

  const handleEliminate = () => {
    setWeathers(weathers.filter((weather) => weather.id !== id));
  };

  const handleFavorite = () => {
    setIsFavorite((isFavorite) => !isFavorite);

    const foundIndex = dataParsed.weathers.findIndex((fav) => fav.id === id);

    const { user, weathers } = dataParsed;

    if (foundIndex === -1) {
      setDataParsed({ user, weathers: [...weathers, weather] });

      localStorage.setItem(
        "data",
        JSON.stringify({ user, weathers: [...weathers, weather] })
      );

      return;
    }

    //Quitar de favoritos
    const dataFiltered = dataParsed.weathers.filter((fav) => fav.id !== id);

    setDataParsed({
      user: dataParsed.user,
      weathers: dataFiltered,
    });

    localStorage.setItem(
      "data",
      JSON.stringify({ user, weathers: dataFiltered })
    );
  };

  return (
    <div className="weather-container">
      <div className="weather">
        <span>{timezone}</span>

        <span>{latitude}</span>

        <span>{longitude}</span>
      </div>
      <div className="weather-actions">
        <div className="fav" onClick={handleFavorite}>
          {isFavorite ? <FaHeart className="heart" /> : <FaRegHeart />}
        </div>
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
