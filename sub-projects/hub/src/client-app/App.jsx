import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import logger from 'utils/logger.js';
import * as locationUtils from 'utils/location.js';
import OAuthManager from 'server/oauth-manager.js';

import OAuth from './components/OAuth.jsx';

const App = () => (
  <HashRouter>
    <div>
      <Route
        exact
        path='/'
        render={() => {
          const params = locationUtils.getURLParams();
          locationUtils.removeURLParams();

          let output = <Redirect to='/oauth' />;
          if (params.code) {
            if (params.state !== OAuthManager.getState()) {
              logger.error(`Invalid state: ${params.state}`);
            } else {
              OAuthManager.setCode(params.code);

              output = <Redirect to='/setup' />;
            }
          }

          return output;
        }}
      />

      <Route path='/oauth' component={OAuth} />
    </div>
  </HashRouter>
);

export default App;
