import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Segment,
  Divider,
  Header,
} from 'semantic-ui-react';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigateToAddAdmin: false,
      navigatetoAddPOI: false,
      navigatetoViewPOI: false,
    };
  }

  render() {
    if (this.state.navigateToAddAdmin) {
      return <Redirect to='/add-admin' />;
    } else if (this.state.navigatetoAddPOI) {
      return <Redirect to='/add-poi' />;
    } else if (this.state.navigatetoViewPOI) {
      return <Redirect to='/map' />;
    }
    return (
      <div className='centered'>
        <Header
          as='h2'
          color='blue'
          textAlign='center'
        >
          Main Menu
        </Header>
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
          <Divider hidden />
          <Button
            icon='map pin'
            content='View Person of Interest Activity'
            primary
            fluid
            size='large'
            onClick={() => this.setState({ navigatetoViewPOI: true })}
          />
        </Segment>
      </div>
    );
  }
}
