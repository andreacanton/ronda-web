import React,{useState, useEffect} from 'react';
import { useMediaQuery } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import Switch from '@material-ui/core/Switch';
import instance from '../axios';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

const Listuser = () => {
  const classes = useStyles();
  const [userlist, setUserlist] = useState([]);
  const [messageError, setMessageError] = useState('');
  const jwtCode = sessionStorage.getItem('tokeJwt');
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

  return (
    <>
      <h2>Lista Membri</h2>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Numero Membro</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Nome</TableCell>
            <TableCell>Ruolo</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userlist.map((row) => (
            <TableRow key={row.user_id}>
              <TableCell>{row.member_number}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.firstname +" "+ row.lastname}</TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  )
}

export default Listuser;
