import React from "react";

import { Paper, InputBase, Divider, IconButton } from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";
import { useWeatherSearch } from "./useWeatherSearch";

export const WeatherSearch = ({ setQuery, units, setUnits }) => {
    const {
        city,
        setCity,
        handleUnitsChange,
        handleSearchClick,
        handleLocationClick,
    } = useWeatherSearch({ setQuery, units, setUnits });

    return (
        <Paper
            component="form"
            onSubmit={handleSearchClick}
            sx={{ display: "flex", alignItems: "center", ml: 6 }}
        >
            <IconButton
                onClick={handleLocationClick}
                color="primary"
                sx={{ p: "10px" }}
                aria-label="menu"
            >
                <LocationOnIcon />
            </IconButton>
            <InputBase
                value={city}
                onChange={(e) => setCity(e.currentTarget.value)}
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                inputProps={{ "aria-label": "search weather" }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
                name="metric"
                onClick={handleUnitsChange}
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
            >
                °C
            </IconButton>
            <IconButton
                name="imperial"
                onClick={handleUnitsChange}
                color="primary"
                sx={{ p: "10px" }}
                aria-label="directions"
            >
                °F
            </IconButton>
        </Paper>
    );
};
