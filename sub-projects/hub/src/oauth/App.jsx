import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import Login from './components/Login.jsx';
import Permission from './components/Permission.jsx';

function App() {
  return (
    <HashRouter>
      <div>
        <Route
          exact
          path='/'
          render={() => (
            <Redirect to='/login' />
          )}
        />

        <Route path='/login' component={Login} />
        <Route path='/permission' component={Permission} />
      </div>
    </HashRouter>
  );
}

export default App;
