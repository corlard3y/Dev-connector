import React,{Fragment} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


const Landing = ({ isAuthenticated }) => {
  if(isAuthenticated){
    return  <Redirect to='/dashboard' />
  }

    return (
      <Fragment>
    <section className="landing">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create Link developer profile/portfolio, share posts and get help from
            other developers
          </p>
          <div>
            <ul className='special'>
            <Link to='/register' ><li className="specialButtons">Sign Up{'   '}<i className='fa fa-arrow-right hide-sm'></i></li></Link>
            <Link to='/login'><li className="specialButtons">Login{'   '}<i className='fa fa-arrow-right hide-sm'></i></li></Link></ul>
          </div>
        </div>

     </section>
     </Fragment>
    )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStatetoProps = state => ({
  isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStatetoProps)(Landing);
