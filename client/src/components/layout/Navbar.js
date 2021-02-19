import React,{ Fragment }  from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';


export const Navbar = ({ auth: { isAuthenticated, loading}, logout}) => {
    
  const authLinks = (
    <ul>
      <li><Link to='/profiles'>
        Developers</Link></li>
       <li><Link to='/dashboard'>
       <i className='fa fa-user'></i>{' '}
        <span className='hide-sm'>Dashboard</span></Link></li>
    <li><a onClick={logout} href='#!'>
      <i className='fa fa-sign-out'></i>{' '}
     <span className="hide-sm"> Logout</span></a></li>
  </ul>
  );
  
  const guestLinks = (
    <ul >
        {/* <li className='navButtons'><Link to='/profiles'>
        Developers</Link></li> */}
        <Link to='/register'><li className='navButtons'>Register</li></Link>
        <Link to='/login'><li className='navButtons'>Login</li></Link>
      </ul>
  );
  
  return (
        <nav className="navbar">
      <h1>
        <Link to='/'><i className="fa fa-code"></i> DevConnector</Link>
      </h1>
      { !loading && (<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>) }
    </nav>
    )
};

Navbar.propTypes = {
   logout: PropTypes.func.isRequired,
   auth: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout})(Navbar);