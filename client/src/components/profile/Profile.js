import React,{ Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById} from '../../actions/profile';

const Profile = ({ match, getProfileById,profile:{profile, loading} }) => {

    useEffect(()=> {
        getProfileById(match.params.id);
    },[getProfileById]);
    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> :
             <Fragment>
                 <Link to='/profiles' className='btn btn-light'>Back to Profiles</Link>
             </Fragment>
            }
        </Fragment>
    )
};

Profile.propTypes = {
    getProfileById:PropTypes.func.isRequired,
    profile:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
}; 

const mapStatetoProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStatetoProps, { getProfileById })(Profile);
