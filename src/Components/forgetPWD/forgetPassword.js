import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SweetAlert from 'react-bootstrap-sweetalert';
import './forgetPWD.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { isExpired } from "react-jwt";


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

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
        axios.post('http://localhost:3000/auth/forgot-password?resetUrl='+window.location.href,{
            identity:emailpwd,
        }).then((response)=>{
            if(response.status === 200){
                setStatus(true);
                setSuccess(true);
                console.log(response);
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
                });
            }else{
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
                { error ? <div className="error__banner">{message}</div> : <div></div>}
                <div className="container__forget">
                    <div className="container__Form">
                        <form>
                            <label className="label__form">inserisci l'email associata al tuo account Ronda</label>
                            <input className="input__form" value={emailpwd} style = {{ backgroundColor: status ? 'lightgray':'trasparent' }} onChange={(e)=>setEmailpwd(e.target.value)}type="email" placeholder="email" readOnly={status}/> 
                            <input type="submit" className="btn" onClick={(e)=>resetPassword(e)} value="Conferma"/>                                
                        </form>
                        { success ?
                            <SweetAlert success title={"Operazione effettuata con successo"} confirmBtnText={"Torna alla Home"} onConfirm={()=> BacktoHome()}></SweetAlert> : <p></p> 
                        } 
                    </div>
                </div>
            </>
        )
    }else{
        var queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        let token = urlParams.get('token')
        if(isExpired(token)){
            <SweetAlert error title={"Questo link è scaduto effettua nuovamente la richiesta per una nuova password"} confirmBtnText={"Torna alla Home"} onConfirm={()=> BacktoHome()}></SweetAlert>;
        }else{
            return(
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
                    <div className="container__forget">
                    <div className="container__FormPWD">
                        <form>
                            <label className="label__form">inserisci Password</label>
                            <input className="input__form" value={pass} onChange={(e)=>setPass(e.target.value)} type="password" placeholder="Password"/> 
                            <label className="label__form">Ripeti Password</label>
                            <input className="input__form" value={confirmPass} onChange={(e)=>setConfirmPass(e.target.value)} type="password" placeholder="Ripeti Password"/> 
                            <p style={{fontWeight:'800', color:'red'}}>{errPass}</p>
                            <p style={{fontWeight:'800', color:'red'}}>{genericError}</p>
                            <input type="submit" className="btn" onClick={(e)=>ConfirmNewPassword(e,token)} value="Conferma"/>                                
                        </form>
                        { success ?
                            <SweetAlert success title={"Operazione effettuata con successo"} confirmBtnText={"Torna alla Home"} onConfirm={()=> BacktoHome()}></SweetAlert> : <p></p> 
                        } 
                    </div>
                </div>
                </>
            );
        }
    }
}

export default ForgetPassword;
