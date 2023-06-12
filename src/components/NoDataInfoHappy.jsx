import React from "react"
import { Grid, Typography } from "@mui/material";
import noData from "../images/noDataHappy.png"


export const NoDataInfoHappy = (props) => {
    console.log("No data Info")
    return(
        <Grid container alignItems="center">
            <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <img  style={{height:"35vh"}}src={noData} alt="Flowers in Chania"/>  
            </Grid>
            <Grid xs={12} style={{ display: "flex", justifyContent: "center" }}>
                <Typography  variant="h4" align="center" fontWeight= 'bold'>
                    {props.message}
                </Typography>
            </Grid>

        </Grid>
    )
}