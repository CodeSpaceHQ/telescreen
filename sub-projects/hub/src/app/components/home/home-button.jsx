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
      <div className='home-button'>
        <Button
          icon='home'
          primary
          fluid
          size='large'
          onClick={() => this.setState({ redirect: true })}
        />
      </div>
    );
  }
}

export default HomeButton;
