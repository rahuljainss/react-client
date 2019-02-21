import React from 'react';
import propTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const { err, onChange, ...data } = props;
  const error = (err) ? style.error : {};
  return (
    <>
      <input type="text" {...data} onChange={onChange} style={{ ...style.base, ...error, color: style.base.color }} />
      {(err) ? <p style={{ ...error }}>{err}</p> : ''}
    </>
  );
};

TextField.defaultProps = {
  err: '',
};

TextField.propTypes = {
  err: propTypes.string,
  onChange: propTypes.func.isRequired,
  value: propTypes.string.isRequired,
};

export default TextField;
