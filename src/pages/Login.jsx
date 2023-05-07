import React from 'react'
import adminLogo from "../images/adminLogo.png"
import {Grid, Box, Typography, TextField, IconButton, InputAdornment, Button} from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import { useState } from 'react';
import {Notification} from '../components/Notification'

export const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [notify, setNotify] = useState({isOpen: false, message: '', type: ''})
 

    const handleLogIn = async (event) => {
        const APIURL = 'https://event-service-solfonte.cloud.okteto.net'
        const paramsLogin = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            })
        };
        const url = `${APIURL}/admins/login`;
        const response = await fetch(
            url,
            paramsLogin
        );
        const jsonResponse = await response.json();
        
        if (response.status === 200){ 
            props.setAuthentification(true)
        } else {
            if (response.status == 401){
                setNotify({
                    isOpen: true,
                    message: 'contraseña/email invalido',
                    type: 'error'
                })
            } else {
                setNotify({
                    isOpen: true,
                    message: 'Error en el login. Intente mas tarde',
                    type: 'error'
                })
            }
        }
    }

    const toggleSeePassword = (event) => {
        setShowPassword(!showPassword);
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


  return (
    <>
        <Box  display="flex"
            justifyContent="center"
            alignContent="center"
            marginY="10vh"
            >
            <style>{'body { background-color: rgba(129, 174, 181, 1); }'}</style>
            <Box sx={{
                    p: 1,
                    m: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: "rgba(80, 163, 170, 1)",
                    borderRadius: 1,
                    width:"50%",
                    }} >
                <Grid container  rowSpacing={4}>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                        <img  src={adminLogo} alt="Flowers in Chania">

                        </img>
 
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                        <Typography  variant="h3" align="top">
                            Administradores
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                        <Typography  variant="h3" align="top">
                            Bienvenido
                        </Typography>
                    </Grid>
                    
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
                        <TextField 
                            label="Email"
                            type = "text"
                            required
                            id="outlined-required"
                            placeholder = "xxxxx@gmail.com"
                            name = "username"
                            className={"inputStyle"}
                            value={email}
                            onChange = {(event) => setEmail(event.target.value)}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <EmailIcon/>
                                  </InputAdornment>
                                ),
                              }}
                        />
                    </Grid>
                    <Grid item xs={12}  style={{ display: "flex", justifyContent: "center" }}>
                    <TextField 
                        label = "Password"
                        type = {showPassword?"text":"password"}
                        placeholder = "Password"
                        name = "password"
                        value={password}
                        onChange = {(event) => setPassword(event.target.value)}
                        className={"inputStyle"}
                        InputProps = {{
                            endAdornment: 
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={toggleSeePassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }}
                    />

                    </Grid>
                    <Grid item xs={12}  style={{ display: "flex", justifyContent: "center" }}>
                    <Button variant="contained" 
                            sx={{fontSize:16}}
                            onClick={handleLogIn}>
                        Log In
                    </Button>
                    <Notification
                        notify={notify}
                        setNotify={setNotify}/>
                    </Grid>
                </Grid>
            </Box>

            
        </Box> 
    </>
  )
}