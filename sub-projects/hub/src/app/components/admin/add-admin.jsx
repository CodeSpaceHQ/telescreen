import React from 'react';
import axios from 'axios';
import logger from 'utils/logger';

import {
  Button,
  Form,
  Input,
  Header,
  Grid,
  Segment } from 'semantic-ui-react';


class AddAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
    axios.post('http://127.0.0.1:3000/api/users', {
      email: this.state.email,
    })
      .then(() => {
        this.setState({ email: '' });
      })
      .catch((error) => {
        logger.error(error);
      });
  }

  render() {
    return (
      <div className='login-form'>
        <style>{`
                    body > div,
                    body > div > div,
                    body > div > div > div.login-form {
                      height: 100%;
                    }
                `}</style>
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
                Add Admin
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
                <Button
                  type='submit'
                  icon='checkmark'
                  content='Submit'
                  fluid
                  primary
                  size='large'
                  onClick={this.handleSubmit}
                />
              </Form>
            </Segment>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AddAdmin;
