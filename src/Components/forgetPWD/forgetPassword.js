import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SweetAlert from 'react-bootstrap-sweetalert';
import Container from '@material-ui/core/Container';
import {TextField, Button, Grid,CssBaseline,Avatar, } from '@material-ui/core';
import './forgetPWD.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { isExpired } from "react-jwt";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MuiAlert from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ForgetPassword = () => {
    const history = useHistory();
    const classes = useStyles();
    const [emailpwd,setEmailpwd] = useState('');
    const [status, setStatus]  = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');
    const [pass, setPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [errPass, setErrPass] = useState('');
    const [genericError, setgenericError] = useState('');

    const BacktoLogin = (e) => {
        e.preventDefault();
        history.push(`/`);
    }

    const BacktoHome = () => {
        history.push(`/`);
    }
    const resetPassword = (e) =>{
        e.preventDefault();
        if(emailpwd === ""){
            setMessage("Inserisci un Email Valida");
        }
        axios.post('http://localhost:3000/auth/forgot-password?resetUrl='+window.location.href,{
            identity:emailpwd,
        }).then((response)=>{
            if(response.status === 200){
                setStatus(true);
                setSuccess(true);
            }
        },(errors)=>{
            setError(true);
            setMessage("L'email '"+emailpwd+"' non è registrata nel nostro database inserisci una password corretta");
            console.log("Error");
        });
    }


    const ConfirmNewPassword = (e, token) =>{
        e.preventDefault();
        axios.defaults.headers.common = {'Authorization':`${token}`}
        if(pass === '' || confirmPass ==='' ){
            setErrPass("Inserisci la Password!");
        }else{
            if(pass === confirmPass){
                axios.post('http://localhost:3000/auth/reset-password',{
                    password: pass,
                }
                ).then((res)=>{
                    if(res.status === 200){
                        <SweetAlert success title={"Operazione effettuata con successo, la tua password è stata cambiata"} confirmBtnText={"Torna alla Home"} onConfirm={()=> BacktoHome()}></SweetAlert>;
                    }
                },(error)=>{
                    setgenericError("Oh no! c'è stato un imprevisto durante la tua richiesta");
                    setErrPass('');
                });
            }else{
                setgenericError('');
                setErrPass("Inserisci due password uguali");
            }
        }
    }


    let linkResetPassword = window.location.href;
    if (!linkResetPassword.includes('?')) {
        return (
            <>
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton onClick = {(e)=>BacktoLogin(e)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                <ArrowBackIcon />
                            </IconButton>
                            <Typography variant="h6" className={classes.title}>
                            Ronda Web -  Recupero Password 
                            </Typography>
                        </Toolbar>
                    </AppBar>
                </div>
                { error ?<Alert severity="error">{message}</Alert> : <div></div>}
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Recupera Password
                            </Typography>
                            <form className={classes.form} noValidate onSubmit={(e)=>resetPassword(e)}>
                                <TextField variant="outlined" margin="normal" required fullWidth type="email" id="email" label="Email Address" name="email" autoComplete="email" value={emailpwd}  onChange={(e)=> setEmailpwd(e.target.value)} autoFocus/>
                                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                                    Invia Email
                                </Button>
                            </form>
                            { success ?
                                <SweetAlert success title={"Operazione effettuata con successo"} confirmBtnText={"Torna alla Home"} onConfirm={()=> BacktoHome()}></SweetAlert> : <p></p> 
                            } 
                        </div>
                </Container>
            </>
        )
    }else{
        var queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let token = urlParams.get('token')
        if(isExpired(token)){
            <SweetAlert error title={"Questo link è scaduto effettua nuovamente la richiesta per una nuova password"} confirmBtnText={"Torna alla Home"} onConfirm={()=> BacktoHome()}></SweetAlert>;
        }
            return (
                <>
                    <div className={classes.root}>
                        <AppBar position="static">
                            <Toolbar>
                                <IconButton onClick = {(e)=>BacktoLogin(e)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                                    <ArrowBackIcon />
                                </IconButton>
                                <Typography variant="h6" className={classes.title}>
                                Ronda Web -  Resetta Password
                                </Typography>
                            </Toolbar>
                        </AppBar>
                    </div>
                    { genericError ?<Alert severity="error">{genericError}</Alert> : <div></div>}
                    { errPass ?<Alert severity="error">{errPass}</Alert> : <div></div>}
                    <Container component="main" maxWidth="xs">
                    <CssBaseline />
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Recupera Password
                            </Typography>
                            <form className={classes.form} noValidate>
                                <TextField variant="outlined" margin="normal" required fullWidth type="password" id="password" label="Inserisci Password" name="password" value={pass} onChange={(e)=>setPass(e.target.value)} autoFocus/>
                                <TextField variant="outlined" margin="normal" required fullWidth type="password" id="password-confirm" label="Ripeti Password" name="password-confirm" value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} autoFocus/>
                                <Button type="submit" fullWidth variant="contained" onClick={(e)=>ConfirmNewPassword(e,token)} color="primary" className={classes.submit}>
                                    Conferma
                                </Button>
                            </form>
                            { success ?
                                <SweetAlert success title={"Operazione effettuata con successo"} confirmBtnText={"Torna alla Home"} onConfirm={()=> BacktoHome()}></SweetAlert> : <p></p> 
                            } 
                        </div>
                    </Container>
                </>
            );
    }
}

export default ForgetPassword;