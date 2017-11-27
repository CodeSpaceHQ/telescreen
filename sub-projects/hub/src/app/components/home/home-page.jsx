import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Segment, Divider } from 'semantic-ui-react';

import '../app.css';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigateToAddAdmin: false,
      navigatetoAddPOI: false,
    };
  }

  render() {
    if (this.state.navigateToAddAdmin) {
      return <Redirect to='/add-admin' />;
    } else if (this.state.navigatetoAddPOI) {
      return <Redirect to='/add-poi' />;
    }
    return (
      <div className='centered'>
        <Segment padded>
          <Button
            icon='user plus'
            content='Add Admin'
            primary
            fluid
            size='large'
            onClick={() => this.setState({ navigateToAddAdmin: true })}
          />
          <Divider hidden />
          <Button
            icon='address card'
            content='Add Person of Interest'
            primary
            fluid
            size='large'
            onClick={() => this.setState({ navigatetoAddPOI: true })}
          />
        </Segment>
      </div>
    );
  }
}
