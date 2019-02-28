import React from 'react';
import PropTypes from 'prop-types';
import { Footer } from '../components/Footer';

const propTypes = {
  children: PropTypes.element.isRequired,
};
const AuthLayout = ({ children }) => (
  <>
    <div>{children}</div>
    <div><Footer /></div>
  </>
);
AuthLayout.propTypes = propTypes;
export default AuthLayout;
