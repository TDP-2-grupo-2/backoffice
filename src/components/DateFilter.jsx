import {React} from "react"
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';





export const DateFilter = (props) => {

    console.log(props)
    const handleFrom = (event) => {
        console.log(event)
        console.log("estoy en hanlde from")
        let dateAux = {...props.dateFilter}
        let new_Date = dayjs(new Date(event.toISOString()))
        const month = new_Date.$M  +  1
        dateAux['fromDate'] = new_Date.$y + "-" + month  + "-" + new_Date.$D
        props.setDateFilter(dateAux); 
        console.log(props.dateFilter)
    }
    
    const handleUntil = (event) => {
        console.log(event)
        console.log("estoy en hanlde until")
        let dateAux = {...props.dateFilter}
        let new_Date = dayjs(new Date(event.toISOString()))
        const month = new_Date.$M  +  1
        dateAux['toDate'] = new_Date.$y + "-" + month  + "-" + new_Date.$D
        props.setDateFilter(dateAux); 
        console.log(props.dateFilter)
        
    }

    return (
        <>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            
                <DatePicker
                        label="Desde"
                        value={props.dateFilter.fromDate}
                        maxDate={dayjs(props.dateFilter.toDate) || dayjs(Date.now())}
                        onChange={(event) => handleFrom(event)}
                    />
                <DatePicker
                    label="Hasta"
                    value={props.dateFilter.toDate}
                    minDate={dayjs(props.dateFilter.fromDate) || dayjs("2000-01-01")}
                    maxDate={dayjs(Date.now())}
                    onChange={(event) => handleUntil(event)}
                />
            
            </LocalizationProvider>

        </>   
    )
}