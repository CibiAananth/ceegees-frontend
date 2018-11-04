import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm, Field } from 'redux-form';
import {
  Button, Form, Icon, Input,
} from 'semantic-ui-react';

import { InvalidMessage } from '../../styled-components/SharedComponents';
import appColors from '../../styles/colors';

const ForgotPasswordForm = ({ handleSubmit, isLoading }) => (
  <Form onSubmit={handleSubmit}>
    <Field name="email" component={renderField} type="email" placeholder="email" />
    <Button
      size="large"
      secondary
      content="Submit"
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
ForgotPasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default reduxForm({
  form: 'forgotPassword',
  validate,
})(ForgotPasswordForm);
