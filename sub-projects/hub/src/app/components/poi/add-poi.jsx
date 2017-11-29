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

import HomeButton from '../home/home-button.jsx';

class AddPOI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      data_uri: null,
      processing: false,
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
      name: this.state.name,
      data_uri: this.state.data_uri,
      filename: this.state.filename,
      filetype: this.state.filetype,
    })
      .then((data) => {
        this.setState({
          name: '',
          processing: false,
          uploaded_uri: data.uri,
        });
      })
      .catch((error) => {
        logger.error(error);
      });
  }

  handleFile(e) {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.onload = (upload) => {
      this.setState({
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type,
      });
    };
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
                  <input type='file' onChange={this.handleFile} />
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
