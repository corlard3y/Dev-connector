import React,{ Fragment }  from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';



// export const Navbar = ({ auth: { isAuthenticated, loading}, logout}) => {
    
//   const authLinks = (
//     <ul>
//       <li><Link to='/profiles'>
//         Developers</Link></li>
//        <li><Link to='/dashboard'>
//        <i className='fa fa-user'></i>{' '}
//         <span className='hide-sm'>Dashboard</span></Link></li>
//     <li><a onClick={logout} href='#!'>
//       <i className='fa fa-sign-out'></i>{' '}
//      <span className="hide-sm"> Logout</span></a></li>
//   </ul>
//   );
  
//   const guestLinks = (
//     <ul >
//         <Link to='/profiles'><li className='hide-sm'>
//         Developers</li></Link>
//         <Link to='/register'><li className='navButtons hide-sm'>Register</li></Link>
//         <Link to='/login'><li className='navButtons hide-sm'>Login</li></Link>
//       </ul>
//   );
  
//   return (
//         <nav className="navbar">
//       <h1>
//         <Link to='/'><i className="fa fa-code"></i> DevConnector</Link>
//       </h1>
//       { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>) }
//     </nav>
//     )
// };

// Navbar.propTypes = {
//    logout: PropTypes.func.isRequired,
//    auth: PropTypes.func.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth
// });

// export default connect(mapStateToProps, { logout})(Navbar);


import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
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
import useMediaQuery from '@material-ui/core/useMediaQuery';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
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
    backgroundColor:'#464e55'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    backgroundColor:'#464e55'
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

export const Navbar =({ auth: { isAuthenticated, loading}, logout}) => {

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const authSide = (
    <List style={{backgroundColor:'#464e55', color:'white'}}>
          <Link to='/dashboard' onClick={handleDrawerClose} className='nav-links'><ListItem button>
            <ListItemText><i className='fa fa-dashboard'></i>{'     '}Dashboard</ListItemText>
          </ListItem></Link>
          <Link to='/posts' onClick={handleDrawerClose} className='nav-links'><ListItem button>
            <ListItemText><i className='fa fa-comment'></i>{'     '}Posts</ListItemText>
          </ListItem></Link>
          <Link to='/profiles' onClick={handleDrawerClose} className='nav-links'><ListItem button>
            <ListItemText><i className='fa fa-users'></i>{'     '}Developers</ListItemText>
          </ListItem></Link>
          <Link onClick={logout} className='nav-links'><ListItem onClick={handleDrawerClose}button>
            <ListItemText><i className='fa fa-sign-out'></i>{'     '}Logout</ListItemText>
          </ListItem></Link>
      
    </List>
  );

  const guestSide = (
    <List style={{backgroundColor:'#464e55', color:'white'}}>
    <Link to='/' onClick={handleDrawerClose} className='nav-links'><ListItem>
      <small>
        DEVCONNECT is a platform for developers to meet and share ideas
      </small>
      </ListItem></Link>
      
    <Divider style={{}}/>
          <Link to='/profiles' onClick={handleDrawerClose} className='nav-links'><ListItem button>
            <ListItemText><i className='fa fa-users'></i>{'     '}Developers</ListItemText>
          </ListItem></Link>
          <Link to='/register' onClick={handleDrawerClose} className='nav-links'><ListItem button>
            <ListItemText><i className='fa fa-comment'></i>{'    '}Register</ListItemText>
          </ListItem></Link>
          <Link to='/login' onClick={handleDrawerClose} className='nav-links'><ListItem button>
            <ListItemText><i className='fa fa-key'></i>{'    '}Login</ListItemText>
          </ListItem></Link>
      
    </List> 
  );

  const authLinks = (
    <ul className='nav-top'>
      <Link to='/profiles'><li className='navButtons'>
      <i className='fa fa-users'></i>{' '}
        <span className='hide-sm'>Developers</span></li></Link>
        {/* <Link to='/posts'><li className='navButtons'>
      <i className='fa fa-comment'></i>{' '}
        <span className='hide-sm'>Posts</span></li></Link> */}
       <Link to='/dashboard'><li className='navButtons'>
       <i className='fa fa-dashboard'></i>{' '}
        <span className='hide-sm'>Dashboard</span></li></Link>
    <Link onClick={logout} to='#!'><li className='navButtons'>
      <i className='fa fa-sign-out'></i>{' '}
     <span className="hide-sm"> Logout</span></li></Link>
  </ul>
  );
  
  const guestLinks = (
    <ul className='nav-top'>
        {/* <Link to='/profiles'><li className='navButtons hide-sm'>
        Developers</li></Link> */}
        <Link to='/register'><li className='navButtons hide-sm'>Register</li></Link>
        <Link to='/login'><li className='navButtons hide-sm'>Login</li></Link>
      </ul>
  );



  return (
    <div className={classes.root}
     >
      <CssBaseline />
      <AppBar
      style={{
        backgroundColor:'white',
        color:'#464e55',
        // height:'65px'
        // boxShadow:'0px 0px 0px 0px'
      }}
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{display:'flex',flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
          <IconButton
          // style={{marginRight:'auto'}}
            aria-label="open drawer"
            style={{margin:'0px 0px 0px 0px'}}
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />         
          </IconButton>
          <Typography style={{marginRight:'auto'}}>
             <h2 className='dev'><Link to='/' onClick={handleDrawerClose}>DevConnector</Link></h2>
          </Typography>
             { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>) }

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
          <IconButton onClick={handleDrawerClose} style={{color:'white'}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        {!loading && (<Fragment>{isAuthenticated ? authSide : guestSide}</Fragment>)}

        {/* <List style={{backgroundColor:'black', color:'white'}}>
        <Link to='/' onClick={handleDrawerClose} className='nav-links'><ListItem>
          <small>
            DEVCONNECT is a platform for developers to meet and share ideas
          </small>
          </ListItem></Link>
          
        <Divider style={{backgroundColor:'#464e55'}}/>
              <Link to='/profiles' onClick={handleDrawerClose} className='nav-links'><ListItem button>
                <ListItemText>Developers</ListItemText>
              </ListItem></Link>
              <Link to='/register' onClick={handleDrawerClose} className='nav-links'><ListItem button>
                <ListItemText>Register</ListItemText>
              </ListItem></Link>
              <Link to='/login' onClick={handleDrawerClose} className='nav-links'><ListItem button>
                <ListItemText>Login</ListItemText>
              </ListItem></Link>
          
        </List> */}
        {/* <Divider style={{color:'white',backgroundColor:'white'}}/> */}
      </Drawer>
     
    </div>
  );
};


Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
 auth: state.auth
});

export default connect(mapStateToProps, { logout})(Navbar);
