import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import LoginPage from './components/auth/login-page.jsx';
import AddAdmin from './components/admin/add-admin.jsx';

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
    </div>
  </HashRouter>
);

export default AppConfig;
