// ProtectedRoute.js

import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './auth'; // Assuming isAuthenticated function is defined in auth.js
import UserLogin from './user/UserLogin';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <UserLogin/>
        )
      }
    />
  );
};

export default ProtectedRoute;
