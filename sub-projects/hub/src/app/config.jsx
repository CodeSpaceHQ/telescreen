import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import LoginPage from './components/auth/login-page.jsx';
import AddAdmin from './components/admin/add-admin.jsx';
import MapView from './components/map/map-view.jsx';

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
      <Route path='/map' component={MapView} />
    </div>
  </HashRouter>
);

export default AppConfig;
