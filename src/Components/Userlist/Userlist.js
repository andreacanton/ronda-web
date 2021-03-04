import React,{useState} from 'react'
import Appbar from  './Appbar';
import { makeStyles } from '@material-ui/core/styles';
import Listuser from './Listuser';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {Select, MenuItem, Input, ListItemText, InputLabel} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { isExpired } from "react-jwt";
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import instance from '../axios';
const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fab: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
}));
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Userlist = () => {
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [error, setErrors] = useState('');
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [ruolo, setRuolo] = useState('');
    const [boolErro, setBoolErrors] = useState(false);
    const [numeroMembro, setnumeroMembro] = useState('');
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [name, setName] = useState('');
    const [cognome, setCognome] = useState('');
    const jwtCode = localStorage.getItem('tokeJwt');
    const isMyTokenExpired = isExpired(jwtCode);
    if(isMyTokenExpired){
        history.push("/");
    }
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        setRuolo(event.target.value);
    };

    const checkMemberNumero = (e,value) =>{
        e.preventDefault();
        setnumeroMembro(value);
        instance.get('/users/is-taken/memberNumber/'+value,{
            headers:{
                'Authorization': `Bearer ${jwtCode}`
            } 
        }).then((res)=>{
            if(res.data.isTaken === false){
                setnumeroMembro(value);
                setErrors('');
                setBoolErrors(false);
            }else{
                setErrors("Errore! Il numero membro è stato già preso");
                setBoolErrors(true);
            }
        }).catch(err => {
            setnumeroMembro(value);
            setErrors('');
            setBoolErrors(false);
        });
    }

    const checkEmail = (e,value) =>{
        e.preventDefault();
        setEmail(value);
        instance.get('/users/is-taken/email/'+value,{
            headers:{
                'Authorization': `Bearer ${jwtCode}`
            } 
        }).then((res)=>{
            if(res.data.isTaken === false){
                setEmail(value);
                setErrors('');
                setBoolErrors(false);
            }else{
                setErrors("Errore! questa email è stato già presa");
                setBoolErrors(true);
            }
        }).catch(err => {
            setEmail(value);
            setErrors('');
            setBoolErrors(false);
        });
    }

    const saveNewUser = (e) =>{
        e.preventDefault();
        instance.post('/users/?resetUrl=http%3A%2F%2Flocalhost%3A3001%2Freset-password',{
            headers:{
                'Authorization': `Bearer ${jwtCode}`
            },
            firstname:name,
            lastname:cognome,
            email:email,
            password:pwd,
            memberNumber:numeroMembro,
            role:ruolo
        }).then((res)=>{
            console.log(res);
        })
        .catch((err)=>{

        });
        //console.log(numeroMembro+" >> "+email+" >> "+name+" >> "+cognome+" >> "+ruolo);
    }

    const classes = useStyles();
    return (
        <div>
            <Appbar/>
            <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}>
                            <Listuser/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Fab className={classes.fab} color="primary" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
                { error ? <Alert severity="error">{error}</Alert> : <></>}
                <DialogTitle id="responsive-dialog-title">{"Aggiungi un nuovo Utente"}</DialogTitle>
                    <DialogContent dividers={true}>
                        <TextField  variant="outlined" autoFocus required margin="dense" id="numeromembro" label="Identificativo Membro" type="text" fullWidth value={numeroMembro} onChange={(e)=>checkMemberNumero(e, e.target.value)}/>
                        <TextField  variant="outlined" autoFocus required margin="dense" id="email" label="Indirizzo Email" type="email" fullWidth value={email} onChange={(e)=>checkEmail(e,e.target.value)}/>
                        <TextField  variant="outlined" autoFocus required margin="dense" id="password" label="Password" type="password" fullWidth value={pwd} onChange={(e)=>setPwd(e.target.value)}/>
                        <TextField  variant="outlined" autoFocus required margin="dense" id="nome" label="Nome" type="text" fullWidth value={name} onChange={(e)=>setName(e.target.value)}/>
                        <TextField  variant="outlined" autoFocus required margin="dense" id="cognome" label="Cognome" type="text" fullWidth value={cognome} onChange={(e)=>setCognome(e.target.value)}/>
                        <InputLabel id="demo-mutiple-checkbox-label">Ruolo</InputLabel>
                        <Select  fullWidth id="select-role" required abelId="Seleziona Ruolo" value={ruolo} onChange={handleChange}  MenuProps={MenuProps}>
                            <MenuItem key="Membro" value="membro" >
                                <ListItemText primary="Membro"/>
                            </MenuItem>
                            <MenuItem key="Admin" value="Admin" >
                                <ListItemText primary="Admin"/>
                            </MenuItem>
                        </Select>
                    </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Annulla
                    </Button>
                    <Button variant="contained" onClick={(e)=>saveNewUser(e)} autoFocus color="primary" disabled={boolErro}>
                            Salva Nuovo Utente
                    </Button>
                </DialogActions>
             </Dialog>
        </div>
    )
}

export default Userlist;
