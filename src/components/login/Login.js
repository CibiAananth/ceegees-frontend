import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// redux dependencies
import authActions from '../../actions';

import LoginForm from './LoginForm';
import SharedComponents from '../../styled-components';

import './styles.css';
import appColors from '../../styles/colors';

class Login extends Component {
  handleFormSubmit = (val) => {
    const payload = { ...val, path: '/login' };
    this.props.loginUser(payload);
  };

  render() {
    const {
      login: { isSuccess, message },
      isLoading,
    } = this.props.authState;
    return (
      <div className="login_container">
        <LoginForm isLoading={isLoading} onSubmit={this.handleFormSubmit} />
        <SharedComponents.InvalidMessage
          color={isSuccess ? appColors.success : appColors.invalid}
          align="center"
        >
          {message}
        </SharedComponents.InvalidMessage>
      </div>
    );
  }
}

// register action creator to store
const mapDispatchToProps = {
  loginUser: authActions.loginUser,
};

// subscribe state from store
const mapStateToProps = state => state;

// PropTypes validation
Login.propTypes = {
  authState: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
