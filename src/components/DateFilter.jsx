import {React} from "react"
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';





export const DateFilter = (props) => {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DatePicker', 'DatePicker']}>
                <DatePicker
                        label="Desde"
                        value={props.from}
                        maxDate={props.until || dayjs(Date.now())}
                        onChange={(event) => props.setFrom(event)}
                    />
                <DatePicker
                    label="Hasta"
                    value={props.until}
                    minDate={props.from}
                    maxDate={dayjs(Date.now())}
                    onChange={(event) => props.setUntil(event)}
                />
            </DemoContainer>
            </LocalizationProvider>
    )
}