import React,{useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { Link } from 'react-router-dom';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';


const useStyles = makeStyles({
    root: {
    //   width: 500,
    backgroundColor:'#464e55',
    
},    
label:{
    color:'white',   
    // backgroundColor:'red'
    '&$selected': {
        // background: 'rgba(0, 0, 0, 0.12)',
        color: 'red',
      },
}, 
selected:{}
  });

const BottomNav = props => {

    const classes = useStyles();
    const [value, setValue] = useState('home');
  
    const handleChange = (e, newValue) => {
      setValue(newValue);
    };
    return (
        <div class='bottom-nav'>
            <BottomNavigation 
                showLabel={false}
                className={classes.root}
                value={value}
                onChange={handleChange}
                >
                <BottomNavigationAction 
                component={Link}
                to="/"
                value="home"
                // selected
                // className={classes.label}
                classes={{
                    label: classes.label, // class name, e.g. `root-x`
                    selected: classes.selected, // class name, e.g. `disabled-x`
                  }}
                label="Home" icon={<RestoreIcon />} />
                <BottomNavigationAction 
                component={Link}
                to="/register"
                className={classes.label}
                value="favorites"
                label="Favorites" icon={<FavoriteIcon className={classes.icon}/>} />
                <BottomNavigationAction 
                component={Link}
                to="/login"
                className={classes.label}
                value="login"
                label="Nearby" icon={<LocationOnIcon className={classes.icon}/>} />
          </BottomNavigation>
        </div>
    )
}

BottomNav.propTypes = {

}

export default (BottomNav);



