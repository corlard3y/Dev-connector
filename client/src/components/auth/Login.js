import React, {Fragment, useState} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [ formData, setFormdata] = useState({
        email:'',
        password:'',
    });

    const { email, password} = formData; 

    const onChange = e => setFormdata({ ...formData, [e.target.name]: e.target.value});
 
    const onSubmit = async e => {
            e.preventDefault();
 
            login(email, password);
      
     }

     //redirect if logged in
     if(isAuthenticated){
       return <Redirect to='/dashboard'/>
     }
   
    return (
       <Fragment>
         <div className='saka'>
      <p className="lead"><i className="fa fa-user"></i> Sign Into Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="email" 
          placeholder="Email Address"
          name="email"
          value={email} 
          onChange={ e => onChange(e)}
          required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password} 
          onChange={ e => onChange(e)}
          />
        </div>
        <div className='commit'>
             <input type="submit" 
        className="pre-Buttons" 
        value="Login" />
        </div>
      </form>
      <p className="my-1 centered" style={{marginTop:'4rem',fontSize:'0.75rem'}}>
        Don't have an Account?? <Link to='/register'><span className='link-btn'>Join</span></Link>
      </p>
         </div>
         
       </Fragment>
    )
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login })(Login);
