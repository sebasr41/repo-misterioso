import { useContext, useEffect, useState } from "react";
import Weathers from "../../component/Weather/Weathers";
import { WeathersContext } from "../../context/WeathersContext";
import "./Home.css";

const Home = () => {
  const { weathers, setWeathers } = useContext(WeathersContext);
  // const [weathersStored, setWeathersStored] = useState([]);

  let dataStored;
  let dataParsed;

  useEffect(() => {
    dataStored = localStorage.getItem("data");
    if (weathers.length === 0 && dataStored) {
      dataParsed = JSON.parse(dataStored);

      console.log(" weathers ", weathers);
      setWeathers([...weathers, ...dataParsed.weathers]);
    }
    console.log(" weathers ", weathers.length);
  }, []);

  // console.log("weathers => ", weathers);
  return (
    <>
      <div className="main-container">
        <Weathers weathers={weathers} />
        {/* <Weathers weathers={weathers} /> */}
      </div>
    </>
  );
};

export default Home;
