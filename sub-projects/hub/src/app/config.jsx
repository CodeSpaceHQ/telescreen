import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import LoginPage from './components/auth/login-page.jsx';
import AddAdmin from './components/admin/add-admin.jsx';
import HomePage from './components/home/home-page.jsx';

axios.defaults.withCredentials = true;

const AppConfig = () => (
  <HashRouter>
    <div>
      <Route
        exact
        path='/'
        render={() => (
          <Redirect to='/auth' />
        )}
      />
      <Route path='/auth' component={LoginPage} />
      <Route path='/add-admin' component={AddAdmin} />
      <Route path='/home-page' component={HomePage} />
    </div>
  </HashRouter>
);

export default AppConfig;
