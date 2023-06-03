import React, { useState } from "react"
import { Box, Typography } from "@mui/material";
import { MetricsChart } from "./MetricsChart";

export const options = {
    is3D: true,
    backgroundColor: 'transparent',
    legend: {'position':'bottom','alignment':'start', maxLines: 5},
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    chartArea: {top:50,bottom:30,right:0,left:50, 'width': '100%' },
    width:550,
    height:300,
  };


export const EventStatus = (props) => {
    const [statusInfo, setStatusInfo] = useState({'data': props.data, 'options': options, type:'PieChart'})
    return (
        <>
        <Box style={{background: "rgba(70, 78, 95, 0.35)"}}>
            <Typography  variant="h4" align="center">
                Tipo de Eventos
            </Typography>
            <MetricsChart
                info={statusInfo}
            />

            
        </Box>
        </>

    );
}