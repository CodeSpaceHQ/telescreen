import React from 'react';
import PropTypes from 'prop-types';

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
    };
  }

  render() {
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
            onClick={() => this.props.history.push('/add-admin')}
          />
          <Divider hidden />
          <Button
            icon='address card'
            content='Add Person of Interest'
            primary
            fluid
            size='large'
            onClick={() => this.props.history.push('/add-poi')}
          />
          <Divider hidden />
          <Button
            icon='map pin'
            content='View Person of Interest Activity'
            primary
            fluid
            size='large'
            onClick={() => this.props.history.push('/map')}
          />
        </Segment>
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
