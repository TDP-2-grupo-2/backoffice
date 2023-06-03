import React, { useState } from "react"
import { Grid, Typography } from "@mui/material";
import { MetricsChart } from "./MetricsChart";
import { FilterMetrics } from "./FilterMetrics";

export const options = {
    backgroundColor: 'transparent',
    legend: {'position':'bottom','alignment':'center'},
    colors: ['#64B5F6'],
    hAxis: {
        title: "Año",
        textStyle: {
            fontSize: 15,
            color: '#000000',
            bold: false,
            italic: false
          },
          titleTextStyle: {
            fontSize: 18,
            color: '#053061',
            bold: true,
            italic: false
          }
    },
    vAxis: {
        title: "Acreditados",
        textStyle: {
            fontSize: 15,
            color: '#000000',
            bold: false,
            italic: false
          },
          titleTextStyle: {
            fontSize: 18,
            color: '#053061',
            bold: true,
            italic: false
          }
    },
    width:600,
    height:300,
  };



export const AcredditedMetrics = (props) => {
    console.log(props.data)
    const [statusInfo, setStatusInfo] = useState({'data': props.data, 'options': options, type:'ColumnChart'})
    const [filters, setFilters] = useState({'since': null, 'type': "Años"})
    return (
        <>
        <Grid container style={{background: "rgba(70, 78, 95, 0.35)"}} >
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <Typography  variant="h4" align="center" fontWeight= 'bold'>
                    Cantidad de Acreditados
                </Typography>
            </Grid>
            <Grid xs={8} >
                <MetricsChart
                    info={statusInfo}
                />
            </Grid>
            <Grid xs={3}>
                <FilterMetrics
                    filters={filters}
                    setFilters={setFilters}
                />

            </Grid>

            
        </Grid>
        </>

    );
}