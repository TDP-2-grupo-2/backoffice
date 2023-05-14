import React, { useState, useEffect } from "react"
import { Typography, CircularProgress } from "@mui/material"
import {TableView} from "../components/TableView"
import { DateFilter } from "../components/DateFilter";



export const Users= () =>{
    let columns = ["Usuario", "Email", "Cantidad de Denuncias", "Motivo Principal"]
    let information = ["user_name", "user_email", "amount_of_reports", "most_frecuent_reason"]
    const [ loading, setLoading ] = useState( true );
    const APIURL = 'https://event-service-solfonte.cloud.okteto.net'
    const [dateFilter, setDateFilter] = useState({fromDate:null, toDate:null})

    const [attendes, setAttendes] = useState([])
  
    const [change, setChange] = useState("")


    async function getReportAttendes(token, dateFilter){
      console.log(dateFilter)
      console.log("pido a los attendes que reportaron")
      const paramsUpload = {
          method: "GET",
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          }
      };
      let url = ""
      console.log(token)
      if (dateFilter.fromDate !== null && dateFilter.toDate!== null){
          console.log("mando from y until")
          url = `${APIURL}/admins/reports/attendees?from_date=${dateFilter.fromDate}&to_date=${dateFilter.toDate}`;
      } else if ( dateFilter.fromDate!== null){
          console.log("mando from")
          url = `${APIURL}/admins/reports/attendees?from_date=${dateFilter.fromDate}`;
      } else if (dateFilter.toDate !== null){
          console.log("mando until")
          url = `${APIURL}/admins/reports/attendees?to_date=${dateFilter.toDate}`;
      } else {
          console.log("no mando un carajo from y until")
          url = `${APIURL}/admins/reports/attendees`;
      }
      const response = await fetch(
          url,
          paramsUpload
      );
      const jsonResponse = await response.json();
  
      if (response.status === 200){
          if(!jsonResponse.status_code){
              console.log("usuarios denunciantes")
              console.log(jsonResponse)
              setAttendes(jsonResponse['message'])
              setLoading(false)
          }
      }     
  }
  
  useEffect( () => {
    getReportAttendes(localStorage.getItem('token'), dateFilter);
  }, [dateFilter]);
  

    return (
            !loading ?
            <div className="reportedAttendes">
                <Typography  variant="h3" align="top">
                    Usuarios Denunciantes
                </Typography>
                <br></br>
                <br></br>
                <DateFilter
                    dateFilter={dateFilter}
                    setDateFilter={setDateFilter}
                />
                <br></br>
                <br></br>
                {attendes.length > 0 ?
                    <TableView 
                        columns={columns}
                        infoToShow={information}
                        tableInfo={attendes}
                        isEvent={false}
                    />
                  :  <h2 style={{marginTop:"3rem", textAlign:"center"}}>No hay usuarios denunciantes.</h2>    
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