import React, { useState } from "react"
import { Grid, Typography } from "@mui/material";
import { MetricsChart } from "./MetricsChart";
import { FilterMetrics } from "./FilterMetrics";

export const options = {
    is3D: true,
    backgroundColor: 'transparent',
    legend: { position: "bottom" },
    hAxis: {
        title: "Tiempo",
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
        title: "Cantidad",
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
      width:"65vw",
      height:"20vw",
  };


export const AmountEvent = (props) => {
    const [statusInfo, setStatusInfo] = useState({'data': props.data, 'options': options, type:'LineChart'})
    const [filters, setFilters] = useState({'since': null, 'to': null , 'type': ""})
    return (
        <>
        <Grid container style={{background: "rgba(70, 78, 95, 0.35)"}}  justifyContent="space-evenly" alignItems="center" >
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <Typography  variant="h4" align="center" fontWeight= 'bold'>
                    Cantidad de Eventos
                </Typography>
            </Grid>
            <Grid item xs={9} style={{ display: "flex", justifyContent: "start" }}>
                <MetricsChart
                    info={statusInfo}
                />
            </Grid>
            <Grid xs={2} >
                <FilterMetrics
                    filters={filters}
                    setFilters={setFilters}
                />

            </Grid>

            
        </Grid>
        </>

    );
}