import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

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
        this.props.history.push('/add-admin');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className='login'>
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
