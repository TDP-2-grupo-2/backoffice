import React, { useState, useEffect } from "react"
import { Typography, CircularProgress } from "@mui/material"
import {TableView} from "../components/TableView"
import { DateFilter } from "../components/DateFilter";



  


export const Users= () =>{
    let columns = ["Usuario", "Email", "Cantidad de Denuncias", "Motivo Principal"]
    let information = ["userName", "userEmail", "amount_report", "motive"]
    const [ loading, setLoading ] = useState( true );
    const APIURL = 'https://event-service-solfonte.cloud.okteto.net'


    const [attendes, setAttendes] = useState([])
    const [from, setFrom] = useState(null)
    const [until, setUntil] = useState(null)

    const handleRequest = () => {

    }

    async function getReportAttendes(token, from, until){
      const paramsUpload = {
          method: "GET",
          headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
          }
      };
      let url = ""
      console.log(token)
      if (from !== null && until !== null){
           url = `${APIURL}/admins/reports/attendees?from_date=${from}&to_date=${until}`;
      } else if ( from !== null){
        url = `${APIURL}/admins/reports/attendees?from_date=${from}`;
      } else if (until !== null){
        url = `${APIURL}/admins/reports/attendees?to_date=${until}`;
      } else {
        url = `${APIURL}/admins/reports/attendees`;
      }
      const response = await fetch(
          url,
          paramsUpload
      );
      const jsonResponse = await response.json();
  
      if (response.status === 200){
          if(!jsonResponse.status_code){
              console.log(jsonResponse)
              setAttendes(jsonResponse['message'])
              setLoading(false)
          }
      }     
  }
  
  useEffect( () => {
    getReportAttendes(localStorage.getItem('token'), null, null);
  }, []);
  

    return (
            !loading ?
            <div className="reportedAttendes">
                <Typography  variant="h3" align="top">
                    Usuarios Denunciantes
                </Typography>
                <br></br>
                <br></br>
                <DateFilter
                    from = {from}
                    until = {until}
                    setFrom = {setFrom}
                    setUntil = {setUntil}
                    handleRequest = {handleRequest}
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