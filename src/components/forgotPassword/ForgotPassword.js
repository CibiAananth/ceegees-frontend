import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import userActions from '../../actions';

import ForgotPasswordForm from './ForgotPasswordForm';
import SharedComponents from '../../styled-components';

import './styles.css';
import appColors from '../../styles/colors';

class ForgotPassword extends Component {
  handleSubmit = (val) => {
    this.props.forgotPassword({
      path: '/password/forgot',
      email: val.email,
    });
  };

  render() {
    const {
      forgotPassword: { isSuccess, message, link },
      isLoading,
    } = this.props.authState;
    return (
      <div className="forgot_container">
        <ForgotPasswordForm onSubmit={this.handleSubmit} isLoading={isLoading} />
        {isSuccess ? (
          <div>
            <SharedComponents.InvalidMessage
              color={isSuccess ? appColors.success : appColors.invalid}
              align="center"
            >
              {`${message}`}
            </SharedComponents.InvalidMessage>
            <a href={`${link}`}>Click here to Reset </a>
          </div>
        ) : null}
      </div>
    );
  }
}

// register action creator to store
const mapDispatchToProps = {
  forgotPassword: userActions.forgotPassword,
};

// subscribe state from store
const mapStateToProps = state => state;

// PropTypes validation
ForgotPassword.propTypes = {
  authState: PropTypes.object.isRequired,
  forgotPassword: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ForgotPassword);
