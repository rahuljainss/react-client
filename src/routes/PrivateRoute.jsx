import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { PrivateLayout } from '../layouts/PrivateLayout';

const propTypes = {
  component: PropTypes.element.isRequired,
};
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={matchProps => (
      <PrivateLayout>
        <Component {...matchProps} />
      </PrivateLayout>
    )}
  />
);
PrivateRoute.propTypes = propTypes;

export default PrivateRoute;
