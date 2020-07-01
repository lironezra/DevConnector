import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../routing/private-route.component';
import Login from '../auth/login.component';
import Register from '../auth/register.component';
import Alert from '../layout/alert/alert.component';
import Dashboard from '../dashboard/dashboard.component';
import CreateProfile from '../profile-forms/create-profile.component';
import EditProfile from '../profile-forms/edit-profile.component';
import AddExperience from '../profile-forms/add-experience.component';
import AddEducation from '../profile-forms/add-education.component';
import Profiles from '../profiles/profiles.component';
import Profile from '../profile/profile.component';
import Posts from '../posts/posts.component';
import Post from '../post/post.component';
import NotFound from '../layout/not-found.component';

const Routes = () => {
  return (
    <section className='container'>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/profiles' component={Profiles} />
        <PrivateRoute exact path='/profile/:id' component={Profile} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/add-experience' component={AddExperience} />
        <PrivateRoute exact path='/add-education' component={AddEducation} />
        <PrivateRoute exact path='/posts' component={Posts} />
        <PrivateRoute exact path='/posts/:id' component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
