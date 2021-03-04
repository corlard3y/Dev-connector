import React,{Fragment,useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IMG from '../../img/showcase.jpg';

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
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const Landing = ({ isAuthenticated }) => {

  const classes = useStyles();

  if(isAuthenticated){
    return  <Redirect to='/dashboard' />

  }

    return (
      <Fragment>
    <section className="landing">
        <div className="landing-inner">
          <h1 className="land-large">Connect with Developers</h1>
          <p className="land-text">
            Create Developer profile/portfolio, share posts and get help from
            other developers all over the world
          </p>
          <div>
            <ul className='special'>
            <Link to='/register' ><li className="specialButtons">Sign Up{'   '}<i className='fa fa-arrow-right hide-sm'></i></li></Link>
            <Link to='/login'><li className="specialButtons">Login{'   '}<i className='fa fa-arrow-right hide-sm'></i></li></Link></ul>
          </div>
        </div>

     </section>
     <div style={{textAlign:'center',margin:'40px 0px 20px 0px'}}>
         <h1>What You Should Know</h1>
       </div>
     <div className='land-content'>
      <div>
             <b>RESPONSIVENESS</b><br></br>
             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </div>
          <div>
             <b>RESPONSIVENESS</b><br></br>
             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </div>
        </div>
              
              
              
               <div className='land-content hide-sm'>
               <div>
             <b>RESPONSIVENESS</b><br></br>
             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </div>
          <div>
             <b>RESPONSIVENESS</b><br></br>
             Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </div>
               </div>
     <div style={{textAlign:'center',margin:'20px 0px 20px 0px'}}><h1>Customer Testimonials</h1></div>
     <div className='land-body'>
       
              <div className="column">
              <div className="card">
                  <Avatar alt="Remy Sharp" src={IMG} className={classes.large} />
                <span><i>"This is a very good app that allows jivske vskuvsn svbushvbse jhbvjshv sjygbjse ws"</i><br></br>-Jane, New York</span></div>
            </div>
            <div className="column">
              <div className="card">
                  <Avatar alt="Remy Sharp" src={IMG} className={classes.large} />
                <span><i>"This is a very good app that allows jivske vskuvsn svbushvbse jhbvjshv sjygbjse ws"</i><br></br>-Jane, New York</span></div>
            </div>
     </div>
     <div className='land-body'>
     <div className="column">
              <div className="card">
                  <Avatar alt="Remy Sharp" src={IMG} className={classes.large} />
                <span><i>"This is a very good app that allows jivske vskuvsn svbushvbse jhbvjshv sjygbjse ws"</i><br></br>-Jane, New York</span></div>
            </div>
            <div className="column">
              <div className="card">
                  <Avatar alt="Remy Sharp" src={IMG} className={classes.large} />
                <span><i>"This is a very good app that allows jivske vskuvsn svbushvbse jhbvjshv sjygbjse ws"</i><br></br>-Jane, New York</span></div>
            </div>
     </div>
     <div className="footer">
     <div className="land-footer">
        <div className='footer-body'>
           <b> Categories</b>
           <Link to='#!'>Mac</Link>
           <Link to='#!'>iPad</Link>
           <Link to='#!'>iPhone</Link>
           <Link to='#!'>TV</Link>
           
        </div>
        <div  className='footer-body'>
            <b>About</b>
           <Link to='#!'>Privacy</Link>
           <Link to='#!'>Environment</Link>
           <Link to='#!'>Education</Link>
           <Link to='#!'>Account Information</Link>

        </div>
        <div className='footer-body'>
            <b>Support</b>
           <Link to='#!'>Privacy Policy</Link>
           <Link to='#!'>Terms of Sales</Link>
           <Link to='#!'>Sales and Refund</Link>
           <Link to='#!'>Legal</Link>

        </div>
        <div className='footer-body'>
            <b>Events</b>
           <Link to='#!'>This week</Link>
           <Link to='#!'>This Month</Link>
           <Link to='#!'>This Year</Link>

        </div>
        <div  className='footer-body'>
          <b>More from GeekyKolade</b>
          <Link to='#!'>More Apps from us</Link>
          <Link to='#!'>Info</Link>
          <Link to='#!'>Press</Link>
          <Link to='#!'>Work Here</Link>

        </div>
     </div>
     <hr
     style={{
      display: 'block',
      height: '1px',
      // width:'89%',
      border: '0',
      borderTop: '1px solid #90a4ae',
      margin: 'auto',
      padding: '0',
      marginTop:'20px'
     }}
     />
     <div className='last'>
         <div>
         <span> <b>DEVCON</b> Copyright &copy; corlard3y 2021</span>
         </div>
         
         <div>
             <Link to='#!'><i className='fa fa-instagram fa-2x'></i></Link>
             <Link to='#!'><i className='fa fa-facebook fa-2x'></i></Link>
             <Link to='#!'><i className='fa fa-twitter fa-2x'></i></Link>
             <Link to='#!'><i className='fa fa-google fa-2x'></i></Link>
             <Link to='#!'><i className='fa fa-linkedin fa-2x'></i></Link>
         </div>
     </div>

     </div>
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
