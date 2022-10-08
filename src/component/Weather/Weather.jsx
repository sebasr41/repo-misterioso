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
  const [isFavorite, setIsFavorite] = useState([]);
  const [dataParsed, setDataParsed] = useState({});

  let dataStored;

  useEffect(() => {
    dataStored = localStorage.getItem("data");

    console.log("dataStored => ", dataStored);

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

    console.log("dataParsed => ", dataParsed);

    // const foundIndex = favorites.findIndex((fav) => fav.id === id);
    const found = dataParsed.weathers?.find((fav) => fav.id === id);

    if (found === undefined) {
      const found = weathers.find((item) => item.id === id);
      // setFavorites([...favorites, weather]);

      setDataParsed(dataParsed.weathers?.push(found));
      // const dataToStorage = {

      //   dataParsed,
      // };
      localStorage.setItem("data", JSON.stringify(dataParsed));

      return;
    }

    //Quitar de favoritos
    setDataParsed(
      dataParsed.weathers?.filter((fav) => fav.id !== id) //!==
    );
    localStorage.setItem("data", JSON.stringify(dataParsed));
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
