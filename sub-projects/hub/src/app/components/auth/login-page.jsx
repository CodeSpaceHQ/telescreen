import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import logger from 'utils/logger';

import {
  Button,
  Form,
  Input,
  Header,
  Image,
  Grid,
  Segment,
} from 'semantic-ui-react';

import binaryEye from './Binary-Eye-2.png';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      redirectToHome: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit() {
    axios.post('http://127.0.0.1:3000/api/auth', {
      email: this.state.email,
      password: this.state.password,
    })
      .then(() => {
        this.setState({ redirectToHome: true });
      })
      .catch((error) => {
        logger.error(error);
      });
  }

  render() {
    if (this.state.redirectToHome) {
      return (
        <Redirect to={{ pathname: '/home-page' }} />
        // CHANGE TO HOME PATHNAME WHEN WE MAKE IT
      );
    }
    return (
      <div className='centered'>
        {/* <Image src={binaryEye}/> */}
        <Grid
          textAlign='center'
        >
          <Grid.Column>
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
                >Login
                </Button>
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}
