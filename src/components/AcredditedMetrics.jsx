import React, { useState, useEffect } from "react"
import { Grid, Typography } from "@mui/material";
import { MetricsChart } from "./MetricsChart";
import { FilterMetrics } from "./FilterMetrics";
import { NoDataInfo } from "./NoDataInfo";


export const options = {
    backgroundColor: 'transparent',
    legend: {'position':'bottom','alignment':'center'},
    colors: ['#64B5F6'],
    hAxis: {
        title: "Meses",
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
    width:"65vw",
    height:"40vh",
  };

  const APIURL = 'https://event-service-solfonte.cloud.okteto.net';

  const type_of_filter = {"months": "Meses", "years": "Años", "days": "Dias"}
  function get_url(filters) {
    console.log("vuelvo a hacer el request")
    let url = ""
    if (filters.since !== null && filters.to !== null){
        console.log("cambio since y to")
        url = `${APIURL}/admins/statistics/events/registered_entries?from_date=${filters.since}&to_date=${filters.to}&scale_type=${filters.type}`
        console.log(url)
    }
    else if (filters.since !== null){
        console.log("cambio since ")
        url = `${APIURL}/admins/statistics/events/registered_entries?from_date=${filters.since}&scale_type=${filters.type}`
        console.log(url)
    } else if (filters.to !== null){
        console.log("cambio to")
        url = `${APIURL}/admins/statistics/events/registered_entries?to_date=${filters.to}&scale_type=${filters.type}`
        console.log(url)

    }else{
        url = `${APIURL}/admins/statistics/events/registered_entries?scale_type=${filters.type}`;
    }
    return url
}


export const AcredditedMetrics = () => {
    
    const [statusInfo, setStatusInfo] = useState({'data': [], 'options': options, type:'ColumnChart'})
    const [filters, setFilters] = useState({'since': null, 'to': null, 'type': "months"})


    async function getAccreditedMetrics(token) {
        console.log("busco acreditaciones")
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
            let evenstStatusAmount = jsonResponse['message'];
            let info = [];
            evenstStatusAmount.forEach(element => info.push([element.entry_timestamp, element.amount_of_entries]));
            if (info.length > 0){
                info.unshift( ["Fecha", "Acreditaciones"])
                console.log(info)
            }
            options['hAxis']['title'] = type_of_filter[filters['type']]
            setStatusInfo({...statusInfo, 
                            options: options,
                            data: info, 
                         })
            console.log(statusInfo)
        }

    }

    useEffect( () => {
        getAccreditedMetrics(localStorage.getItem('token'));
      }, [filters]);
    return (
        <>
        <Grid container style={{background: "rgba(70, 78, 95, 0.35)", borderRadius:15, padding:15}}  justifyContent="center" alignItems="center">
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }} >
                <Typography  variant="h4" align="center" fontWeight= 'bold'>
                    Cantidad de Acreditados
                </Typography>
            </Grid>
            {statusInfo.data.length > 0?
                <Grid item xs={10} style={{ display: "flex", justifyContent: "center" }}>
                    <MetricsChart
                        info={statusInfo}
                    />
                </Grid>
            : <Grid item xs={10} style={{ display: "flex", justifyContent: "center" }}>
                <NoDataInfo 
                    message={"No hay acreditaciones para el rango de fecha seleccionado"} 
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