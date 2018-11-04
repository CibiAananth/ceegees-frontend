import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// redux dependencies
import authActions from '../../actions';

import RegistrationForm from './RegistrationForm';
import SharedComponents from '../../styled-components';

import './styles.css';
import appColors from '../../styles/colors';

class Registration extends Component {
  handleFormSubmit = (val) => {
    const payload = { ...val };
    delete payload.confirmPassword;
    payload.path = '/register';
    this.props.registerUser(payload);
  };

  render() {
    const {
      registration: { isSuccess, message },
      isLoading,
    } = this.props.authState;
    return (
      <div className="registration_container">
        <RegistrationForm isLoading={isLoading} onSubmit={this.handleFormSubmit} />
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
  registerUser: authActions.registerUser,
};

// subscribe state from store
const mapStateToProps = state => state;

// PropTypes validation
Registration.propTypes = {
  authState: PropTypes.object.isRequired,
  registerUser: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Registration);
