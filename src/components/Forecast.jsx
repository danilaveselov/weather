import React from "react";
import { getIconUrl } from "../services/weatherService";
import { Box, Stack, Typography } from "@mui/material";

function Forecast({ title, items }) {
  return (
    <Box sx={{ mt: 8 }}>
      <Typography variant="h6" align="center" color="primary">
        {title}
      </Typography>
      <Stack
        sx={{ mt: 4 }}
        direction="row"
        justifyContent="center"
        textAlign="center"
        gap={4}
      >
        {items.map((item, index) => (
          <Stack key={index} gap={1}>
            <Typography color="text.secondary">{item.title}</Typography>
            <Box>
              <img src={getIconUrl(item.icon)} alt="Weather Icon" />
            </Box>
            <Typography color="text.secondary">
              {item.temp.toFixed()}°
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default Forecast;
