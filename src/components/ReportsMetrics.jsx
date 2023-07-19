import React, { useState , useEffect} from "react"
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { ReportCard } from "./ReportCard";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { FilterMetrics } from "./FilterMetrics";
import { NoDataInfoHappy } from "./NoDataInfoHappy";


const APIURL = 'https://event-service-solfonte.cloud.okteto.net';

export const ReportsMetrics = (props) => {
    const [ motivo, setMotivo ] = useState( 'category' );
    const [ reports, setReports ] = useState( [] );
    const [filters, setFilters] = useState({'since': null, 'to': null , 'type': ""})

    async function getReportPerType(token){

        const paramsUpload = {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };
        let url;
        if(motivo == 'category'){
            url =`${APIURL}/admins/statistics/reports/event_types`
        }else{
            url = `${APIURL}/admins/statistics/reports/type_of_reports`
        }
        url = url + get_url();
        
        const response = await fetch(
            url,
            paramsUpload
        );
        const jsonResponse = await response.json();

        if (response.status === 200){

            let evenstAmount = jsonResponse['message'];
            let info = [];
            if(motivo == 'category'){
                for(let i=0; i<evenstAmount.length; i++){
                    let data_out = evenstAmount[i].data;
                    data_out.unshift( ["Tipo de Eventos", "Cantidad"])
                    info.push(
                        {name: evenstAmount[i].event_type,
                        total_reports: evenstAmount[i].amount_of_total_report_by_type,
                        max_report_number: evenstAmount[i].amount_of_reports_by_report_motive,
                        max_report_name: evenstAmount[i].principal_report_motive,
                        data: data_out,
                        principal: !i,
                    })

                }

            }else{
                for(let i=0; i<evenstAmount.length; i++){
                    let data_out = evenstAmount[i].data;
                    data_out.unshift( ["Tipo de Eventos", "Cantidad"])
                    info.push(
                        {name: evenstAmount[i].motive,
                        total_reports: evenstAmount[i].amount_of_total_report_by_motive,
                        max_report_number: evenstAmount[i].amount_of_report_by_type_of_event,
                        max_report_name: evenstAmount[i].principal_type_of_event,
                        data: data_out,
                        principal: !i,
                    })
                }

            }

            setReports(info)
        }
        
    }
    function get_url(){

        let url = ""
        if (filters.since !== null && filters.to !== null){
            url = `?from_date=${filters.since}&to_date=${filters.to}`
        }
        else if (filters.since !== null){
            url = `?from_date=${filters.since}`
        } else if (filters.to !== null){
            url = `?to_date=${filters.to}`
        }else{
            url = ``;
        }
        return url
      }
    const onChangeFilter = (change, value) => {
        let filter = {...filters};

        if (change === "since" || change === 'to'){
            let new_Date = dayjs(new Date(value.toISOString()))
            const month = new_Date.$M  +  1
            value = new_Date.$y + "-" + month  + "-" + new_Date.$D
  
        }
        filter[change] = value
        setFilters(filter)

    }
    useEffect( () => {
        if (motivo){
            getReportPerType(localStorage.getItem('token'));
        }

      }, [ motivo,filters]);
   
    return (
        <Grid container display="flex" spacing={2} style={{marginTop:10}}>
            <Grid container xs={6} >
            <Grid item xs={10}>
                <FormControl fullWidth>
                <InputLabel id="category_report">Agrupar por</InputLabel>
                <Select
                labelId="category_report"
                id="demo-simple-select"
                value={motivo}
                label="Agrupar por"
                onChange={(event) => {
                    setMotivo(event.target.value)
                }}
                >
                <MenuItem value={'category'}>Categoría</MenuItem>
                <MenuItem value={'denuncia'}>Denuncia</MenuItem>
                </Select>
                </FormControl>
            </Grid>
            </Grid>
            
            <Grid container xs={6}>
            <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Desde"
                        fullWidth
                        value={filters.since}
                        maxDate={dayjs(filters.to) || dayjs(Date.now())}
                        onChange={(event) => {onChangeFilter("since",event)}}
                    />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={6} style={{ display: "flex", justifyContent: "flex-start" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Hasta"
                        fullWidth
                        minDate={dayjs(filters.since)}
                        maxDate={dayjs(Date.now())}
                        value={filters.to}
                        onChange={(event) => {onChangeFilter("to",event)}}
                    />
                </LocalizationProvider>
            </Grid>
            </Grid>


            
        
        
        {reports.length > 0?
            <Grid item xs={12} spacing={2}  >
                {reports.map(evento => <ReportCard key={evento.eventId} titleLabel={motivo == 'category'? 'Tipo de categoría: ':'Tipo de denuncia: '} bodyLabel={motivo == 'category'? 'Principal motivo de denuncia por ':'Principal evento denunciado por '} report = {evento}> </ReportCard>)}
            </Grid>
            :
            <Grid item xs={12} spacing={2}  >
                <NoDataInfoHappy message={'¡No hay eventos denunciados para este periodo!'}></NoDataInfoHappy>
            </Grid>
        }
        


      </Grid>
    );
}