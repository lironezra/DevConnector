import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/navbar.component';
import LandingPage from './components/layout/landing-page.component';
import Login from './components/auth/login.component';
import Register from './components/auth/register.component';
import Alert from './components/layout/alert/alert.component';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

import './App.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Route exact path='/' component={LandingPage} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </section>
        </>
      </Router>
    </Provider>
  );
};

export default App;
