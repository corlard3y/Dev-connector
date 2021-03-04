import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const ProfileTop = ({ profile:{
    status,
    company,
    location,
    website,
    social,
    user: {name, avatar}
}
}) => {

  const classes = useStyles();


    return (
        <div className="profile-top bg-primary p-2">
            <Avatar alt="" src={avatar} className={classes.large} />
        {/* <img
          className="round-img my-1"
          src={avatar}
          alt=""
        /> */}
        <h1 className="large">{name}</h1>
        <p className="lead">{status} {company && <span> at {company}</span>}</p>
        <p>{location && <span>{location}</span>}</p>
        <div className="icons my-1">
            { website && (
                <a href={'//'+ website} target="_blank"    rel="noopener noreferrer">
                    <i className="fa fa-globe fa-2x"></i>
                </a>
                )}
            
            {social && social.twitter && (
                    <a href={'//'+social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fa fa-twitter fa-2x"></i>
          </a>
                )}
            {social && social.facebook && (
                <a href={'//'+social.facebook} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-facebook fa-2x"></i>
              </a>
            )}
            {social && social.linkedln && (
                <a href={'//'+social.linkedln} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-linkedin fa-2x"></i>
              </a>
                )}
            {social && social.youtube && (
                <a href={'//'+social.youtube} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-youtube fa-2x"></i>
              </a>
                )}
            {social && social.instagram && (
                <a href={'//'+social.instagram} target="_blank" rel="noopener noreferrer">
                <i className="fa fa-instagram fa-2x"></i>
              </a>
                )}
        </div>
      </div>
    )
}

ProfileTop.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileTop
