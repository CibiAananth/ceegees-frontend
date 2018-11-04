import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import {
  Button, Form, Icon, Input,
} from 'semantic-ui-react';

import { InvalidMessage } from '../../styled-components/SharedComponents';
import appColors from '../../styles/colors';

const LoginForm = ({ handleSubmit, isLoading }) => (
  <Form onSubmit={handleSubmit}>
    <Field
      icon={<Icon name="check circle outline" color="teal" />}
      name="email"
      component={renderField}
      type="text"
      placeholder="email"
    />
    <Field
      icon={<Icon name="times circle outline" color="red" />}
      name="password"
      component={renderField}
      type="password"
      placeholder="password"
    />
    <Button
      style={{ marginTop: '3rem' }}
      size="large"
      secondary
      content="Get Started"
      icon="right arrow"
      labelPosition="right"
      loading={isLoading}
    />
  </Form>
);

const validate = (val) => {
  const errors = {};
  if (!val.email) {
    errors.email = { active: true, message: 'email is required' };
  } else if (!/^.+@.+$/i.test(val.email)) {
    errors.email = { active: true, message: 'invalid email address' };
  }
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
LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'login',
  validate,
})(LoginForm);
