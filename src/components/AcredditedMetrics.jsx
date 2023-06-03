import React, { useState } from "react"
import { Box, Typography } from "@mui/material";
import { MetricsChart } from "./MetricsChart";

export const options = {
    backgroundColor: 'transparent',
    width:500,
    height:300,
  };


  


export const AcredditedMetrics = (props) => {
    console.log(props.data)
    const [statusInfo, setStatusInfo] = useState({'data': props.data, 'options': options, type:'ColumnChart'})
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