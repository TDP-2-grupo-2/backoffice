import React, { useState , useEffect} from "react"
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const ReportCard = (props) => {
    const [ motivo, setMotivo ] = useState( 'category' );
    const [ reports, setReports ] = useState( [] );
    useEffect( () => {
      }, [ motivo]);
   
    return (
        <Grid container spacing={2}       
            sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 500,
            flexGrow: 1,
            backgroundColor: '#6C8C97',
          }}>
            <Grid item xs={8}>
                <p>asdsada</p>
            </Grid>

            <Grid item xs={4}>
                <p>asdsada</p>
            </Grid>

        


      </Grid>
    );
}