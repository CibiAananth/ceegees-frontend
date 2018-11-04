import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import authTypes from '../constants/actionTypes';

export function enableLoader(state) {
  return { ...state, isLoading: true };
}

export function disableLoader(state) {
  return { ...state, isLoading: false };
}

const appReducer = combineReducers({
  authState: authReducer,
  form: formReducer,
});

const rootReducer = (state, action) => {
  if (action.type === authTypes.logout.request) {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
