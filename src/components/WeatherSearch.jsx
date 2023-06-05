import React from "react";
import { useState } from "react";

import { Paper, InputBase, Divider, IconButton } from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import SearchIcon from "@mui/icons-material/Search";

export const WeatherSearch = ({ setQuery, units, setUnits }) => {
    const [city, setCity] = useState("");

    const handleUnitsChange = (e) => {
        const selectedUnit = e.currentTarget.name;
        if (units !== selectedUnit) setUnits(selectedUnit);
    };

    const handleSearchClick = (e) => {
        e.preventDefault();
        if (city !== "") setQuery({ q: city });
    };

    const handleLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                setQuery({
                    lat,
                    lon,
                });
            });
        }
    };

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
