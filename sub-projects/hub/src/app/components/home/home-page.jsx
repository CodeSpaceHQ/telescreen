import React from 'react';
// import { HashRouter, Route, Redirect } from 'react-router-dom';
import { Button, Segment, Divider } from 'semantic-ui-react';

import '../app.css';

export default class HomePage extends React.Component {
  render() {
    return (
      <div className='centered'>
        <Segment padded>
          <Button
            icon='user plus'
            content='Add Admin'
            primary
            fluid
            size='large'
          />
          <Divider hidden />
          <Button
            icon='address card'
            content='Add Person of Interest'
            primary
            fluid
            size='large'
          />
        </Segment>
      </div>
    );
  }
}
