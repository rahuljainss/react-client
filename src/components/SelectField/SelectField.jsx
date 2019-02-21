import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const SelectField = (props) => {
  const {
    err,
    onChange,
    value,
    options,
    defaultText,
    ...data
  } = props;
  return (
    <>
      <select {...data} value={value} {...err} style={style.base} onChange={onChange}>
        <option value="">{defaultText}</option>
        {options.map(option => (
          <option value={option.value}>{option.value}</option>
        ))}
      </select>
    </>
  );
};
SelectField.defaultProps = {
  err: '',
  options: [],
  defaultText: 'Select',
};
SelectField.propTypes = {
  err: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.objectOf),
  defaultText: PropTypes.string,
};
export default SelectField;
