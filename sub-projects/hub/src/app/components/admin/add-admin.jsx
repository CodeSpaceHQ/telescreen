import React from 'react';

import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react';

class AddAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(ev) {
    const target = ev.target;
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
      </div>
    );
  }
}

export default AddAdmin;
