import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/navbar.component';
import LandingPage from './components/layout/landing-page.component';
import Routes from './components/routing/routes.component';

//Redux
import { Provider } from 'react-redux';
import store from './redux/store';
import { loadUser } from './redux/auth/auth.actions';
import setAuthToken from './utils/setAuthToken';

import './App.css';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <>
          <Navbar />
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Routes />
          </Switch>
        </>
      </Router>
    </Provider>
  );
};

export default App;
