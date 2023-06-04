import React, { useState, useEffect } from "react"
import { Grid, Typography } from "@mui/material";
import { MetricsChart } from "./MetricsChart";

export const options = {
    is3D: true,
    backgroundColor: 'transparent',
    legend: {'position':'bottom','alignment':'center', maxLines: 5},
    colors: ['#004242','#2F686F', '#63899E', '#5AB0C7', '#33A9C4', '#48E9F1'],
    chartArea: {'width': '45vw' },
    width:"45vw",
    height:"20vw",
    sliceVisibilityThreshold :0
  };





export const EventStatus = (props) => {
    const [statusInfo, setStatusInfo] = useState({'data': [], 'options': options, type:'PieChart'})

    const APIURL = 'https://event-service-solfonte.cloud.okteto.net';

    async function getEventsStatusMetrics(token) {
        const paramsUpload = {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };
        let url = `${APIURL}/admins/statistics/events/types`;
        const response = await fetch(
            url,
            paramsUpload
        );
        const jsonResponse = await response.json();
        if (response.status === 200){
            console.log(jsonResponse)
            let evenstStatusAmount = jsonResponse['message']
            
            let info = Object.entries(evenstStatusAmount);
            info.unshift( ["Tipo de Eventos", "Cantidad"])
            console.log(info)
            setStatusInfo({...statusInfo, 
                            data: info, 
                         })
            console.log(statusInfo)
        }

    }

    useEffect( () => {
        getEventsStatusMetrics(localStorage.getItem('token'));
      }, []);

    return (
        <>
        <Grid container style={{background: "rgba(70, 78, 95, 0.35)" , minHeight:"20vw"}} >
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <Typography  variant="h4" align="center" fontWeight= 'bold'>
                    Estado de Eventos
                </Typography>
            </Grid>
            {statusInfo.data.length > 0 ?
                <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                    <MetricsChart
                        info={statusInfo}
                    />
                </Grid>
            : <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <Typography  variant="h5" align="center" fontWeight= 'bold'>
                    No hay eventos para la fecha dada
                </Typography>
            </Grid>
            }

            
        </Grid>
        </>

    );
}