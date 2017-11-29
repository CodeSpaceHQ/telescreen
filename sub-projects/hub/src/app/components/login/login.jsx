import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import logger from 'utils/logger.js';
import * as server from 'server';
import * as locationUtils from 'utils/location.js';
import OAuthManager from 'server/oauth-manager.js';

import {
  Button,
  Form,
  Input,
  Header,
  Segment,
} from 'semantic-ui-react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.params = locationUtils.getURLParams();

    locationUtils.removeURLParams();

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
      await server.createClient({
        redirectURL: window.location.origin,
        email: this.state.email,
      });

      await server.login(this.state.email, this.state.password);

      if (this.params.response_type === 'code') {
        OAuthManager.setExternClientID(this.params.client_id);
        OAuthManager.setExternClientRedirect(this.params.redirect_uri);
        OAuthManager.setState(this.params.state);

        this.props.history.push('/permission');
      } else {
        this.props.history.push('/home-page');
      }
    } catch (err) {
      logger.error(err);
    }
  }

  render() {
    if (OAuthManager.getRefresh() && this.params.response_type === 'code') {
      return <Redirect to='/permission' />;
    }

    if (OAuthManager.getRefresh()) {
      return <Redirect to='/home-page' />;
    }

    return (
      <div className='centered'>
        <Header
          as='h2'
          color='blue'
          textAlign='center'
        >
          Welcome to Telescreen!
        </Header>
        <Segment>
          <Form>
            <Form.Field>
              <Input
                icon='user'
                iconPosition='left'
                required
                name='email'
                type='email'
                placeholder='E-mail Address'
                onChange={this.handleChange}
                value={this.state.email}
              />
            </Form.Field>
            <Form.Field>
              <Input
                icon='lock'
                iconPosition='left'
                required
                name='password'
                type='password'
                placeholder='Password'
                onChange={this.handleChange}
                value={this.state.password}
              />
            </Form.Field>
            <Button
              type='submit'
              fluid
              primary
              size='large'
              onClick={this.handleSubmit}
            >
              Login
            </Button>
          </Form>
        </Segment>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
