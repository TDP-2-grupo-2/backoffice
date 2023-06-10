import React, { useState, useEffect } from "react"
import { Grid, Typography } from "@mui/material";
import { MetricsChart } from "./MetricsChart";
import { FilterMetrics } from "./FilterMetrics";
import { NoDataInfo } from "./NoDataInfo";

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
      height:"35vh",
  };

  const APIURL = 'https://event-service-solfonte.cloud.okteto.net';

  function get_url(filters){
    console.log("vuelvo a hacer el request")
    let url = ""
    if (filters.since !== null && filters.to !== null){
        console.log("cambio since y to")
        url = `${APIURL}/admins/statistics/events/amount?from_date=${filters.since}&to_date=${filters.to}`
        console.log(url)
    }
    else if (filters.since !== null){
        console.log("cambio since ")
        url = `${APIURL}/admins/statistics/events/amount?from_date=${filters.since}`
        console.log(url)
    } else if (filters.to !== null){
        console.log("cambio to")
        url = `${APIURL}/admins/statistics/events/amount?to_date=${filters.to}`
        console.log(url)
    }else{
        url = `${APIURL}/admins/statistics/events/amount`;
    }
    return url
  }


export const AmountEvent = () => {
    const [statusInfo, setStatusInfo] = useState({'data': [], 'options': options, type:'LineChart'})
    const [filters, setFilters] = useState({'since': null, 'to': null , 'type': ""})

    async function getAmountEventsMetrics(token){
        console.log("busco eventos")
        const paramsUpload = {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };
        let url = get_url(filters)
        
        const response = await fetch(
            url,
            paramsUpload
        );
        const jsonResponse = await response.json();
        console.log(jsonResponse)
        if (response.status === 200){
            console.log(jsonResponse)
            let evenstAmount = jsonResponse['message'];
            let info = [];
            evenstAmount.forEach(element => info.push([element.dateOfCreation, element.amount_of_events]));
            if (info.length > 0){
                info.unshift( ["Fecha", "Cantidad"])
                console.log(info)
            }
            setStatusInfo({...statusInfo, 
                            data: info, 
                         })
            console.log(statusInfo)
        }
    }
    useEffect( () => {
        getAmountEventsMetrics(localStorage.getItem('token'));
    }, [filters]);

    return (
        <>
        <Grid container style={{background: "rgba(70, 78, 95, 0.35)"}}  justifyContent="space-evenly" alignItems="center" >
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <Typography  variant="h4" align="center" fontWeight= 'bold'>
                    Cantidad de Eventos
                </Typography>
            </Grid>
            {statusInfo.data.length > 0 ?
                <Grid item xs={10} style={{ display: "flex", justifyContent: "center" }}>
                    <MetricsChart
                        info={statusInfo}
                    />
                </Grid>
            : <Grid item xs={10} style={{ display: "flex", justifyContent: "center" }}>
                <NoDataInfo 
                    message={"No hay eventos para el rango de fecha seleccionado"} 
                />
            </Grid>
            }
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