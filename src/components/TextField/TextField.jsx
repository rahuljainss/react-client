import React from 'react';
import propTypes from 'prop-types';
import style from './style';

const TextField = (props) => {
  const { err, ...data } = props;
  const error = (err) ? style.error : {};
  return (
    <>
      <input type="text" {...data} style={{ ...style.base, ...error, color: style.base.color }} />
      {(err) ? <p style={{ ...error }}>{err}</p> : ''}
    </>
  );
};

TextField.defaultProps = {
  err: '',
};

TextField.propTypes = {
  err: propTypes.string,
};

export default TextField;
