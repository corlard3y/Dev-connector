import React,{ useEffect, Fragment} from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteAccount, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';


const Dashboard = ({ getCurrentProfile ,
    deleteAccount,
     auth: { user },
     profile: { profile, loading} }) => {
    
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);

    return (
       loading && profile === null ? <Spinner /> : 
       <div className='saka'>
            <Fragment>
           <h1 className='large text-primary'>Dashboard</h1>
           <p className='lead'>
               <i className='fa fa-user'>{' '}Welcome, { user && user.name }  </i>
           </p>
           {profile !== null ? <Fragment>
               <DashboardActions />
               <Experience experience={profile.experience}/>
               <Education education={profile.education}/>

                <div className='my-2'>
                    <div className="btn dash-danger" 
                    onClick={()=> deleteAccount()}>
                   <i className="fa fa-user">{'   '}
                   Delete My Account</i>
                    </div>
                </div>

           </Fragment>:
           <Fragment>
               <div className='centered mt-1'>
               <p className='centered'>You have not yet setup a profile, please add some info</p>
               <Link to='/create-profile' className='btn bg-post my-1'>Create Profile</Link>
               
               </div>
               </Fragment>}
       </Fragment>
       </div>
      
    )
}

Dashboard.propTypes = {
 getCurrentProfile: PropTypes.func.isRequired,
 deleteAccount:PropTypes.func.isRequired,
 auth: PropTypes.object.isRequired,
 profile: PropTypes.object.isRequired
};

const mapStateToProps =state => ({
    auth:state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
