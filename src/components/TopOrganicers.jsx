import React, { useState, useEffect } from "react"
import { Grid, Typography } from "@mui/material";
import { NoDataInfo } from "./NoDataInfo";


export const TopOrganicers = () => {
    const [data, setData]= useState([])

    const APIURL = 'https://event-service-solfonte.cloud.okteto.net';

    async function getTopOrganizersMetrics(token) {
        console.log("obtengo organizadores")
        const paramsUpload = {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };
        let url = `${APIURL}/admins/statistics/events/top_organizers`
        const response = await fetch(
            url,
            paramsUpload
        );
        const jsonResponse = await response.json();
        //console.log(jsonResponse)
        if (response.status === 200){
            console.log(jsonResponse)
            let organizers = jsonResponse['message']
            //console.log(organizers)
            setData(organizers)
        }
    }


    useEffect( () => {
        getTopOrganizersMetrics(localStorage.getItem('token'));
      }, []);

    return (
        <Grid container style={{background: "rgba(70, 78, 95, 0.35)", borderRadius:15, padding:15, height:'545px'}} rowSpacing={2}>
            <Grid item style={{ display: "flex", justifyContent: "center" }} xs={12}>
                <Typography  variant="h4" align="center" fontWeight= 'bold'>
                    Top Organizadores
                </Typography>
            </Grid>
            
            {data.length > 0 ?
                <>
                    <Grid item xs={6}>
                        <Typography  variant="h5" align="center" fontWeight= 'bold'>
                            Organizador
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography  variant="h5" align="center" fontWeight= 'bold'>
                            Asistencia a Eventos(%)
                        </Typography>
                    </Grid>
                    
                    {data.map( (organizer, idx) => {
                        return (
                            <>
                                <Grid item xs={6}>
                                    <Typography  variant="h6" align="center" color="#FFFFFF">
                                        {organizer.ownerName}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography  variant="h6" align="center" color="#FFFFFF">
                                        {organizer.coeficient.toFixed(2)}
                                    </Typography>
                                </Grid>
                         </>
                        )
                    })
                }
                </>
            : 
            <Grid item xs={12}>
                        <NoDataInfo 
                    message={"No hay organizadores con eventos acreditados"} 
                />
              
            </Grid>
                
        }
    </Grid>
    );
} 