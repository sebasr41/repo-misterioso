import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getWeather } from "../../service";
import { useNavigate } from "react-router-dom";
import "./WeatherCreation.css";
import { WeathersContext } from "../../context/WeathersContext";
import { UserContext } from "../../context/UserContext";

const WeatherCreation = () => {
  const { weathers, setWeathers } = useContext(WeathersContext);
  const [dataParsed, setDataParsed] = useState({});

  let dataStored;

  const navigate = useNavigate();

  useEffect(() => {
    dataStored = localStorage.getItem("data");
    if (dataStored) {
      setDataParsed(JSON.parse(dataStored));
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      timezone: "Europe/London",
      latitude: "51.5002",
      longitude: "-0.1262",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    getWeather(data)
      .then((res) => {
        const { temperature, weathercode, windspeed } = res.current_weather;
        const WeatherNew = {
          id: crypto.randomUUID(),
          timezone: data.timezone,
          latitude: data.latitude,
          longitude: data.longitude,
          temperature,
          weathercode,
          windspeed,
        };

        const WeatherSimpleInfo = {
          id: WeatherNew.id,
          timezone: WeatherNew.timezone,
          latitude: WeatherNew.latitude,
          longitude: WeatherNew.longitude,
        };

        setWeathers([...weathers, WeatherNew]);

        localStorage.setItem(
          "data",
          JSON.stringify({
            user: dataParsed.user,
            weathers: [...dataParsed.weathers, WeatherSimpleInfo],
          })
        );

        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const getData = () => {
    console.log("weathers => ", weathers);
  };

  return (
    <div className="weather-new-container">
      <span>Add new weather</span>
      <form className="weather-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-weather-name-form"
          type="text"
          placeholder="Nombre de la ciudad"
          {...register("timezone", {
            required: "You must enter a name",
          })}
        />
        <p>{errors.timezone?.message}</p>
        <input
          className="input-weather-name-form"
          type="text"
          placeholder="Enter latitude"
          {...register("latitude", {
            required: "You must enter a latitude",
          })}
        />
        <input
          className="input-weather-name-form"
          type="text"
          placeholder="Enter longitude"
          {...register("longitude", {
            required: "You must enter a longitude",
          })}
        />
        <p>{errors.tag?.message}</p>
        <button className="btn-form" type="submit">
          Crear Weather
        </button>
      </form>

      <button onClick={getData}>Get data</button>
    </div>
  );
};

export default WeatherCreation;
