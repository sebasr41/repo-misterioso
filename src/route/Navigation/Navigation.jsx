import { useContext, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "./Navigation.css";
import logo from "../../assets/logo.png";
const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  useEffect(() => {
    const data = localStorage.getItem("data");

    // console.log({ userStored });
    if (data) {
      const dataStored = JSON.parse(data);
      setCurrentUser(dataStored.user);
    }
  }, []);

  const handleSignOut = () => {
    setCurrentUser(null);
  };

  return (
    <>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/">
            Home
          </Link>
          {currentUser ? (
            <Link className="nav-link" to="/weather/create">
              New Weather
            </Link>
          ) : (
            <span className="nav-link">New weather</span>
          )}

          {currentUser ? (
            <span className="nav-link" onClick={handleSignOut}>
              Log out
            </span>
          ) : (
            <Link className="nav-link sign-in" to="/login">
              Log In
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;
