import React, { useState , useEffect} from "react"
import { Box } from "@mui/material";
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { MetricsChart } from "./MetricsChart";

export const options = {
  is3D: true,
  backgroundColor: 'transparent',
  legend: {'position':'bottom','alignment':'center', maxLines: 5},
  colors: ['#004242','#2F686F', '#63899E', '#5AB0C7', '#33A9C4'],
  chartArea: {'width': '40vw' },
  width:"40vw",
  height:"35vh",
  sliceVisibilityThreshold :0
};

const categories = {ILEGAL:'El evento parece ilegal',
  SPAM:'Publicidad/spam',
  OFENSIVE:'Contenido ofensivo',
  PREMIUM:'No es un evento gratuito',
  DISCREIMINATION:'Tiene contenido discriminatorio'
    };

export const ReportCard = ({titleLabel,report,bodyLabel}) => {
  const [statusInfo, setStatusInfo] = useState({'data': [], 'options': options, type:'PieChart'})
  const [name, setName] = useState(null);
  const [maxReportName, setMaxReportName] = useState(null);

    useEffect( () => {
        setStatusInfo({...statusInfo,'data': report.data})

        let nameReport  = categories[report.name];
        if(nameReport){
          setName(nameReport)
        }else{
          setName(report.name)
          
        }
        let nameMaxReport  = categories[report.max_report_name];
        if(nameMaxReport){
          setMaxReportName(nameMaxReport)
        }else{
          setMaxReportName(report.max_report_name)
          
        }

    }, [report]);
    return (
        <Grid container spacing={2}       xs={12}
            sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 500,
            flexGrow: 1,
            borderRadius:5,
            backgroundColor: report.principal?'#A3AE88': '#6C8C97',
            marginBottom:3
          } }>
            <Grid item xs={7}>
                <p style={{ fontSize: '30px',fontWeight:'bold', color: 'white' }}>{titleLabel +  name}</p>
                <p style={{ fontSize: '30px', color: 'white' }}>{`${bodyLabel} ${name} es ${maxReportName}`}</p>
                <p style={{ fontSize: '30px', color: 'white' }}>{`Relación ${report?.max_report_number}/${report?.total_reports}`}</p>


                {report.principal && <p style={{ fontSize: '24px', color: 'red',fontWeight:'bold' }}>¡Mayor cantidad de denuncias!</p>}
                
                
                

            </Grid>

            <Grid item xs={3}>
            {statusInfo.data && <MetricsChart
                        info={statusInfo}
                    />
            }
            
            </Grid>

      </Grid>
    );
}