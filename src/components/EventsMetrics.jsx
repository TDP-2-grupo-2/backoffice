import React from "react"
import { Grid } from "@mui/material";
import { EventStatus } from "./EventStatus";
import { AcredditedMetrics } from "./AcredditedMetrics";
import { TopOrganicers } from "./TopOrganicers";
import { AmountEvent } from "./AmountEvents";

export const dataEstadoEventos = [
    ["Tipo de Eventos", "Cantidad"],
    ["Activos", 11],
    ["Cancelados", 4],
    ["Suspendidos", 3],
    ["Borrador", 5],
    ["Finalizados", 7],
  ];

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
    ["Abr", 3],
    ["May", 5],
    ['Jun', 1],
    ['Jul', 3],
    ["Ago", 3]
]
  


export const EventsMetrics = (props) => {
   
    return (
            <>
                <Grid container  display="flex" justifyContent="space-between" alignItems="center" rowSpacing={3}>

                    
                    <Grid item xs={7}>
                        <AcredditedMetrics
                            data={dataAcredidatos}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TopOrganicers
                            data={dataOrganicers}
                        />

                    </Grid>
                    <Grid item xs={5}>
                        <EventStatus
                            data={dataEstadoEventos}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <AmountEvent
                            data={dataTimeEvent}
                        />
                    </Grid>


                </Grid>

            </>
    );
}