import React from 'react';
import { Link } from 'react-router-dom';

const DashboardActions = () => {
    return (
        <div className="dash-buttons" 
        // style={{display:'flex',flexDirection:'row',justifyContent:'space-around'}}
        >
        <Link to="edit-profile" className='dash-buttons-dash' ><i className="fa fa-user-circle fa-5x text-primary" style={{color:'white',paddingBottom:'20px',marginTop:'25px'}}></i> <br/>
          
          <span style={{color:'white',fontSize:'17px'}}>Edit Profile</span></Link>

          
        <Link to="/add-experience" className='dash-buttons-dash'><i className="fa fa-black-tie fa-5x text-primary" style={{marginTop:'25px',color:'white',paddingBottom:'20px'}}></i> 
        <br/> <span style={{color:'white',fontSize:'17px'}}>Add Experience</span></Link>
        <Link to="/add-education" className='dash-buttons-dash'><i className="fa fa-graduation-cap fa-5x text-primary"style={{marginTop:'25px',color:'white',paddingBottom:'20px'}}></i> <br/> <span style={{color:'white',fontSize:'17px'}}>Add Education</span></Link>
      </div>
    )
};


export default DashboardActions;
