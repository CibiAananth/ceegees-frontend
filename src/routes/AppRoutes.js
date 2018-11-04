import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from '../components/login/Login';
import Registration from '../components/registration/Registration';
import ForgotPassword from '../components/forgotPassword/ForgotPassword';
import ResetPassword from '../components/resetPassword/ResetPassword';

const AppRoutes = () => (
  <Switch>
    <Redirect exact from="/" to="/register" />
    <Route exact path="/login" component={Login} />
    <Route exact path="/register" component={Registration} />
    <Route exact path="/forgotPassword" component={ForgotPassword} />
    <Route exact path="/resetPassword" component={ResetPassword} />
  </Switch>
);

export default AppRoutes;
