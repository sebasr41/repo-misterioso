import { useContext, useEffect, useState } from "react";
import Weathers from "../../component/Weather/Weathers";
import { WeathersContext } from "../../context/WeathersContext";
import "./Home.css";

const Home = () => {
  const { weathers } = useContext(WeathersContext);
  const [weathersStored, setWeathersStored] = useState([]);

  let dataStored;
  let dataParsed;

  useEffect(() => {
    dataStored = localStorage.getItem("data");
    if (dataStored) {
      dataParsed = JSON.parse(dataStored);
      setWeathersStored(dataParsed.weathers);
    }
    console.log("weathersStored ", weathersStored);
  }, []);

  // console.log("weathers => ", weathers);
  return (
    <>
      <div className="main-container">
        {/* <Weathers weathers={[...weathers, ...weathersStored]} /> */}
        <Weathers weathers={weathers} />
      </div>
    </>
  );
};

export default Home;
