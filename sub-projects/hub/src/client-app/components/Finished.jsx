import React from 'react';

import logger from 'utils/logger.js';
import * as server from 'server';
import OAuthManager from 'server/oauth-manager.js';

import {
  Header,
  Dimmer,
  Loader,
} from 'semantic-ui-react';

class Finished extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      finished: false,
    };
  }

  /* eslint-disable react/no-did-mount-set-state */
  async componentDidMount() {
    try {
      await server.token(OAuthManager.getCode());

      this.setState({
        finished: true,
      });
    } catch (err) {
      logger.error(err.message);
    }
  }

  render() {
    return (
      <div className='centered'>
        <Dimmer active={!this.state.finished}>
          <Loader />
        </Dimmer>

        <Header
          as='h2'
          color='blue'
          textAlign='center'
        >
          Device has been set up!
        </Header>
      </div>
    );
  }
}

export default Finished;
