import { useState } from "react";

export const useWeatherSearch = ({ setQuery, units, setUnits }) => {
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

    return {
        city,
        setCity,
        handleUnitsChange,
        handleSearchClick,
        handleLocationClick,
    };
};
