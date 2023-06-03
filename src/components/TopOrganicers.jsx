import React, { useState } from "react"
import { Grid, Typography } from "@mui/material";



export const TopOrganicers = (props) => {
    return (
        <Grid container style={{background: "rgba(70, 78, 95, 0.35)"}} rowSpacing={2}>
            <Grid item style={{ display: "flex", justifyContent: "center" }} xs={12}>
                <Typography  variant="h4" align="center" fontWeight= 'bold'>
                    Top Organizadores
                </Typography>
            </Grid>
            
            {props.data.length > 0 ?
                <>
                    <Grid item xs={6}>
                        <Typography  variant="h5" align="center" fontWeight= 'bold'>
                            Organizador
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography  variant="h5" align="center" fontWeight= 'bold'>
                            Asistencia a Eventos
                        </Typography>
                    </Grid>
                    
                    {props.data.map( (organizer, idx) => {
                        return (
                            <>
                                <Grid item xs={6}>
                                    <Typography  variant="h6" align="center" color="#FFFFFF">
                                        {organizer.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography  variant="h6" align="center" color="#FFFFFF">
                                        {organizer.amount}
                                    </Typography>
                                </Grid>
                         </>
                        );
                    })
                };
                </>
            : 
            <Grid item xs={12}>
                        <Typography  variant="h6" align="center">
                        No hay organizadores con asistencia
                        </Typography>
            </Grid>
                
        }
    </Grid>
    );
} 