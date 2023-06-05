import React from "react";
import {
    AppBar,
    Container,
    Toolbar,
    Typography,
    Box,
    Button,
} from "@mui/material";
import CloudIcon from "@mui/icons-material/Cloud";

import { WeatherSearch } from "./WeatherSearch";

export function Navbar({ setQuery, units, setUnits }) {
    const cities = ["London", "Exeter", "Andover", "Edinburgh", "Glasgow"];

    return (
        <AppBar position="static">
            <Container maxWidth="lg">
                <Toolbar>
                    <CloudIcon
                        sx={{ display: { xs: "none", sm: "flex" }, mr: 1 }}
                    />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "none", md: "flex" },
                            fontFamily: "monospace",
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Weather
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "none", lg: "flex" },
                        }}
                        justifyContent="flex-end"
                    >
                        {cities.map((city, idx) => (
                            <Button
                                key={idx}
                                onClick={() => setQuery({ q: city })}
                                sx={{ my: 2, color: "white", display: "block" }}
                            >
                                {city}
                            </Button>
                        ))}
                    </Box>
                    <WeatherSearch
                        setQuery={setQuery}
                        units={units}
                        setUnits={setUnits}
                    />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
