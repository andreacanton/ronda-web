import React from 'react';
import Login from './Login/Login';
import Main from './Main/Main';
import ForgetPassword from './forgetPWD/forgetPassword';
import Userlist from './Userlist/Userlist';
import Createuser from './CreateUser/Createuser';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
    
const Ronda = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/Home/:role" component={Main} />
                <Route exact path="/" type="guest" component={Login}/>
                <Route exact path="/reset-password" component={ForgetPassword}/>
                <Route exact path="/userList/:role" component={Userlist}/>
                <Route exact path="/create-new-user/:role" component={Createuser}/>
            </Switch>
        </Router>
    )
}

export default Ronda;
