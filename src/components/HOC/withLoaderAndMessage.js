import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

function withLoaderAndMessage(Component) {
  return class WithLoader extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    render() {
      const { Loading, dataLen } = this.props;
      if (Loading === false && dataLen) {
        return (
          <div>
            <Component {...this.props} />
          </div>
        );
      }
      if (Loading === true && !dataLen) {
        return (
          <div align="center" marginTop="500">
            <CircularProgress />
          </div>
        );
      }
      if (Loading === true && dataLen) {
        return (
          <div align="center" marginTop="500">
            <CircularProgress />
          </div>
        );
      }
      return (
        <h1 align="center">Oops!! No more Trainees</h1>
      );
    }
  };
}

export default withLoaderAndMessage;
