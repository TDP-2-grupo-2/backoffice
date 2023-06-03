import React, { useState } from "react"
import { Grid, Typography } from "@mui/material";
import { MetricsChart } from "./MetricsChart";

export const options = {
    is3D: true,
    backgroundColor: 'transparent',
    legend: {'position':'bottom','alignment':'start', maxLines: 5},
    colors: ['#2F686F', '#63899E', '#5AB0C7', '#33A9C4', '#48E9F1'],
    chartArea: {top:50,bottom:30,right:0,left:50, 'width': '100%' },
    width:550,
    height:300,
  };


export const EventStatus = (props) => {
    const [statusInfo, setStatusInfo] = useState({'data': props.data, 'options': options, type:'PieChart'})
    return (
        <>
        <Grid container style={{background: "rgba(70, 78, 95, 0.35)"}} >
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <Typography  variant="h4" align="center">
                    Tipo de Eventos
                </Typography>
            </Grid>
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <MetricsChart
                    info={statusInfo}
                />
            </Grid>

            
        </Grid>
        </>

    );
}