import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Login.css";

const Login = () => {
  const { setCurrentUser } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  let dataStored;
  let dataParsed;
  let dataToStorage;

  useEffect(() => {
    dataStored = localStorage.getItem("data");

    if (dataStored) {
      dataParsed = JSON.parse(dataStored);
      // setCurrentUser(dataParsed.user);
    }

    if (!dataStored) {
      dataToStorage = {
        user: {},
        weathers: [],
      };
    }
  }, []);

  const onSubmit = (user) => {
    if (!dataParsed) {
      dataToStorage.user = {
        username: user.username,
        password: user.password,
      };
      localStorage.setItem("data", JSON.stringify(dataToStorage));
    }

    if (dataParsed) {
      dataParsed.user = {
        username: user.username,
        password: user.password,
      };
      localStorage.setItem("data", JSON.stringify(dataParsed));
    }

    setCurrentUser(user);
    navigate("/");
  };

  return (
    <div className="sign-in-container">
      <span>Ingresa con tu usuario y contraseña</span>
      <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="input-form"
          type="text"
          placeholder="Nombre de usuario"
          {...register("username", {
            required: "Debe ingresar su nombre de usuario",
          })}
        />
        <p>{errors.username?.message}</p>
        <input
          className="input-form"
          type="password"
          placeholder="Contraseña"
          {...register("password", {
            required: "Debe ingresar su contraseña",
          })}
        />
        <p>{errors.password?.message}</p>
        <button className="btn-form" type="submit">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
