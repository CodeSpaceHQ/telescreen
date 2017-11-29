import React from 'react';
import { Redirect } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';

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
        <Menu icon='labeled' vertical>
          <Menu.Item
            name='home'
            onClick={() => this.setState({ redirect: true })}
          >
            <Icon name='home' />
            Home
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

export default HomeButton;
