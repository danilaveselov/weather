import { Box, Container } from "@mui/material";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CssBaseline from "@mui/material/CssBaseline";

import { Navbar } from "../Navbar";
import { TimeLocation } from "../TimeLocation";
import { WeatherDetails } from "../WeatherDetails";
import { Forecast } from "../Forecast";
import { HistoryTable } from "../HistoryTable";
import { useApp } from "./useApp";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export const App = () => {
    const { setQuery, units, setUnits, weather, weatherHistory } = useApp();

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
};
