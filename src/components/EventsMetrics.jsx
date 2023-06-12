import React from "react"
import { Grid } from "@mui/material";
import { EventStatus } from "./EventStatus";
import { AcredditedMetrics } from "./AcredditedMetrics";
import { TopOrganicers } from "./TopOrganicers";
import { AmountEvent } from "./AmountEvents";




  


export const EventsMetrics = () => {
   
    return (
            <>
                <Grid container display="flex" justifyContent="space-between" alignItems="center" rowSpacing={4} style={{marginBottom:20}}>

                    
                    <Grid item xs={12}>
                        <AcredditedMetrics
                        />
                    </Grid>
                    <Grid item xs={12}>
                    <AmountEvent
                           
                        />
                        

                    </Grid>
                    <Grid item xs={12} >
                    <Grid container xs= {12}  justifyContent="space-between" alignItems="center" >
                    <Grid item xs={5.5} >
                        <EventStatus
                        />
                    </Grid>
                    <Grid item xs={5.5}  style={{height: '100%'}}>
                    <TopOrganicers
                        />
                    </Grid>
                    </Grid>
                    </Grid>
                    
                    


                </Grid>

            </>
    );
}