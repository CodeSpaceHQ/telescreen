import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import logger from 'utils/logger.js';
import * as locationUtils from 'utils/location.js';
import OAuthManager from 'server/oauth-manager.js';

import SetupForm from './components/SetupForm.jsx';
import Finished from './components/Finished.jsx';

const App = () => (
  <HashRouter>
    <div>
      <Route
        exact
        path='/'
        render={() => {
          const params = locationUtils.getURLParams();
          locationUtils.removeURLParams();

          let output = <Redirect to='/setup' />;
          if (params.code) {
            if (params.state !== OAuthManager.getState()) {
              logger.error(`Invalid state: ${params.state}`);
            } else {
              OAuthManager.setCode(params.code);
              output = <Redirect to='/finished' />;
            }
          }

          return output;
        }}
      />

      <Route path='/setup' component={SetupForm} />
      <Route path='/finished' component={Finished} />
    </div>
  </HashRouter>
);

export default App;
