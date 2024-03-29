import React, { useState, useEffect } from "react"
import { Grid, Typography } from "@mui/material";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { NoDataInfo } from "./NoDataInfo";
import { MetricsChart } from "./MetricsChart";


export const options = {
    is3D: true,
    backgroundColor: 'transparent',
    legend: {'position':'bottom','alignment':'center', maxLines: 5},
    colors: ['#004242','#2F686F', '#63899E', '#5AB0C7', '#33A9C4'],
    chartArea: {'width': '50vw' },
    width:"50vw",
    height:"45vh",
    sliceVisibilityThreshold :0
  };


export const EventStatus = (props) => {
    const [statusInfo, setStatusInfo] = useState({'data': [], 'options': options, type:'PieChart'})
    const [dateFilter, setDateFilter] = useState(null)

    const APIURL = 'https://event-service-solfonte.cloud.okteto.net';

    async function getEventsStatusMetrics(token) {
        const paramsUpload = {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };
        let url = ""
        if (dateFilter !== null){
            url = `${APIURL}/admins/statistics/events/status?from_date=${dateFilter}`
            console.log(url)
        }else{
            url = `${APIURL}/admins/statistics/events/status`;
        }
        const response = await fetch(
            url,
            paramsUpload
        );
        const jsonResponse = await response.json();
        if (response.status === 200){
            //console.log(jsonResponse)
            let evenstStatusAmount = jsonResponse['message']
            
            let info = Object.entries(evenstStatusAmount);
            
            console.log("ANTESS")
            console.log(info)
            if (info.length > 0){
                console.log("ESTOY ACAAA")
                console.log(info[0][0])
                //info[0][0] = 'finalizado'
               
                //info.splice(4, 1);
                info.unshift( ["Tipo de Eventos", "Cantidad"])
                console.log(info)
            }
            setStatusInfo({...statusInfo, 
                            data: info, 
                         })
            console.log(statusInfo)
        }

    }
    const onChangeDate = (event) => {
        let new_Date = dayjs(new Date(event.toISOString()))
        const month = new_Date.$M  +  1
        console.log(new_Date.$y + "-" + month  + "-" + new_Date.$D)
        setDateFilter(new_Date.$y + "-" + month  + "-" + new_Date.$D)
    }

    useEffect( () => {
        getEventsStatusMetrics(localStorage.getItem('token'));
      }, [dateFilter]);

    return (
        <>
        <Grid container style={{background: "rgba(70, 78, 95, 0.35)" , minHeight:"20vw", borderRadius:15, padding:15,height:'545px'}} spacing={2} >
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <Typography  variant="h4" align="center" fontWeight= 'bold'>
                    Estado de Eventos
                </Typography>
            </Grid>
            <Grid item xs={12} style={{ display: "flex", justifyContent: "start" }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Desde"
                        value={dateFilter}
                        maxDate={dayjs(Date.now())}
                        slotProps={{ textField: { helperText: 'Hasta el dia de la fecha' } }}
                        onChange={(event) => {onChangeDate(event)}}
                    />
                </LocalizationProvider>
            </Grid>
            {statusInfo.data.length > 0 ?
                <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                    <MetricsChart
                        info={statusInfo}
                    />
                </Grid>
            : <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <NoDataInfo 
                    message={"No hay eventos para el rango de fecha seleccionado"} 
                />
              </Grid>
            }

            
        </Grid>
        </>

    );
}