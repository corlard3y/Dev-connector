import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import ProfilesItem from './ProfilesItem';
import { getProfiles } from '../../actions/profile';

const Profiles = ({
    getProfiles,
    profile:{profiles, loading}
}) => {

    useEffect(()=> {
        getProfiles();
    }, [getProfiles]);

    return (
       <Fragment>
           {loading ? <Spinner /> : <Fragment>
               <h1 className="large text-primary">Developers</h1>
               <p className="lead">
                   <i className="fa fa-connectdevelop"></i>{'  '}Browse and connect with Developers
               </p>
               <div className="profiles">
                       {profiles.length > 0 ? (
                           profiles.map(profile => (
                               <ProfilesItem key={profile._id} profile={profile} />
                           ))
                    ) : <h4>No profiles found...</h4> }
                   </div>
               </Fragment>}
       </Fragment>
    )
}

Profiles.propTypes = {
getProfiles:PropTypes.func.isRequired,
Profile:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps,{getProfiles})(Profiles);
