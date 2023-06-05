import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CssBaseline from "@mui/material/CssBaseline";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

import { Navbar } from "./components/Navbar";
import { TimeLocation } from "./components/TimeLocation";
import { WeatherDetails } from "./components/WeatherDetails";
import { Forecast } from "./components/Forecast";
import { HistoryTable } from "./components/HistoryTable";
import { getFormattedWeatherData } from "./services/utils";
import { db } from "./firebase-config";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export function App() {
    const [query, setQuery] = useState({ q: "London" });
    const [units, setUnits] = useState("metric");
    const [weather, setWeather] = useState(null);
    // weatherHistory useState for displaying in HistoryTable component
    const [weatherHistory, setWeatherHistory] = useState([]);

    useEffect(() => {
        // Adding a new record to the firebase db
        const recordWeatherHistory = async (weatherData) => {
            const uniqueId =
                weatherData.country + weatherData.name + weatherData.dt;
            await setDoc(doc(db, "history", uniqueId), weatherData).catch(
                (err) => {
                    console.log(err);
                }
            );
        };
        // Getting history data from the firebase db
        const getWeatherHistory = async () => {
            const historyCollectionRef = collection(db, "history");
            const history = await getDocs(historyCollectionRef);
            const formattedHistory = history.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));
            setWeatherHistory(formattedHistory);
        };
        // Fetching the weather from OpenWeather, recording it and setting the required useStates
        const fetchWeather = async () => {
            const message = query.q ? query.q : "your location";
            toast.info("Getting the data for " + message);
            await getFormattedWeatherData({ ...query, units })
                .then((data) => {
                    toast.success(
                        `Data received for ${data.name}, ${data.country}`
                    );
                    recordWeatherHistory(data);
                    getWeatherHistory();
                    setWeather(data);
                })
                .catch((err) => {
                    toast.error("Failed to fetch data 😓");
                });
        };
        fetchWeather();
    }, [query, units]);

    return (
        <Box
            sx={{
                backgroundColor: "#c3daff",
                flex: 1,
                minHeight: "125vh",
            }}
        >
            <CssBaseline />
            <Navbar setQuery={setQuery} units={units} setUnits={setUnits} />
            <Container maxWidth="lg">
                {weather && (
                    <div>
                        <TimeLocation weather={weather} />
                        <WeatherDetails weather={weather} />
                        <Forecast
                            title="Hourly Forecast"
                            items={weather.hourly}
                        />
                        <Forecast
                            title="Daily Forecast"
                            items={weather.daily}
                        />
                    </div>
                )}
            </Container>
            <Container maxWidth="lg">
                <HistoryTable weatherHistory={weatherHistory} />
            </Container>
            <ToastContainer
                autoclose={1000}
                theme="colored"
                newestOnTop={true}
                draggable={false}
            />
        </Box>
    );
}
