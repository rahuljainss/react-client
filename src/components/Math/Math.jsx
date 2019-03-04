import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  first: PropTypes.number.isRequired,
  second: PropTypes.number.isRequired,
  operator: PropTypes.string.isRequired,
  children: PropTypes.func,
};
const defaultProps = {
  children: null,
};

class Math extends React.Component {
  getResult = (props) => {
    const { first, second, operator } = props;
    switch (operator) {
    case '+':
      return (first + second);
    case '-':
      return (first - second);
    case '*':
      return (first * second);
    case '/':
      return ((second === 0) ? 'Infinity' : (first / second));
    default:
      return ('Invalid Operation');
    }
  }

  render() {
    const {
      first,
      second,
      operator,
      children,
    } = this.props;
    return children ? children({
      first,
      second,
      operator,
      result: this.getResult(this.props),
    }) : `${first} ${operator} ${second} = ${this.getResult(this.props)}`;
  }
}
Math.propTypes = propTypes;
Math.defaultProps = defaultProps;

export default Math;
