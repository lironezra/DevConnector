import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/navbar.component';
import LandingPage from './components/layout/landing-page.component';
import Login from './components/auth/login.component';
import Register from './components/auth/register.component';

import './App.css';

const App = () => (
  <Router>
    <>
      <Navbar />
      <Route exact path='/' component={LandingPage} />
      <Switch>
        <section className='container'>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
        </section>
      </Switch>
    </>
  </Router>
);

export default App;
