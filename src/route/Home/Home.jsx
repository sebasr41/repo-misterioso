import { useContext, useEffect, useState } from 'react';
import { get } from 'react-hook-form';
import { Link } from 'react-router-dom';
import Favorites from '../../component/Favorite/Favorites';
import Weathers from '../../component/Weather/Weathers';
import { FavoritesContext } from '../../context/FavoritesContext';
import { WeathersContext } from '../../context/WeathersContext';
import './Home.css';

const Home = () => {
  const { weathers, setWeathers } = useContext(WeathersContext);
  //const { favorites, setFavorites } = useContext(FavoritesContext);
  // const [weathersStored, setWeathersStored] = useState([]);
 
  const [search, setSearch] = useState('');

  let dataStored;
  let dataParsed;
  useEffect(() => {
    dataStored = localStorage.getItem('data');
    if (weathers.length === 0 && dataStored) {
      dataParsed = JSON.parse(dataStored);

      console.log(' weathers ', weathers);
      setWeathers([...weathers, ...dataParsed.weathers]);
      console.log('dt', dataParsed);
    }
    console.log(' weathers ', weathers.length);
  
  }, []);
  console.log('weathers => ', weathers);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const result = !search
    ? weathers
    : weathers.filter((weather) =>
        weather.timezone.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <>
      <div className="search">
        <input
          className="input-search"
          type="text"
          placeholder="Search by city"
          value={search}
          onChange={handleSearch}
        />
        <div className="asd">
          {!result.length > 0 && search && (
            <div>
              <h1 className="asd">No hay coincidencias</h1>
            </div>
          )}
          {!result.length > 0 && !search && (
            <div className="adding-weather">
              <h1 className="titule-add">No weather cards</h1>
              <p className="question-add">Do you want to add a new card?</p>
              <Link className="btn-add" to="weather/create">
                Create weather
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="main-container">
        <Weathers weathers={weathers} />
        <Favorites />
      </div>
    </>
  );
};

export default Home;
