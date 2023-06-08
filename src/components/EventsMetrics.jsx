import React from "react"
import { Grid } from "@mui/material";
import { EventStatus } from "./EventStatus";
import { AcredditedMetrics } from "./AcredditedMetrics";
import { TopOrganicers } from "./TopOrganicers";
import { AmountEvent } from "./AmountEvents";



  export const dataAcredidatos = [
    ["Fecha", "Acreditaciones"],
    ["2020", 1000],
    ["2021", 1170],
    ["2022", 660],
    ["2023", 1030],
  ];

  export const dataOrganicers = [
    {'name': 'roberto','amount': 45}, 
    {'name': 'raul', 'amount': 33}, 
    {'name': 'juieta', 'amount':20},
    {'name': 'pedro', 'amount': 15},
    {'name': 'emilia', 'amount': 10}
]

export const dataTimeEvent = [
    ["Tiempo", "Cantidad de Eventos"],
    ["Abr", 10],
    ["May", 5],
    ['Jun', 1],
    ['Jul', 8],
    ["Ago", 3]
]
  


export const EventsMetrics = () => {
   
    return (
            <>
                <Grid container  display="flex" justifyContent="space-between" alignItems="center" rowSpacing={6}>

                    
                    <Grid item xs={12}>
                        <AcredditedMetrics
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <AmountEvent
                            data={dataTimeEvent}
                        />
                        

                    </Grid>
                    <Grid item xs={5.5}  style={{height: '50vh'}}>
                        <EventStatus
                        />
                    </Grid>
                    <Grid item xs={5.5}  style={{height: '50vh'}}>
                    <TopOrganicers
                        />
                    </Grid>


                </Grid>

            </>
    );
}