import React, { Fragment, useEffect } from 'react';
import './App.css';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import EditProfile from './components/profile-forms/EditProfile';
import CreateProfile from './components/profile-forms/CreateProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import PrivateRoute from './components/routing/PrivateRoute';
//redux
import { Provider } from "react-redux";
import store from './store';
import {loadUser} from './actions/auth';
import setAuthToken from './utils/setAuthToken';


if(localStorage.token){
  setAuthToken(localStorage.token);
}


const App = () =>  {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return(
  <Provider store={store}>
  <Router>
      <Fragment>
        <Navbar />
        <div className='upper'>
        <Route exact path='/' component={Landing} />
        </div>
      <section className="container">
      <Alert />
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/profiles' component={Profiles} />
            <Route path='/profile/:id' component={Profile} />
            {/* <Route path='/dashboard' component={Dashboard} /> */}
            <PrivateRoute path='/dashboard' component={Dashboard} />
            <PrivateRoute path='/create-profile' component={CreateProfile} />
            <PrivateRoute path='/edit-profile' component={EditProfile} />
            <PrivateRoute path='/add-experience' component={AddExperience} />
            <PrivateRoute path='/posts' component={Posts} />      
            <PrivateRoute path='/post/:id' component={Post} />      
            <PrivateRoute path='/add-education' component={AddEducation} />
          </Switch>
      </section>
      </Fragment>
    </Router>
  </Provider> 
  )
}

export default App;
