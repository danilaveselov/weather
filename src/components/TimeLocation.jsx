import React from "react";
import { formatToLocalTime } from "../services/weatherService";
import { Typography, Box } from "@mui/material";

const TimeLocation = ({ weather: { dt, timezone, name, country } }) => {
  return (
    <Box sx={{ mt: 6 }}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
      >
        {name}, {country}
      </Typography>
      <Typography variant="h5" align="center" color="text.secondary" paragraph>
        {formatToLocalTime(dt, timezone)}
      </Typography>
    </Box>
  );
};

export default TimeLocation;
