import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import './forgetPWD.css';
import axios from 'axios';
import { useHistory } from "react-router-dom";


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
    const [codice, setCodice] = useState('');
    var opts = {};
    const BacktoLogin = (e) => {
        e.preventDefault();
        history.push(`/`);
    }
    const resetPassword = (e) =>{
        e.preventDefault(e);
        axios.post('http://localhost:3000/auth/forgot-password?resetUrl='+window.location.href,{
            identity:emailpwd,
        }).then((response)=>{
            if(response.status == 200){
                setStatus(true);
                setSuccess(true);
                console.log(response);
            }
        },(errors)=>{
            console.log("Error");
        });
    }

    const ConfirmChangePassword = (e) =>{
        e.preventDefault(e);
        setSuccess(false);
        alert("Password Confermata");
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
                           Ronda Web -  Recupero Password 
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
            <div className="container__forget">
                <div className="container__Form">
                    <form>
                        <label className="label__form">inserisci l'email associata al tuo account Ronda</label>
                        <input className="input__form" value={emailpwd} style = {{ backgroundColor: status ? 'lightgray':'trasparent' }} onChange={(e)=>setEmailpwd(e.target.value)}type="text" placeholder="email" readOnly={status}/>
                        {
                            
                            success ? <> 
                                <label className="label__form">Inserisci il codice arrivato tramite email</label>
                                <input type="text"  className="input__form" value={codice} placeholder="codice" onChange={(e)=>setCodice(e.target.value)}/>
                            </> : 
                             <label></label>
                        }
                        {success ? 
                                <input type="submit" className="btn" onClick={(e)=>ConfirmChangePassword(e)} value="Conferma"/>
                                :<input type="submit" className="btn" onClick={(e)=>resetPassword(e)} value="Invia Codice"/> 
                                }
                    </form>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword;
