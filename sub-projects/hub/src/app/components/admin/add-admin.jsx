import React from 'react';

import { Button, Form } from 'semantic-ui-react';

export default class AddAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  render() {
    return (
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
          icon='checkmark'
          content='Submit'
        />
      </Form>
    );
  }
}

