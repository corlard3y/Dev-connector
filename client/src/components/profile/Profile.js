import React,{ Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById} from '../../actions/profile'; 
import ProfileTop from './ProfileTop'; 
import ProfileAbout from './ProfileAbout'; 
import ProfileExperience from './ProfileExperience'; 
import ProfileEducation from './ProfileEducation'; 
import ProfileGithub from './ProfileGithub'; 


const Profile = ({ match,auth, getProfileById,profile:{profile, loading} }) => {

    useEffect(()=> {
        getProfileById(match.params.id);
    },[getProfileById]);
    return (
        <Fragment>
            {profile === null || loading ? <Spinner /> :
            <div className='saka'>
                         <Fragment>
                 <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <Link to='/profiles' className='btn profile-buttons'>
                     <i className='fa fa-chevron-left'></i>
                     <span className='hide-sm hide-xs'>
                     Back to Profiles
                     </span>
                     </Link>


                    {auth.isAuthenticated && auth.loading === false && auth.user._id === profile.user._id && (<Link to='/edit-profile' className='btn bg-post'>
                        <i className='fa fa-edit'></i>
                        <span className='hide-sm hide-xs'>
                        Edit Profile    
                         </span></Link>)}

                 </div>
                 <div className='profile-grid my-1'>

                    <ProfileTop profile={profile} />
                    <ProfileAbout profile={profile} />


                    <div className="profile-exp bg-white p-2">
                         <h2 className='text-primary'>Experience</h2> 
                         {profile.experience.length > 0 ? (<Fragment>
                             {profile.experience.map(experience => (
                                 <ProfileExperience key={experience._id} experience={experience} />
                             ))}
                         </Fragment>): (<h4>No experience credentials</h4>)}
                    </div>
                   
                    <div className="profile-edu bg-white p-2">
                         <h2 className='text-primary'>Education</h2> 
                         {profile.education.length > 0 ? (<Fragment>
                             {profile.education.map(education => (
                                 <ProfileEducation key={education._id} education={education} />
                             ))}
                         </Fragment>): (<h4>No Education credentials</h4>)}
                    </div>
                    {profile.githubusername && (
                        <ProfileGithub username={profile.githubusername} />
                    )}

                 </div>
             </Fragment>
            </div>
            
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
