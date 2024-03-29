import React, {Fragment, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
// import axios from "axios";
import PropTypes from 'prop-types';


const Register = ({ setAlert, register, isAuthenticated }) => {
    const [ formData, setFormdata] = useState({
        name: '',
        email:'',
        password:'',
        password2:''
    });

    const { name, email, password, password2 } = formData; 

    const onChange = e => setFormdata({ ...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Passwords do not match!!!', 'danger');
        }
        else{
            register({ name, email, password });
        }
     };

     //redirect if successful
     if(isAuthenticated){
      return <Redirect to='/dashboard'/>;
    }
   
    return (
       <Fragment>
         <div className='saka'>
         <div className='saka-inner'> 

      <p className="lead"><i className="fa fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" 
          placeholder="Username" 
          name="name" 
          value={name} 
          onChange={ e => onChange(e)}
          // required
           />
        </div>
        <div className="form-group">
          <input type="email" 
          placeholder="Email Address"
          name="email"
          value={email} 
          onChange={ e => onChange(e)}
          // required
          />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            // minLength="6"
            value={password} 
          onChange={ e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            value={password2} 
          onChange={ e => onChange(e)}
            // minLength="6"
          />
        </div>
        <div className='commit'>
        <input type="submit" 
        className="pre-Buttons" 
        value="Register" />
        </div>
        
      </form>
      <p className="my-1 centered"  style={{marginTop:'4rem',fontSize:'0.75rem'}}>
        Already have an account? <Link to='/login'><span className='link-btn'>Sign In</span></Link>
      </p>
      </div>
         </div>
           
       </Fragment>
    )
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
