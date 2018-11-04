// dependencies
import { enableLoader, disableLoader } from './rootReducer';
import authTypes from '../constants/actionTypes';

// default reducer value
const defaultValue = {
  isLoading: false,
  registration: { isSuccess: false, message: '' },
  login: { isSuccess: false, message: '' },
  forgotPassword: { isSuccess: false, message: '' },
  resetPassword: { isSuccess: false, message: '' },
};

// reducer function
export default (state = defaultValue, action) => {
  switch (action.type) {
    case authTypes.register.request:
      return enableLoader(state, 'isSearchLoading');
    case authTypes.register.success:
      return registrationResult(state, action);
    case authTypes.register.failure:
      return registrationResult(state, action);
    case authTypes.login.request:
      return enableLoader(state, 'isSearchLoading');
    case authTypes.login.success:
      return loginResult(state, action);
    case authTypes.login.failure:
      return loginResult(state, action);
    case authTypes.forgotPassword.request:
      return enableLoader(state, 'isSearchLoading');
    case authTypes.forgotPassword.success:
      return forgotPasswordResult(state, action);
    case authTypes.forgotPassword.failure:
      return forgotPasswordResult(state, action);
    case authTypes.resetPassword.request:
      return enableLoader(state, 'isSearchLoading');
    case authTypes.resetPassword.success:
      return resetPasswordResult(state, action);
    case authTypes.resetPassword.failure:
      return resetPasswordResult(state, action);
    default:
      return state;
  }
};

const registrationResult = (state, action) => {
  const newState = disableLoader(state);
  if (action.payload.response) {
    return {
      ...newState,
      registration: { isSuccess: true, message: 'User registeration success' },
    };
  }
  if (action.payload.error) {
    return { ...newState, registration: { isSuccess: false, message: 'User already exists' } };
  }
  return newState;
};

const loginResult = (state, action) => {
  const newState = disableLoader(state);
  if (action.payload.response) {
    return { ...newState, login: { isSuccess: true, message: 'User login success' } };
  }
  if (action.payload.error) {
    return { ...newState, login: { isSuccess: false, message: 'Email or password is incorrect' } };
  }
  return newState;
};

const forgotPasswordResult = (state, action) => {
  const newState = disableLoader(state);
  if (action.payload.response) {
    return {
      ...newState,
      forgotPassword: {
        isSuccess: true,
        message: 'email sent successfully',
        link: action.payload.response.payload.link,
      },
    };
  }
  if (action.payload.error) {
    return {
      ...newState,
      forgotPassword: {
        isSuccess: false,
        message: 'internal server error',
        link: '',
      },
    };
  }
  return newState;
};

const resetPasswordResult = (state, action) => {
  const newState = disableLoader(state);
  if (action.payload.response) {
    return {
      ...newState,
      resetPassword: { isSuccess: true, message: 'password successfully reset' },
    };
  }
  if (action.payload.error) {
    return { ...newState, resetPassword: { isSuccess: false, message: 'password reset failed' } };
  }
  return newState;
};
