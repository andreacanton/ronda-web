import React,{useState}from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button} from 'react-bootstrap';
import axios from './axios.js';
import {FaUser} from 'react-icons/fa';
import {RiLockPasswordFill} from 'react-icons/ri';
import avatar from '../../img/avatar.svg';
import './Login.css';

const Login = () => {
    const [email, setEmail]  = useState('');
    const [pwd, setPwd]  = useState('');

    const Login  = (e) =>{
        e.preventDefault();
        //alert("OKAY");
        axios.post('UserLogin', {
            email: email,
            password: pwd
        });
    } 

    return (
        <div className="body-forms">
            <div className="logo"></div>
            <div className="main">
                <h2>Ronda Web APP</h2>
                <div className="signin-signup">
                    <form className="sign-in-form" onSubmit={(e)=>Login(e)}>
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i><FaUser/></i>
                            <input type="text" placeholder="Username" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                        </div>
                        <div className="input-field">
                            <i><RiLockPasswordFill/></i>
                            <input type="password" placeholder="Password" value={pwd} onChange={(e)=>setPwd(e.target.value)}/>
                        </div>
                        <input type="submit" value="Login" class="btn solid"/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login;
