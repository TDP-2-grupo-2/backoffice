import React, { useState } from "react"
import { Box } from "@mui/material";
import { EventStatus } from "./EventStatus";
import { AcredditedMetrics } from "./AcredditedMetrics";

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
  


export const EventsMetrics = (props) => {
   
    return (
            <>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <EventStatus
                        data={dataEstadoEventos}
                    />

                    <AcredditedMetrics
                        data={dataAcredidatos}
                    />

                </Box>

            </>
    );
}