import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeLocation from "./components/TimeLocation";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "London" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "your location";
      toast.info("Getting the data for " + message);
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(`Data received for ${data.name}, ${data.country}`);
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  return (
    <div className="h-fit pb-96 w-screen bg-gradient-to-br from-cyan-500 to-blue-500 pt-5">
      <div className="mx-auto max-w-screen-lg py-5 px-32 shadow-gray-400 rounded-xl bg-purple-800 bg-opacity-10">
        <TopButtons setQuery={setQuery} />
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />
        {weather && (
          <div>
            <TimeLocation weather={weather} />
            <WeatherDetails weather={weather} />
            <Forecast title="hourly forecast" items={weather.hourly} />
            <Forecast title="daily forecast" items={weather.daily} />
          </div>
        )}
      </div>
      <ToastContainer autoclose={1000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
