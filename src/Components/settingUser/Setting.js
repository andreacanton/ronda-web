import React, {useState, useEffect} from 'react';
import Appbar from '../Appbar';
import {Grid, Container, Button,TextField, 
        FormControlLabel,CssBaseline, Typography,Avatar,
        Card, CardHeader,IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import instance from '../axios';
import { sizing } from '@material-ui/system';


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
    const [role, setRole] = useState('');
    const [iniziali, setIniziali] = useState('');
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
          setName(mydataReponse.firstname +" "+mydataReponse.lastname);
          setRole(mydataReponse.role);
          console.log(mydataReponse);
          setEmail(mydataReponse.email);
          setEmailChange(mydataReponse.email);
          setIniziali(mydataReponse.firstname.charAt(0)+mydataReponse.lastname.charAt(0));
        }).catch(err =>{
          //setMessageError('Connessione al server non riuscita, riprovare tra qualche instante.');
          console.log("Error"+err);
        })
      },[]);
    const classes = useStyles();
    return (
        <>
           <Appbar/>
           <Container component="main" maxWidth="xs">
                <CssBaseline />
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
                            title={name}
                            subheader={role}
                        />
                    </Card>
                    <form className={classes.form} noValidate>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={emailChange} 
                            onChange={(e)=> setEmailChange(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={name} 
                            onChange={(e)=>setName(e.target.value)}
                        />
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
