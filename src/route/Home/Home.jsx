import { useContext, useState } from "react";
import Weathers from "../../component/Weather/Weathers";
import { WeathersContext } from "../../context/WeathersContext";
import "./Home.css"

const Home = () => {
  const { weathers } = useContext(WeathersContext);

  return (
    <>
      <div className="main-container">
        <Weathers weathers={weathers} />
      </div>
    </>
  );
};

export default Home;
