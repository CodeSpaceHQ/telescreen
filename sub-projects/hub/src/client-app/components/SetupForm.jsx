import React from 'react';

import logger from 'utils/logger.js';
import * as server from 'server';
import * as locationUtils from 'utils/location.js';
import OAuthManager from 'server/oauth-manager.js';

import {
  Button,
  Input,
  Form,
  Segment,
} from 'semantic-ui-react';

class SetupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      location: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  async handleSubmit() {
    try {
      const state = OAuthManager.genState(5);
      await server.createClient({
        redirectURL: window.location.origin,
        name: this.state.name,
        location: this.state.location,
      });

      OAuthManager.setState(state);

      locationUtils.navigate('http://127.0.0.1:8080/', {
        state,
        client_id: OAuthManager.getClientID(),
        redirect_uri: OAuthManager.getClientRedirect(),
        response_type: 'code',
      });
    } catch (err) {
      logger.error(err);
    }
  }

  render() {
    return (
      <div className='centered'>
        <Segment>
          <Form>
            <Form.Field>
              <Input
                required
                name='name'
                type='text'
                placeholder='Name your device'
                onChange={this.handleChange}
                value={this.state.name}
              />
            </Form.Field>
            <Form.Field>
              <Input
                required
                name='location'
                type='text'
                placeholder='Where is your device located?'
                onChange={this.handleChange}
                value={this.state.location}
              />
            </Form.Field>
            <Button
              primary
              fluid
              size='large'
              onClick={this.handleSubmit}
            >
              Login with Telescreen
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

export default SetupForm;
