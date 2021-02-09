import React,{useState, useEffect} from 'react';
import axios from 'axios';
/* import { useMediaQuery } from '@material-ui/core';
import { List, SimpleList, Datagrid, TextField, ReferenceField, EditButton } from 'react-admin';
 */
const Listuser = () => {
    const [user, setUser] = useState(['']);
    const token = sessionStorage.getItem('tokeJwt');

    const instance = axios.create({
        baseURL: 'http://localhost:3000',
        timeout: 1000,
        headers: {'Authorization': 'Bearer '+token}
      });
      
      instance.get('/users')
      .then(response => {
        setUser(response.data);
      })
    /*useEffect(async () => {

    }, []); */

    return (
        <div>
            
        </div>
    )
}

export default Listuser;
