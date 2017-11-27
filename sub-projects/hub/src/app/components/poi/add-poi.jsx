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
  Divider,
} from 'semantic-ui-react';

import '../app.css';


class AddPOI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  handleChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  handleSubmit() {
    axios.post('', {
      email: this.state.email,
    })
      .then(() => {
        this.setState({ email: '' });
      })
      .catch((error) => {
        logger.error(error);
      });
  }

  handleFile() {
  }

  render() {
    return (
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
                <Button
                  type='submit'
                  icon='image'
                  content='Choose File'
                  fluid
                  size='large'
                  onClick={this.handleFile}
                />
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
    );
  }
}

export default AddPOI;
