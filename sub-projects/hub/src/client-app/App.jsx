import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import logger from 'utils/logger.js';
import * as locationUtils from 'utils/location.js';
import OAuthManager from 'server/oauth-manager.js';
import * as server from 'server';

import SetupForm from './components/SetupForm.jsx';

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
              output = null;
              OAuthManager.setCode(params.code);

              server.token(params.code)
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  logger.error(err.message);
                });
            }
          }

          return output;
        }}
      />

      <Route path='/setup' component={SetupForm} />
    </div>
  </HashRouter>
);

export default App;
