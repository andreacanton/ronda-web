import React,{useState}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {FaUser} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import { useHistory } from "react-router-dom";
import './Login.css';
import avatar from './img/avatar.svg';
import bg from './img/phone.svg';
import wave from './img/wavess.svg';
//import { useJwt } from "react-jwt";
import { isExpired, decodeToken } from "react-jwt";
import { BrowserRouter, Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';


const Login = () => {
    const history = useHistory();
    const [email, setEmail]  = useState('');
    const [pwd, setPwd]  = useState('');
    //const history = useHistory();
    //const [jwtcode, setjwt] = useState('');

    const startLogin  = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:3000/auth/login', {
            identity: email,
            password: pwd
        }).then((response) => {
            const jwtCode = response.data.access_token;
            console.log(jwtCode);
            const decode = decodeToken(jwtCode);
            const role = decode.role;
            sessionStorage.setItem('tokeJwt',jwtCode);
            //return (<Redirect to={`/Home/${role}`}/>);
            history.push(`/Home/${role}`);
        },(errors) =>{
            if(errors.response.status === 401)
                console.log("errore dati login" + errors);
                return <p>Error di Login</p>;
        } );
    } 

    const forgetPWD = (e) =>{
        e.preventDefault();
        history.push(`/reset-password`);
    }

    return (
        <>
            <img className="wave" src={wave} alt="onda"/>
            <div className="container">
                <div className="img">
                    <img src={bg} alt="background"/>
                </div>
            <div className="login-content">
                <form onSubmit={(e)=>startLogin(e)}>
                    <img src={avatar} alt="login"/>
                    <h2 className="title">Ronda Web App</h2>
                       <div className="input-div one">
                          <div className="i">
                            <i><FaUser/></i>
                          </div>
                          <div className="div">
                                  {/* <h5>Username</h5> */}
                                  <input type="text" placeholder="Username" className="input" value={email} onChange={(e)=> setEmail(e.target.value)} /> 
                          </div>
                       </div>
                       <div className="input-div pass">
                          <div className="i"> 
                            <i><RiLockPasswordFill/></i>
                          </div>
                          <div className="div">
                               {/* <h5>Password</h5> */}
                               <input type="password" placeholder="Password" className="input" value={pwd} onChange={(e)=>setPwd(e.target.value)} />
                          </div>
                        </div>
                        {/* <BrowserRouter> */}
                            <Button className="Link" onClick={(e)=>forgetPWD(e) }>Password Dimenticata ?</Button>
                        {/* </BrowserRouter> */}
                     {/* <p style={{display: err ? 'none':'none'}}>Errore autenticazione! Inserisci nuovamente i dati</p> */}
                    <input type="submit" className="btn" value="Login"/>
                </form>
            </div>
            </div>
        </>
    )
}

export default Login;

/*
    1074
    pollos
*/
