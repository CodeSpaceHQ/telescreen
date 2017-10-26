import React from 'react';
<<<<<<< HEAD
import { Button } from 'semantic-ui-react';

export default class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <Button>Login Page</Button>
=======
import axios from 'axios';
import logger from 'utils/logger';
import {
  Button,
  Form,
  Input,
  Header,
  Image,
  Grid,
  Segment } from 'semantic-ui-react';
import { Redirect } from 'react-router-dom';
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
        <Redirect to={{ pathname: '/add-admin' }} />
        // CHANGE TO HOME PATHNAME WHEN WE MAKE IT
      );
    }
    return (
      <div className='login-form'>
        <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                      height: 100%;
                    }
                `}</style>

        {/* <Image src={binaryEye}/> */}

        <Grid
          textAlign='center'
          style={{ height: '100%' }}
          verticalAlign='middle'
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header
              as='h2'
              color='blue'
              textAlign='center'
            >
                Welcome to Telescreen!
            </Header>
            <Segment>
              <Form className='ui large form'>
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
>>>>>>> master
      </div>
    );
  }
}
