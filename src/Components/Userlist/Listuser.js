import React,{useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import instance from '../axios';
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from '@material-ui/core';
import {Select, MenuItem, Input, ListItemText, InputLabel} from '@material-ui/core';
import disabled from '../../images/disabled.png';
import enabled from '../../images/enabled.png';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));
const ITEM_HEIGHT = 20;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Listuser = () => {
  
  const [boolErro, setBoolErrors] = useState(true);
  const [idUtente, setIdUtente] = useState('');
  const [numeroMembro, setnumeroMembro] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cognome, setCognome] = useState('');
  const [ruolo, setRuolo] = useState('');
  const [error, setErrors] = useState('');
  const [stato, setStato] = useState('');
  const classes = useStyles();
  const [userlist, setUserlist] = useState([]);
  const [messageError, setMessageError] = useState('');
  const jwtCode = sessionStorage.getItem('tokeJwt');
  const [enabled,setEnabled] = useState(false);
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(()=>{
    instance.get('users',{
      headers:{
        'Authorization': `Bearer ${jwtCode}`
      } 
    })
    .then((res)=>{
      setUserlist(res.data);
    }).catch(err =>{
      setMessageError('Connessione al server non riuscita, riprovare tra qualche instante.');
      console.log("Error"+err);
    })
  },[]);
/*   const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  }; */
  const handleClickOpen = (event, id_utente) => {
    event.preventDefault();
    for(var i = 0; i < userlist.length; i++){
      if(id_utente === userlist[i].user_id){
        console.log(userlist[i].status);
        setIdUtente(id_utente);
        setEmail(userlist[i].email);
        setnumeroMembro(userlist[i].member_number);
        setCognome(userlist[i].lastname);
        setName(userlist[i].firstname);
        setRuolo(userlist[i].role);
        setStato(userlist[i].status);
        setOpen(true);
      }
    }
  };

  const handleClose = () => {
    setIdUtente('');
    setnumeroMembro('');
    setCognome('');
    setName('');
    setRuolo('');
    setStato('');
    setOpen(false);
    setBoolErrors(true);
  };
  const handleChange = (event) => {
    //if(Newruolo !== ruolo){
      setRuolo(event.target.value);
      setBoolErrors(false);
    //}
  };

  const handleChangeStatus = (event) => {
    //if(Newruolo !== ruolo){
      setStato(event.target.value);
      setBoolErrors(false);
    //}
  };

const saveNewChanges = (e) => {
  e.preventDefault();
  instance.patch('/users/'+idUtente,{
      headers:{
          'Authorization': `Bearer ${jwtCode}`
      } 
  }).then((res)=>{
      if(res.data.isTaken === false){
          //setnumeroMembro(value);
          setErrors('');
          setBoolErrors(false);
      }else{
          setErrors("Errore! Il numero membro è stato già preso");
          setBoolErrors(true);
      }
  }).catch(err => {
      //setnumeroMembro(value);
      setErrors('');
      setBoolErrors(false);
  });
};
  return (
    <>
      <h2>Lista Utenti</h2>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>#&nbsp;Socio</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Ruolo</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userlist.map((row) => (
                <TableRow key={row.user_id} onClick={(e)=>handleClickOpen(e,row.user_id)}>
                  <TableCell>{row.member_number}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.firstname +" "+ row.lastname}</TableCell>
                  <TableCell>{row.role}</TableCell>
                  <TableCell>{row.status}</TableCell>
                </TableRow>
              )
          )}
        </TableBody>
      </Table>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose}>
        { error ? <Alert severity="error">{error}</Alert> : <></>}
        <DialogTitle id="responsive-dialog-title">{"Modifica dati utente"}</DialogTitle>
          <DialogContent dividers={true}>
            <TextField  variant="outlined" autoFocus required margin="dense" id="numeromembro" label="Numero Socio" type="text" fullWidth value={numeroMembro} onChange={(e)=>{setnumeroMembro(e.target.value); setBoolErrors(false)}}/>
            <TextField  variant="outlined" autoFocus required margin="dense" id="email" label="Indirizzo Email" type="email" fullWidth value={email} onChange={(e)=> {setEmail(e.target.value); setBoolErrors(false)}}/>
            <TextField  variant="outlined" autoFocus required margin="dense" id="nome" label="Nome" type="text" fullWidth value={name} onChange={(e)=> {setName(e.target.value); setBoolErrors(false)}}/>
            <TextField  variant="outlined" autoFocus required margin="dense" id="cognome" label="Cognome" type="text" fullWidth value={cognome} onChange={(e)=> {setCognome(e.target.value);setBoolErrors(false)}}/>
            <InputLabel id="demo-mutiple-checkbox-label">Ruolo</InputLabel>
            <Select  fullWidth id="select-status" required abelId="Seleziona Status" value={stato} onChange={handleChangeStatus}  MenuProps={MenuProps}>
                <MenuItem key="attivo" value="enabled" >
                    <ListItemText primary="Attivo"/>
                </MenuItem>
                <MenuItem key="disattivo" value="disabled" >
                    <ListItemText primary="Disattivo"/>
                </MenuItem>
            </Select>
            <Select  fullWidth id="select-role" required abelId="Seleziona Ruolo" value={ruolo} onChange={handleChange}  MenuProps={MenuProps}>
                <MenuItem key="member" value="member" >
                    <ListItemText primary="Socio"/>
                </MenuItem>
                <MenuItem key="admin" value="admin" >
                    <ListItemText primary="Admin"/>
                </MenuItem>
            </Select>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Annulla
            </Button>
            <Button variant="contained" onClick={(e)=>saveNewChanges(e)} autoFocus color="primary" disabled={boolErro}>
              Salva Modifiche
            </Button>
          </DialogActions>
        </Dialog>
    </>
  )
}

export default Listuser;


   