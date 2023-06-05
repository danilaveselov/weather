import axios from "axios";

const API_KEY = process.env.REACT_APP_OW_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherData = (infoType, params) => {
    const url = new URL(`${BASE_URL}/${infoType}`);
    url.search = new URLSearchParams({ ...params, appid: API_KEY });

    return axios
        .get(url)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};
