import { FaRegTimesCircle } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import "./Weather.css";
import { Link } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { WeathersContext } from "../../context/WeathersContext";
import { FavoritesContext } from "../../context/FavoritesContext";

const Weather = ({ weather }) => {
  const { id, latitude, longitude, name, favorite } = weather;
  const { weathers, setWeathers } = useContext(WeathersContext);
  const { favorites, setFavorites } = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(favorite);
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
    const foundIndex = dataParsed.weathers.findIndex((fav) => fav.id === id);
    setIsFavorite(!isFavorite);
    const { user, weathers } = dataParsed;

    if (foundIndex === -1) {
      console.log("hiii");

      const anothers = weathers.map((item) => ({
        id: item.id,
        latitude: item.latitude,
        longitude: item.longitude,
        name: item.name,
        favorite: item.favorite,
      }));

      const another = {
        id,
        latitude,
        longitude,
        name,
        favorite: !isFavorite,
      };

      console.log("anothers => ", anothers);

      setDataParsed({ user, weathers: [...anothers, another] });

      localStorage.setItem(
        "data",
        JSON.stringify({ user, weathers: [...anothers, another] })
      );

      return;
    }

    // Quitar de favoritos
    const dataFiltered = dataParsed.weathers.filter((fav) => fav.id !== id);

    const asd = dataFiltered.map((item) => ({
      id: item.id,
      latitude: item.latitude,
      longitude: item.longitude,
      name: item.name,
      favorite: item.favorite,
    }));

    setDataParsed({
      user: dataParsed.user,
      weathers: asd,
    });

    localStorage.setItem("data", JSON.stringify({ user, weathers: asd }));
  };

  return (
    <div className="weather-container">
      <div className="weather">
        <span>{name}</span>

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
