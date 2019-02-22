import React from 'react';
import PropTypes from 'prop-types';
import style from './style';

const RadioGroup = (props) => {
  const {
    err,
    onChange,
    value,
    options,
    ...data
  } = props;
  return (
    <>
      {options.map(option => (
        <div key={`label${option.label}`}>
          <input type="radio" name={options} {...data} key={option.label} value={option.value} style={style.base} onChange={onChange} />
          {option.value}
        </div>
      ))}
    </>
  );
};
RadioGroup.defaultProps = {
  err: '',
  options: [],
};
RadioGroup.propTypes = {
  err: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.objectOf),
};
export default RadioGroup;
