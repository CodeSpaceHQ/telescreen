import React from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'semantic-ui-react';

class HomeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/home-page' />;
    }
    return (
      <Button
        icon='home'
        primary
        fluid
        size='large'
        onClick={() => this.setState({ navigateToAddAdmin: true })}
      />
    );
  }
}

export default HomeButton;
