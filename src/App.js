import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Menu, Segment } from 'semantic-ui-react';

import { AppRoutes } from './routes';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

class App extends Component {
  state = { activeItem: 'register' };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    this.props.history.push(`/${name}`);
  };

  render() {
    const { activeItem } = this.state;

    return (
      <div className="App">
        <Segment inverted>
          <Menu inverted secondary>
            <Menu.Item
              name="register"
              active={activeItem === 'register'}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="login"
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            />
          </Menu>
        </Segment>
        <AppRoutes />
      </div>
    );
  }
}

// proptypes validation
App.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(App);
