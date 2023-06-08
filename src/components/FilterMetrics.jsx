import React, { useState } from "react"
import { Grid, MenuItem, Select, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';



export const FilterMetrics = (props) => {
    console.log("estoy en filtro de metricas")
    const onChangeFilter = (change, value) => {
        let filter = {...props.filters};
        console.log(value)
        if (change === "since" || change === 'to'){
            let new_Date = dayjs(new Date(value.toISOString()))
            const month = new_Date.$M  +  1
            value = new_Date.$y + "-" + month  + "-" + new_Date.$D
            console.log(value)
        }
        filter[change] = value
        props.setFilters(filter)
        console.log(props.filters)
    }
    console.log(props.filters.type)
    return (
        
        <Grid container spacing={2} display="flex" justifyContent="space-between" alignItems="center">
            <Grid style={{ display: "flex", justifyContent: "center" }} xs={12}>
                <Typography  variant="h4" align="center" color="#FFFFFF">
                    Filtros
                </Typography>        
            </Grid>
            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Desde"
                        fullWidth
                        value={props.filters.since}
                        maxDate={dayjs(props.filters.to) || dayjs(Date.now())}
                        onChange={(event) => {onChangeFilter("since",event)}}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Hasta"
                        fullWidth
                        minDate={dayjs(props.filters.since)}
                        maxDate={dayjs(Date.now())}
                        value={props.filters.to}
                        onChange={(event) => {onChangeFilter("to",event)}}
                    />
                </LocalizationProvider>
            </Grid>
            { props.filters.type !== "" &&
                <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-start" }}>
                    <Select
                        defaultValue={props.filters.type }
                        onChange={(event) => {onChangeFilter("type",event.target.value)}}
                        fullWidth
                        label="Tipo"
                        >
                        <MenuItem value={"years"}>Años</MenuItem>
                        <MenuItem value={"months"}>Meses</MenuItem>
                        <MenuItem value={"days"}>Dias</MenuItem>
                    </Select>
                </Grid>
            }

        </Grid>
    )
}