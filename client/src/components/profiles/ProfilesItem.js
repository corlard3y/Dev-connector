import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';


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
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
  }));

const ProfilesItem = ({ profile: {


    user: { _id, name, avatar},
    status,
    company,
    location,
    // skills
}
}) => {

  const classes = useStyles();

    return (
      <Link to={`/profile/${_id}`}>

<div className="profile bg-light">
  <div className='pro-profile'>

  <Avatar alt="" src={avatar} className={classes.large} />
            <h2>{name}</h2>
  </div>
        {/* <div>{status} {company && <span> at {company},</span>}{location && <span>{location}</span>}

        </div> */}
        <div className='one'>
          <Link to={`/profile/${_id}`} className='btn-body hide-sm hide-xs'>View Profile</Link>

        </div>

        {/* <ul>
            {skills.slice(0, 4).map((skill, index) => (
                <li key={index} className='text-primary '>
                    <i className="fa fa-check"></i>{'  '} {skill}
                </li>
            ))}
        </ul> */}
        </div>
      </Link>
        
    )
}

ProfilesItem.propTypes = {

}

export default ProfilesItem
