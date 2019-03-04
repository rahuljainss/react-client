import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from '../components/Navbar';

const propTypes = {
  children: PropTypes.element.isRequired,
};
const PrivateLayout = ({ children }) => (
  <>
    <div>
      <Navbar />
    </div>
    <div style={{ margin: '10px' }}>{children}</div>
  </>
);
PrivateLayout.propTypes = propTypes;
export default PrivateLayout;
