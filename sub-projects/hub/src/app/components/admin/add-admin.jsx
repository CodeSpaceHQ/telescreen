import React from 'react';

import { Button, Form, Grid, Segment } from 'semantic-ui-react';

export default class AddAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit() {
    console.log('Button was clicked');
  }

  render() {
    return (
      <Grid
        textAlign='center'
        style={{ height: '100%' }}
        verticalAlign='middle'
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Segment>
            <Form>
              <Form.Input
                fluid
                required
                label='E-mail Address'
                icon='user'
                iconPosition='left'
                placeholder='E-mail Address'
                onChange={this.handleChange}
              />
              <Button
                primary
                fluid
                icon='checkmark'
                content='Submit'
                onClick={this.handleSubmit}
              />
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

