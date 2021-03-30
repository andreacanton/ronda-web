import React,{useState, useEffect}from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { useHistory } from "react-router-dom";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import { TrendingUpRounded } from '@material-ui/icons';
import { isExpired, decodeToken } from "react-jwt";



const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function Appbar(props) {
    const history = useHistory();
    const logoutF = (e) =>{
        e.preventDefault();
        sessionStorage.removeItem('tokeJwt');
        history.push(`/`);

    }
    var objToRender = [];
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const jwtCode = sessionStorage.getItem('tokeJwt');
    const decode = decodeToken(jwtCode);
    const role = decode.role;
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const changePage = (e,text) =>{
      e.preventDefault();
      if(text === 'Lista Utenti'){
        history.push(`/userList/${role}`);
      }
      if(text === 'impostazioni'){
        history.push(`/impostazioni/${role}`);
      }
    }

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
      if(role ==='admin'){
        setIsAdmin(TrendingUpRounded);
      }
      else if(role ==='member'){
        setIsAdmin(false);
      } 
    },[]);


  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Apri Menu"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
             Ronda WEB
          </Typography>
          {/* <Button color="inherit" onClick={(e)=>logoutF(e)}>Log Out</Button> */}
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem  selected button onClick={(e)=>{ e.preventDefault(); history.push(`/Home/${role}`);}}>
                <ListItemIcon><HomeOutlinedIcon/></ListItemIcon>
                <ListItemText>Home</ListItemText>
            </ListItem>
        </List>
       {
          isAdmin ? 
            <List>
              <ListItem button onClick ={(e)=>changePage(e,"Lista Utenti")}>
                <ListItemIcon><ListAltIcon /></ListItemIcon>
                <ListItemText>Lista Utenti</ListItemText>
              </ListItem>
              <ListItem button onClick ={(e)=>changePage(e,"Lista Assistiti")}>
                <ListItemIcon><ListAltIcon /></ListItemIcon>
                <ListItemText>Lista Assistiti</ListItemText>
              </ListItem>
            </List>
           :<List>
              <ListItem button onClick ={(e)=>changePage(e,"Lista Assistiti")}>
                <ListItemIcon><ListAltIcon /></ListItemIcon>
                <ListItemText>Lista Assistiti</ListItemText>
              </ListItem>
            </List>
          }
        <List>
            <ListItem button onClick={(e)=>changePage(e,"impostazioni")}>
                <ListItemIcon><SettingsOutlinedIcon/></ListItemIcon>
                <ListItemText>Impostazioni Utente</ListItemText>
            </ListItem>
        </List>
        <Divider/>
        <List>
            <ListItem button onClick={(e)=>logoutF(e)}>
                <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                <ListItemText> Log Out</ListItemText>
            </ListItem>
        </List>
      </Drawer> 
      {/* <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
      </main> */}
    </div>
  );
}