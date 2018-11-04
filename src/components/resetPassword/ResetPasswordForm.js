import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import {
  Button, Form, Icon, Input,
} from 'semantic-ui-react';

import { InvalidMessage } from '../../styled-components/SharedComponents';
import appColors from '../../styles/colors';

const ResetPasswordForm = ({ handleSubmit, isLoading }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      icon={<Icon name="times circle outline" color="red" />}
      name="password"
      component={renderField}
      type="password"
      placeholder="password"
    />
    <Field
      icon={<Icon name="times circle outline" color="red" />}
      name="confirmPassword"
      component={renderField}
      type="password"
      placeholder="confirm password"
    />
    <Button
      size="large"
      secondary
      content="Reset"
      icon="right arrow"
      labelPosition="right"
      loading={isLoading}
    />
  </Form>
);

const validate = (val) => {
  const errors = {};
  if (!val.password) {
    errors.password = { active: true, message: 'password is required' };
  } else if (val.password !== undefined && val.password !== null) {
    if (
      val.password.trim() === ''
      || val.password.trim() === ' '
      || val.password.trim().length !== val.password.length
    ) {
      errors.password = {
        active: true,
        message: 'password must not contain whitespace',
      };
    }
  }
  if (!val.confirmPassword) {
    errors.confirmPassword = { active: true, message: 'confirm password is required' };
  } else if (val.confirmPassword !== undefined && val.confirmPassword !== null) {
    if (val.confirmPassword.trim() !== val.password.trim()) {
      errors.confirmPassword = {
        active: true,
        message: 'passwords doesnot match',
      };
    }
  }
  return errors;
};

const renderField = ({
  input, placeholder, type, meta: { touched, error },
}) => {
  let iconName = '';
  let iconColor = 'teal';
  if (touched && error) {
    iconName = error.active ? 'times circle outline' : 'check circle outline';
    iconColor = error.active ? 'red' : 'teal';
  } else if (touched && !error) {
    iconName = 'check circle outline';
    iconColor = 'teal';
  }

  return (
    <div>
      <Input
        width={8}
        {...input}
        icon={<Icon name={iconName} color={iconColor} />}
        fluid
        transparent
        type={type}
        placeholder={placeholder}
      />
      {touched
        && (error && (
          <span>
            <InvalidMessage color={appColors.form_error} size="12px">
              {error.active ? error.message : ''}
            </InvalidMessage>
          </span>
        ))}
    </div>
  );
};

// propTypes validation
ResetPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'resetPassword',
  validate,
})(ResetPasswordForm);
