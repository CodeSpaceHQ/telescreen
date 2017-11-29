import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import Login from './components/login/login.jsx';
import Permission from './components/permission/permission.jsx';
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

      <Route path='/auth' component={Login} />
      <Route path='/permission' component={Permission} />
      <Route path='/add-admin' component={AddAdmin} />
      <Route path='/map' component={MapView} />
    </div>
  </HashRouter>
);

export default AppConfig;
