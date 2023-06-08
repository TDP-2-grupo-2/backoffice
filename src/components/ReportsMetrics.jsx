import React, { useState , useEffect} from "react"
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { ReportCard } from "./ReportCard";

export const ReportsMetrics = (props) => {
    const [ motivo, setMotivo ] = useState( 'category' );
    const [ reports, setReports ] = useState( [3,23,2,4] );
    useEffect( () => {
        //getReportEvents(localStorage.getItem('token'), dateFilter);
      }, [ motivo]);
   
    return (
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <Grid item xs={4}>
                <FormControl fullWidth>
                <InputLabel id="category_report">Agrupar por</InputLabel>
                <Select
                labelId="category_report"
                id="demo-simple-select"
                value={motivo}
                label="Agrupar por"
                onChange={(event) => {setMotivo(event.target.value)}}
                >
                <MenuItem value={'category'}>Categoria</MenuItem>
                <MenuItem value={'denuncia'}>Denuncia</MenuItem>
                </Select>
                </FormControl>
            </Grid>
        </Grid>

        {reports.length > 0?
            <Grid item xs={12}>
                {reports.map(evento => <ReportCard key={evento.eventId} titleLabel={motivo == 'category'? 'Tipo de categoria: ':'Tipo de denuncia: '} report = {evento}> </ReportCard>)}
            </Grid>
            :
            <></>
        }
        


      </Grid>
    );
}