import React from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { getIconUrl, formatToLocalTime } from "../services/weatherService";
import {
  ArrowDownwardIcon,
  ArrowUpwardIcon,
  DeviceThermostatIcon,
  WbSunnyIcon,
  WbTwilightIcon,
  WaterDropIcon,
  WindPowerIcon,
} from "@mui/icons-material";

const WeatherDetails = ({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  },
}) => {
  return (
    <Box>
      <Typography variant="h6" align="center" color="primary">
        {details}
      </Typography>
      <Grid container justify="space-around" spacing={8}>
        <Grid item xs>
          <img src={getIconUrl(icon)} alt="Weather Icon" />
        </Grid>
        <Grid item xs>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="inherit"
          >
            {`${temp.toFixed()}°`}
          </Typography>
        </Grid>
        <Grid item xs>
          <Stack gap={1}>
            <Typography display="flex" color="text.secondary">
              <DeviceThermostatIcon />
              Feels like: {feels_like.toFixed()}°
            </Typography>
            <Typography display="flex" color="text.secondary">
              <WaterDropIcon />
              Humidity: {humidity}%
            </Typography>
            <Typography display="flex" color="text.secondary">
              <WindPowerIcon />
              Wind speed: {speed.toFixed()} km/h
            </Typography>
          </Stack>
        </Grid>
      </Grid>
      <Stack sx={{ mt: 4 }} direction="row" justifyContent="center" gap={4}>
        <Typography display="flex" color="text.secondary">
          <WbSunnyIcon />
          Rise: {formatToLocalTime(sunrise, timezone, "hh:mm a")}
        </Typography>
        <Typography display="flex" color="text.secondary">
          <WbTwilightIcon />
          Set: {formatToLocalTime(sunset, timezone, "hh:mm a")}
        </Typography>
        <Typography display="flex" color="text.secondary">
          <ArrowUpwardIcon />
          High: {`${temp_max.toFixed()}°`}
        </Typography>
        <Typography display="flex" color="text.secondary">
          <ArrowDownwardIcon />
          Low: {`${temp_min.toFixed()}°`}
        </Typography>
      </Stack>
    </Box>
  );
};

export default WeatherDetails;
