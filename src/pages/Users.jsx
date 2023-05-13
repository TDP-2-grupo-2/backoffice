import React, { useState } from "react"
import { Typography } from "@mui/material"
import {TableView} from "../components/TableView"
import { DateFilter } from "../components/DateFilter";


const tableData = [
    {
      id: 1,
      userName: 'pepe',
      userEmail: 'una descripcion',
      amount_report: '5',
      motive: 'spam'
    },
    {
      id: 2,
      userName: 'raul',
      userEmail: 'una descripcion',
      amount_report: '3',
      motive: 'spam'
    },
    {
      id: 3,
      userName: 'julia',
      userEmail: 'una descripcion',
      amount_report: '10',
      motive: 'spam'
    },
    {
      id: 4,
      userName: 'agustina',
      userEmail: 'una descripcion',
      amount_report: '2',
      motive: 'spam'
    },
    {
      id: 5,
      userName: 'sol',
      userEmail: 'una descripcion',
      amount_report: '1',
      motive: 'spam'
    },
    {
      id: 6,
      userName: 'rama',
      userEmail: 'una descripcion',
      amount_report: '2',
      motive: 'spam'
    },
    {
      id: 7,
      userName: 'pepe2',
      userEmail: 'una descripcion',
      amount_report: '5',
      motive: 'spam'
    },
    
  
  ];


export const Users= () =>{
    let columns = ["Usuario", "Email", "Cantidad de Denuncias", "Motivo Principal"]
    let information = ["userName", "userEmail", "amount_report", "motive"]
    const [from, setFrom] = useState(null)
    const [until, setUntil] = useState(null)
    return (
        <>
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
            />
            <br></br>
            <br></br>
            <TableView 
                columns={columns}
                infoToShow={information}
                tableInfo={tableData}
                isEvent={false}
            />    
           
        </>
    )
}