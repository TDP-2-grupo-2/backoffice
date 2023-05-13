import React from 'react'
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';



export const TableView = (props) => {
    console.log(props.columns)
    console.log(props.infoToShow)
    console.log(props.tableInfo)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    
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
                        {props.isEvent == true &&
                            <>
                                <TableCell>
                                    <Button sx={{ color: 'white', backgroundColor: 'rgba(129, 174, 181, 1)'}}
                                            variant="contained" 
                                            onClick={() => handleClick(row.id)}>
                                                Bloquear
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button sx={{ color: 'white', backgroundColor: 'rgba(129, 174, 181, 1)' }}
                                            variant="contained" 
                                            onClick={() => handleClick(row.id)}>
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
    
        </>
  );
}
