import React from 'react';

import * as server from 'server';
import logger from 'utils/logger.js';

import {
  Button,
  Form,
  Input,
  Header,
  Grid,
  Segment,
  Divider,
} from 'semantic-ui-react';

import HomeButton from '../home/home-button.jsx';

class AddPOI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
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
    server.createPerson({
      name: this.state.name,
    })
      .then(() => {
        this.setState({ name: '' });
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
                  Add POI
              </Header>
              <Segment>
                <Form>
                  <Form.Field>
                    <Input
                      icon='user'
                      iconPosition='left'
                      name='name'
                      placeholder='Name'
                      onChange={this.handleChange}
                      value={this.state.name}
                    />
                  </Form.Field>
                  <input type='file' />
                  <Divider />
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

export default AddPOI;
