import React, { useState } from "react"
import { Grid, MenuItem, Select, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';




export const FilterMetrics = (props) => {
    console.log("estoy en filtro de metricas")
    const onChangeFilter = (change, value) => {
        let filter = props.filters;
        console.log(value)
        filter[change] = value
        props.setFilters(filter)
        console.log(props.filters)
    }
    console.log(props.filters.type)
    return (
        
        <Grid container spacing={2} display="flex" justifyContent="space-between" alignItems="center">
            <Grid style={{ display: "flex", justifyContent: "center" }} xs={12}>
                <Typography  variant="h4" align="center">
                    Filtros
                </Typography>        
            </Grid>
            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Desde"
                        value={props.filters.since}
                        onChange={(event) => {onChangeFilter("since",event)}}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                <Select
                    defaultValue={props.filters.type }
                    onChange={(event) => {onChangeFilter("type",event.target.value)}}
                    fullWidth
                    label="Tipo"
                    >
                    <MenuItem value={"Años"}>Años</MenuItem>
                    <MenuItem value={"Meses"}>Meses</MenuItem>
                    <MenuItem value={"Semanas"}>Semanas</MenuItem>
                </Select>
            </Grid>

        </Grid>
    )
}