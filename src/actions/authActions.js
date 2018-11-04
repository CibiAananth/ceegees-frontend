import authTypes from '../constants/actionTypes';

export const registerUser = payload => ({
  type: authTypes.register.request,
  payload,
});

export const loginUser = payload => ({
  type: authTypes.login.request,
  payload,
});

export const resetPassword = payload => ({
  type: authTypes.resetPassword.request,
  payload,
});

export const forgotPassword = payload => ({
  type: authTypes.forgotPassword.request,
  payload,
});
