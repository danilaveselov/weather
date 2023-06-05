import React, { useState } from "react";
import { groupBy } from "lodash";
import {
    Box,
    Collapse,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Paper,
    IconButton,
    Pagination,
    TableSortLabel,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { formatToLocalTime } from "../services/utils";

const Row = ({ city, history }) => {
    // Handles opening/closing the collapsible table
    const [open, setOpen] = useState(false);
    // Handles updating the page once on pagination
    const [page, setPage] = useState(1);
    // Handles sorting based on provided column
    const [sorting, setSorting] = useState({ column: null, order: "asc" });
    // 20 items per page, as suggested
    const itemsPerPage = 20;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleSort = (column) => {
        setSorting((prevSorting) => {
            if (prevSorting.column === column) {
                // Toggle sorting order if the same column is clicked
                return {
                    column,
                    order: prevSorting.order === "asc" ? "desc" : "asc",
                };
            } else {
                // Set sorting column and order for a new column
                return {
                    column,
                    order: "asc",
                };
            }
        });
    };
    // Sorting logic using spread operator and sort() function
    const sortedHistory = [...history].sort((a, b) => {
        switch (sorting.column) {
            case "dateTime":
                const dateA = new Date(a.dt);
                const dateB = new Date(b.dt);
                return sorting.order === "asc" ? dateA - dateB : dateB - dateA;
            case "tempMin":
                return sorting.order === "asc"
                    ? a.temp_min - b.temp_min
                    : b.temp_min - a.temp_min;
            case "tempMax":
                return sorting.order === "asc"
                    ? a.temp_max - b.temp_max
                    : b.temp_max - a.temp_max;
            case "temp":
                return sorting.order === "asc"
                    ? a.temp - b.temp
                    : b.temp - a.temp;
            default:
                return 0;
        }
    });

    const slicedHistory = sortedHistory.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return (
        <React.Fragment>
            <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <KeyboardArrowUpIcon />
                        ) : (
                            <KeyboardArrowDownIcon />
                        )}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {city}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell
                    style={{ paddingBottom: 0, paddingTop: 0 }}
                    colSpan={6}
                >
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography
                                variant="h6"
                                gutterBottom
                                component="div"
                            >
                                Weather History
                            </Typography>
                            <Table size="small" aria-label="weather history">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>
                                            <TableSortLabel
                                                active={
                                                    sorting.column ===
                                                    "dateTime"
                                                }
                                                direction={
                                                    sorting.column ===
                                                    "dateTime"
                                                        ? sorting.order
                                                        : "asc"
                                                }
                                                onClick={() =>
                                                    handleSort("dateTime")
                                                }
                                            >
                                                DateTime
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={
                                                    sorting.column === "tempMin"
                                                }
                                                direction={
                                                    sorting.column === "tempMin"
                                                        ? sorting.order
                                                        : "asc"
                                                }
                                                onClick={() =>
                                                    handleSort("tempMin")
                                                }
                                            >
                                                Temp Min
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={
                                                    sorting.column === "tempMax"
                                                }
                                                direction={
                                                    sorting.column === "tempMax"
                                                        ? sorting.order
                                                        : "asc"
                                                }
                                                onClick={() =>
                                                    handleSort("tempMax")
                                                }
                                            >
                                                Temp Max
                                            </TableSortLabel>
                                        </TableCell>
                                        <TableCell>
                                            <TableSortLabel
                                                active={
                                                    sorting.column === "temp"
                                                }
                                                direction={
                                                    sorting.column === "temp"
                                                        ? sorting.order
                                                        : "asc"
                                                }
                                                onClick={() =>
                                                    handleSort("temp")
                                                }
                                            >
                                                Temp
                                            </TableSortLabel>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {slicedHistory.map((historyRow, index) => (
                                        <TableRow key={index}>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {formatToLocalTime(
                                                    historyRow.dt,
                                                    historyRow.timezone,
                                                    "dd/MM/yyyy HH:mm"
                                                )}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {historyRow.temp_min}°
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {historyRow.temp_max}°
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                            >
                                                {historyRow.temp}°
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination
                                count={Math.ceil(
                                    sortedHistory.length / itemsPerPage
                                )}
                                page={page}
                                onChange={handlePageChange}
                                shape="rounded"
                            />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

export const HistoryTable = (weatherHistory) => {
    const data = groupBy(weatherHistory.weatherHistory, "name");
    const historyArray = Object.entries(data).map(([city, history]) => ({
        city,
        history,
    }));

    return (
        <TableContainer component={Paper} sx={{ mt: 12 }}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        <TableCell>History by Location</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {historyArray.map(({ city, history }) => (
                        <Row key={city} city={city} history={history} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};
