import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DEFAULT_BANNER_IMAGE } from '../../configs/constants';
import { getRandomNumber, getNextRoundRobin } from '../../libs/utils/math';

const propTypes = {
  altText: PropTypes.string,
  banners: PropTypes.arr,
  defaultBanner: PropTypes.string,
  duration: PropTypes.number,
  height: PropTypes.number,
  random: PropTypes.bool,
};

const defaultProps = {
  altText: 'Default Banner',
  banners: '',
  defaultBanner: DEFAULT_BANNER_IMAGE,
  duration: 2000,
  height: 200,
  random: false,
};

class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pos: 0,
    };
    this.onChange = () => {};
  }

  componentDidMount() {
    const { random, duration } = this.props;
    this.interval = setInterval(() => {
      const { pos } = this.state;
      if (random) {
        this.setState({
          pos: getRandomNumber(6),
        });
        return;
      }
      const val = getNextRoundRobin(pos, 6);
      this.setState({
        pos: val,
      });
    }, duration);
  }

  componentWillUnmount = () => {
    clearInterval(this.interval);
  }

  render() {
    const {
      altText,
      banners,
      random,
      defaultBanner,
      height,
      ...data
    } = this.props;
    const { pos } = this.state;
    console.log(this.state);
    const source = (banners) ? banners[pos] : defaultBanner;
    return (
      <>
        <div style={{ textAlign: 'center' }}>
          <img src={source} {...data} alt={altText} height={height} />
        </div>
      </>
    );
  }
}
Slider.propTypes = propTypes;
Slider.defaultProps = defaultProps;
export default Slider;
