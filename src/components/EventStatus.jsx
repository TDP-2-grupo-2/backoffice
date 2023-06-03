import React, { useState } from "react"
import { Box, Typography } from "@mui/material";
import { PieChart } from "./PieChart";

export const options = {
    is3D: true,
    backgroundColor: 'transparent',
    legend: {'position':'bottom','alignment':'center'},
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    width:700,
    height:300,
  };


export const EventStatus = (props) => {
    const [statusInfo, setStatusInfo] = useState({'data': props.data, 'options': options})
    return (
        <>
        <Box style={{background: "rgba(70, 78, 95, 0.35)"}}>
            <Typography  variant="h4" align="center">
                Tipo de Eventos
            </Typography>
            <PieChart 
                info={statusInfo}
            />

            
        </Box>
        </>

    );
}