import React, { useState } from "react"
import { Typography } from "@mui/material"
import {TableView} from "../components/TableView"
import { DateFilter } from "../components/DateFilter";



const tableData = [
    {
      eventId: 1,
      eventName: 'Maestros de Fuego',
      eventDescription: 'una descripcion',
      ownerName: 'pepe',
      amount_report: '5',
      motive: 'spam'
    },
    {
      eventId: 2,
      eventName: 'danza',
      eventDescription: 'una descripcion',
      ownerName: 'pepe',
      amount_report: '3',
      motive: 'spam'
    },
    {
      eventId: 4,
      eventName: 'Cazzu show',
      eventDescription: 'una descripcion',
      ownerName: 'pepe3',
      amount_report: '10',
      motive: 'spam'
    },
    {
      eventId: 5,
      eventName: 'microTeatro',
      eventDescription: 'una descripcion',
      ownerName: 'pepe',
      amount_report: '2',
      motive: 'spam'
    },
    {
      eventId: 5,
      eventName: 'Maestros de Fuego2',
      eventDescription: 'una descripcion',
      ownerName: 'pepe',
      amount_report: '1',
      motive: 'spam'
    },
    {
      eventId: 6,
      eventName: 'ejemplo 2',
      eventDescription: 'una descripcion',
      ownerName: 'pepe',
      amount_report: '2',
      motive: 'spam'
    },
    {
      eventId: 7,
      eventName: 'otro',
      eventDescription: 'una descripcion',
      ownerName: 'pepe2',
      amount_report: '5',
      motive: 'spam'
    },
    
  
  ];


export const Events= () =>{
    let columns = ["Evento", "Descripcion", "Dueño", "Cantidad de Denuncias", "Motivo Principal", "Suspender Evento", "Suspender Organizador"]
    let information = ["eventName", "eventDescription", "ownerName", "amount_report", "motive"]
    const [from, setFrom] = useState(null)
    const [until, setUntil] = useState(null)
    return (
        <>
            <Typography  variant="h3" align="top">
                Eventos Denunciados
            </Typography>
            <br></br>
            <br></br>
            <DateFilter
                from = {from}
                until = {until}
                setFrom = {setFrom}
                setUntil = {setUntil}
            />
            <br></br>
            <br></br>
        
            <TableView 
                columns={columns}
                infoToShow={information}
                tableInfo={tableData}
                isEvent={true}
            />    
           
        </>
    )
}