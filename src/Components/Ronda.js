import React from 'react';
import Login from './Login/Login';
import Main from './Main/Main';
import ForgetPassword from './forgetPWD/forgetPassword';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
    
const Ronda = () => {
    /* if(!sessionStorage.getItem("tokeJwt")){
        return(<> <Login/> ? <forgetPWD/> </>) 
    } */

    return (
        <Router>
            <Switch>
                <Route exact path="/Home/:role" component={Main} />
                <Route exact path="/" type="guest" component={Login}/>
                <Route exact path="/reset-password" component={ForgetPassword}/>
            </Switch>
        </Router>
    )
}

export default Ronda;
