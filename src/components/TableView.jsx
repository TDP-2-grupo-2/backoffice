import React, { useState } from 'react'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import { Notification } from './Notification';


export const TableView = (props) => {
    
    const [notifyBlockEvent, setNotifyBlockEvent] = useState({isOpen: false, message: '', type: 'info'})
    const [notifyBlockOrganizer, setNotifyBlockOrganizer] = useState({isOpen: false, message: '', type: 'info'})
    const APIURL = 'https://event-service-solfonte.cloud.okteto.net'
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    

    const hanldeBlockOrganizer = async (organizerId) => {
        let token = localStorage.getItem('token');
        const paramsUpload = {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };
        const url = `${APIURL}/admins/suspended_organizers/${organizerId}`;
        const response = await fetch(
            url,
            paramsUpload
        );
        const jsonResponse = await response.json();
    
        if (response.status === 200){
            if(!jsonResponse.status_code){
                console.log(jsonResponse)
                setNotifyBlockOrganizer({isOpen: true, message: 'El organizador ha sido bloqueado exitosamente', type: 'success'})
                props.setChange("bloquear organizros")    
            }
        } else {
            setNotifyBlockOrganizer({isOpen: true, message: 'Ha ocurrido un error al bloquear un organizador', type: 'error'})
        }     
    }
    const sendNotifications = async (row) => {
        console.log("entre a send notifications")
        const paramsUpload = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message: "Se ha cancelado el evento.",
                modifications: {"status": "suspended"},
                event_id: row.event_id,
                event_name: row.event_name
            })
        };
        const url = 'https://notifications-service-agustinaa235.cloud.okteto.net/notifications/modifications';
        const response = await fetch(
            url,
            paramsUpload
        );
        const jsonResponse = await response.json();
        console.log(response.status);
        if (response.status === 201){
            console.log(jsonResponse.status_code)
            if(!jsonResponse.status_code){
                console.log("se enviaron todos los mensajes")

            }
        }
        return response.status
    }

    const handleBlockEvent = async (row) => {
        let token = localStorage.getItem('token');
        const paramsUpload = {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        };
        console.log(row.event_id)
        const url = `${APIURL}/admins/suspended_events/${row.event_id}?motive=${row.most_frecuent_reason}`;
        const response = await fetch(
            url,
            paramsUpload
        );
        const jsonResponse = await response.json();
        let sendNoty = await sendNotifications(row);
        console.log(sendNoty);
        if (response.status === 200 && sendNoty === 201){
            if(!jsonResponse.status_code){
                console.log(jsonResponse)
                setNotifyBlockEvent({isOpen: true, message: 'El evento ha sido bloqueado exitosamente', type: 'success'})
                props.setChange("bloquear eventos")
                
            }
        } else {
            console.log("entre a handler error")
            setNotifyBlockEvent({isOpen: true, message: 'Ha ocurrido un error al bloquear un evento', type: 'error'})
        }     

    }
    
    function handleClick(id) {
      // Define the logic for handling the button click here
      console.log(`Button clicked for row with id ${id}`);
    }
    
    console.log("entre")
    return (
        <>
            <TableContainer>
            <Table>
                <TableHead >
                <TableRow style={{backgroundColor:'white', color: 'black',}} align="center">
                    {props.columns.map(element => {
                        return(
                            <TableCell align="center"> {element} </TableCell>
                        )   
                    })}
                </TableRow>
                </TableHead>
                <TableBody>
                {props.tableInfo.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <TableRow style={{backgroundColor:'rgba(217, 217, 217, 1)', color: 'black',}} key={row.id} align="center">
                        {props.infoToShow.map(info => {
                            return (
                                <>
                                    <TableCell align="center"> {row[info]}</TableCell>
                                </>
                                
                        )})}
                        {props.isEvent === true &&
                            <>
                                <TableCell>
                                    <Button sx={{ color: 'white', backgroundColor: 'rgba(129, 174, 181, 1)'}}
                                            variant="contained" 
                                            onClick={() => handleBlockEvent(row)}>
                                                Bloquear
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button sx={{ color: 'white', backgroundColor: 'rgba(129, 174, 181, 1)' }}
                                            variant="contained" 
                                            onClick={() => hanldeBlockOrganizer(row.organizer_id)}>
                                                Bloquear
                                    </Button>
                            </TableCell>
                            </>
                        }
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination style={{backgroundColor:'rgba(217, 217, 217, 1)', color: 'black',}}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={props.tableInfo.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <Notification
                        notify={notifyBlockEvent}
                        setNotify={setNotifyBlockEvent}/>
        <Notification
                        notify={notifyBlockOrganizer}
                        setNotify={setNotifyBlockOrganizer}/>
    
        </>
  );
}
