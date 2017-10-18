import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import LoginPage from './components/auth/login-page.jsx';


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
      </div>
    </HashRouter>
);

export default AppConfig;