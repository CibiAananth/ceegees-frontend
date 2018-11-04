import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import userActions from '../../actions';

import ResetPasswordForm from './ResetPasswordForm';
import SharedComponents from '../../styled-components';

import './styles.css';
import appColors from '../../styles/colors';

class ResetPassword extends Component {
  token = '';

  componentDidMount() {
    const { search: queryString } = this.props.location;
    // eslint-disable-next-line
    this.token = queryString.split('=')[1];
  }

  handleSubmit = (val) => {
    this.props.resetPassword({
      path: '/password/reset',
      token: this.token,
      password: val.password,
    });
  };

  render() {
    const {
      resetPassword: { isSuccess, message },
      isLoading,
    } = this.props.authState;
    return (
      <div className="reset_container">
        <ResetPasswordForm onSubmit={this.handleSubmit} isLoading={isLoading} />
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
  resetPassword: userActions.resetPassword,
};

// subscribe state from store
const mapStateToProps = state => state;

// PropTypes validation
ResetPassword.propTypes = {
  authState: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResetPassword);
