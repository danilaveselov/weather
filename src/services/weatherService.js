import { DateTime } from "luxon";

const API_KEY = process.env.REACT_APP_OW_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const getWeatherData = (infoType, params) => {
  const url = new URL(`${BASE_URL}/${infoType}`);
  url.search = new URLSearchParams({ ...params, appid: API_KEY });
  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;
  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    weather,
    speed,
  };
};


const getFormattedWeatherData = async (params) => {
  const formattedCurrentWeather = await getWeatherData("weather", params).then(
    formatCurrentWeather
  );
  return { ...formattedCurrentWeather };
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const getIconUrl = (code) => `https://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, getIconUrl };
