import React, { useState , useEffect} from "react"
import { Typography ,  CircularProgress } from "@mui/material"
import {TableView} from "../components/TableView"
import { DateFilter } from "../components/DateFilter";

export const Events= () =>{
    let columns = ["Evento", "Descripcion", "Dueño", "Cantidad de Denuncias", "Motivo Principal", "Suspender Evento", "Suspender Organizador"];
    let information = ["event_name", "event_description", "organizer_name", "amount_of_reports", "most_frecuent_reason"];

    const APIURL = 'https://event-service-solfonte.cloud.okteto.net';

    const [events, setEvents] = useState([]);
    const [dateFilter, setDateFilter] = useState({fromDate:null, toDate:null});
    const [ loading, setLoading ] = useState( true );
    const [change, setChange] = useState("");

    async function getReportEvents(token, dateFilter){
      console.log(dateFilter)
      console.log("pido a los events que reportaron")
      const paramsUpload = {
          method: "GET",
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          }
      };
      let url = "";
      console.log(token)
      if (dateFilter.fromDate !== null && dateFilter.toDate!== null){
          console.log("mando from y until")
          url = `${APIURL}/admins/reports/events?from_date=${dateFilter.fromDate}&to_date=${dateFilter.toDate}`;
      } else if ( dateFilter.fromDate!== null){
          console.log("mando from")
          url = `${APIURL}/admins/reports/events?from_date=${dateFilter.fromDate}`;
      } else if (dateFilter.toDate !== null){
          console.log("mando until")
          url = `${APIURL}/admins/reports/events?to_date=${dateFilter.toDate}`;
      } else {
          console.log("no mando un carajo from y until")
          url = `${APIURL}/admins/reports/events`;
      }
      const response = await fetch(
          url,
          paramsUpload
      );
      const jsonResponse = await response.json();
  
      if (response.status === 200){
          if(!jsonResponse.status_code){
              console.log("eventos denunciados")
              console.log(jsonResponse)
              let aux = jsonResponse['message']
              let filter_events = aux.filter((x) => x.amount_of_reports > 0);
              setEvents(filter_events);
              setLoading(false)
          }
      }     
  }
  
  useEffect( () => {
    getReportEvents(localStorage.getItem('token'), dateFilter);
  }, [dateFilter, change]);

    return (
      !loading ?
        <div className="reportedAttendes">
            <Typography  variant="h3" align="left">
                Eventos Denunciados
            </Typography>
            <br></br>
            <br></br>
            <DateFilter
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
            />
            <br></br>
            <br></br>
            {events.length >0 ?
                <TableView 
                    columns={columns}
                    infoToShow={information}
                    setChange={setChange}
                    tableInfo={events}
                    isEvent={true}
                />  
            : <h2 style={{marginTop:"3rem", textAlign:"center"}}>No hay usuarios denunciantes.</h2> 
            }  
           
           </div>
            :<CircularProgress 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100vh',
              margin: 'auto',
              width: '10vw'
            }}
          />    
    )
}