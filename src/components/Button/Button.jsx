import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles';

const Button = (props) => {
  const {
    onClick,
    value,
    disabled,
    color,
    style,
    ...data
  } = props;
  const newstyle = (color === 'default' || !styles[color] || disabled) ? {} : styles[color];
  return (
    <>
      <input
        type="button"
        {...data}
        style={
          {
            ...styles.base, ...newstyle, ...style,
          }
        }
        onClick={onClick}
        value={value}
        color={color}
        disabled={disabled}
      />
    </>
  );
};
Button.defaultProps = {
  color: 'default',
  style: {},
  disabled: false,
};
Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  style: PropTypes.objectOf(PropTypes.string),
  color: PropTypes.string,
};
export default Button;
