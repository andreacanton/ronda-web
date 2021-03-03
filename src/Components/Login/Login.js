import React,{useState}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import instance from '../axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from "react-router-dom";
//import { useJwt } from "react-jwt";
import { isExpired, decodeToken } from "react-jwt";
import { BrowserRouter } from 'react-router-dom';

function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
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
  }));

const Login = () => {
    const history = useHistory();
    const [email, setEmail]  = useState('');
    const [pwd, setPwd]  = useState('');
    const [message, setMessage]  = useState('');
    const [error, setErrors]  = useState(false);
    //const history = useHistory();
    //const [jwtcode, setjwt] = useState('');

    const startLogin  = (e) =>{
        e.preventDefault();
        instance.post('/auth/login', {
            identity: email,
            password: pwd
        }).then((response) => {
            const jwtCode = response.data.access_token;
            console.log(jwtCode);
            const decode = decodeToken(jwtCode);
            const role = decode.role;
            sessionStorage.setItem('tokeJwt',jwtCode);
            localStorage.setItem('tokeJwt',jwtCode);
            //return (<Redirect to={`/Home/${role}`}/>);
            history.push(`/Home/${role}`);
        },(errors) =>{
            if(errors.response.status === 401){
                console.log("errore dati login" + errors);
                setErrors(true);
                setMessage("Email e/o Password errate. Perfavore reinseriscile correttamente");
            }else{
                setErrors(true);
                setMessage("Servizio momentaneamente non disponibile! Riprova più tardi");
            }
        } );
    } 

    const forgetPWD = (e) =>{
        e.preventDefault();
        history.push(`/respassword`);
    }

      const classes = useStyles();
    return (
       
        <>
            { error ? <div className="error__banner">{message}</div> : <div></div>}
            <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Accedi
        </Typography>
        <form className={classes.form} noValidate onSubmit={(e)=>startLogin(e)}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email} 
            onChange={(e)=> setEmail(e.target.value)}
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
            value={pwd} 
            onChange={(e)=>setPwd(e.target.value)}
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
        >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/respassword" variant="body2">
                Forgot password?
              </Link>
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

export default Login;

/*
    1074
    pollos
*/
