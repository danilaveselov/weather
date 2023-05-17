import Navbar from "./components/Navbar";
import TimeLocation from "./components/TimeLocation";
import WeatherDetails from "./components/WeatherDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

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
    <Box height={2000} sx={{ backgroundColor: "#c3daff" }}>
      <CssBaseline />
      <Navbar setQuery={setQuery} units={units} setUnits={setUnits} />
      <Container maxWidth="sm">
        {weather && (
          <div>
            <TimeLocation weather={weather} />
            <WeatherDetails weather={weather} />
            <Forecast title="Hourly Forecast" items={weather.hourly} />
            <Forecast title="Daily Forecast" items={weather.daily} />
          </div>
        )}
        <ToastContainer autoclose={1000} theme="colored" newestOnTop={true} />
      </Container>
    </Box>
  );
}

export default App;
