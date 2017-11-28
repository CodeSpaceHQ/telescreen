import React from 'react';
import axios from 'axios';
import logger from 'utils/logger';

import {
  Button,
  Form,
  Input,
  Header,
  Grid,
  Segment,
} from 'semantic-ui-react';

import HomeButton from '../home/home-button.jsx';
import '../app.css';


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
      <div>
        <HomeButton />
        <div className='centered'>
          <Grid
            className='center aligned grid'
            textAlign='center'
          >
            <Grid.Column>
              <Header
                as='h2'
                color='blue'
                textAlign='center'
              >
                  Add Admin
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
      </div>
    );
  }
}

export default AddAdmin;
