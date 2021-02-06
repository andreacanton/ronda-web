import React from 'react'
import { useParams } from "react-router-dom";
import AppBar from './Appbar';
const Main = (props) => {
    let {role} = props.match.params;
    return (
        <div>
            <AppBar role={role}/>
        </div>
    )
}

export default Main;
