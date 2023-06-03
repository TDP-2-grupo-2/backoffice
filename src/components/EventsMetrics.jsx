import React, { useState } from "react"
import { Box } from "@mui/material";
import { EventStatus } from "./EventStatus";

export const data = [
    ["Tipo de Eventos", "Cantidad"],
    ["Activos", 11],
    ["Cancelados", 4],
    ["Suspendidos", 3],
    ["Borrador", 5],
    ["Finalizados", 7],
  ];
  


export const EventsMetrics = (props) => {
   
    return (
            <>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <EventStatus
                        data={data}
                    />
                </Box>
            </>
    );
}