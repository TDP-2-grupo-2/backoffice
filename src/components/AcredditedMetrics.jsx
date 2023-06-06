import React, { useState } from "react"
import { Grid, Typography } from "@mui/material";
import { MetricsChart } from "./MetricsChart";
import { FilterMetrics } from "./FilterMetrics";
import { NoDataInfo } from "./NoDataInfo";


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
    width:"65vw",
    height:"35vh",
  };



export const AcredditedMetrics = (props) => {
    console.log(props.data)
    const [statusInfo, setStatusInfo] = useState({'data': props.data, 'options': options, type:'ColumnChart'})
    const [filters, setFilters] = useState({'since': null, 'to': null, 'type': "Años"})
    return (
        <>
        <Grid container style={{background: "rgba(70, 78, 95, 0.35)"}}  justifyContent="center" alignItems="center">
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }} >
                <Typography  variant="h4" align="center" fontWeight= 'bold'>
                    Cantidad de Acreditados
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