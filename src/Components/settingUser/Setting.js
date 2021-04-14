import React, {useState, useEffect} from 'react';
import Appbar from '../Appbar';
import {Grid, Container, Button,TextField, 
        FormControlLabel,CssBaseline, Typography,Avatar,
        Card, CardHeader,IconButton, Paper} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import instance from '../axios';
import { sizing } from '@material-ui/system';
import { useTheme } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
    cardMain :{
        marginTop: theme.spacing(4),
        width:'100%',
    }
  }));

const Setting = () => {
    const [email,setEmail] = useState('');
    const [emailChange,setEmailChange] = useState('');
    const [name, setName] = useState('');
    const [cognome, setCognome] = useState('');
    const [fullname, setFullname] = useState('');
    const [role, setRole] = useState('');
    const [iniziali, setIniziali] = useState('');
    const [activeChanges, setActiveChanges] = useState(true);
    const [error, setErrors] = useState('');
    const tokeJwt = sessionStorage.getItem('tokeJwt');
    const [] = useState('');
    useEffect(()=>{
        instance.get('users/profile',{
          headers:{
            'Authorization': `Bearer ${tokeJwt}`
          } 
        })
        .then((res)=>{
          var mydataReponse = res.data;
          setFullname(mydataReponse.firstname +" "+mydataReponse.lastname);
          setName(mydataReponse.firstname);
          setCognome(mydataReponse.lastname);
          setRole(mydataReponse.role);
          setEmail(mydataReponse.email);
          setEmailChange(mydataReponse.email);
          setIniziali(mydataReponse.firstname.charAt(0)+mydataReponse.lastname.charAt(0));
        }).catch(err =>{
          setErrors('Connessione al server non riuscita, riprovare tra qualche instante.');
          console.log("Error"+err);
        })
      },[]);

      const resetField = (event) => {
        event.preventDefault();
        instance.get('users/profile',{
          headers:{
            'Authorization': `Bearer ${tokeJwt}`
          } 
        })
        .then((res)=>{
          var mydataReponse = res.data;
          setFullname(mydataReponse.firstname +" "+mydataReponse.lastname);
          setName(mydataReponse.firstname);
          setCognome(mydataReponse.lastname);
          setRole(mydataReponse.role);
          setEmail(mydataReponse.email);
          setEmailChange(mydataReponse.email);
          setIniziali(mydataReponse.firstname.charAt(0)+mydataReponse.lastname.charAt(0));
        }).catch(err =>{
          //setMessageError('Connessione al server non riuscita, riprovare tra qualche instante.');
          console.log("Error"+err);
        })
      }
    const classes = useStyles();
    return (
        <>
           <Appbar/>
           <Container component="main" maxWidth="xs">
                <CssBaseline />
                { error ? <Alert severity="error">{error}</Alert> :<></> }
                <div className={classes.paper}>
        {/*             <Typography component="h1" variant="h5">
                        Impostazioni Account
                    </Typography> */}
                    <Card className={classes.cardMain}>
                        <CardHeader avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    {iniziali}
                                </Avatar>
                            }
                            action={ <IconButton aria-label="settings"></IconButton>}
                            title={fullname}
                            subheader={role}
                        />
                    </Card>
                    <form className={classes.form} noValidate>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            autoComplete="fname"
                            name="Nome"
                            variant="outlined"
                            required
                            fullWidth
                            value = {name}
                            onChange = {(e)=>setName(e.target.value)}
                            id="nome"
                            label="First Name"
                            autoFocus
                            type="text"
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="cognome"
                            value = {cognome}
                            onChange = {(e)=>setCognome(e.target.value)}
                            label="Cognome"
                            name="cognome"
                            type="text"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            value={email}
                            onChange = {(e)=>setEmail(e.target.value)}
                            type="email"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            variant="outlined"
                            required
                            fullWidth
                            name="rip-password"
                            label="Ripeti Password"
                            type="password"
                            id="rip-password"
                            autoComplete="rip-password"
                          />
                        </Grid>
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                        <Button fullWidth variant="contained"
                            onClick = {(e)=>resetField(e)}
                            color="primary"
                            className={classes.submit}>
                            Annulla Modifiche
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Button type="submit" fullWidth variant="contained" 
                            color="primary"
                            className={classes.submit}
                            disabled = {activeChanges}>
                            Salva Modifiche
                          </Button>
                        </Grid>
                      </Grid>
                    </form>
                </div>
                {/*  <Box mt={8}>
                    <Copyright />
                </Box> */}
    </Container>
        </>
    )
}

export default Setting;
