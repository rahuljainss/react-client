import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AddDialog from './components/AddDialog/AddDialog';
// import { Navbar } from '../../layouts';

const styles = {
  log: {
    fontSize: '13px',
    marginLeft: '20px',
  },
};
class Trainee extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handle = () => {
    this.setState({ open: false });
  }

  render() {
    const { open } = this.state;
    const { classes } = this.props;
    return (
      <>
        <Button
          variant="outlined"
          onClick={this.handleClickOpen}
          color="primary"
          className={classes.log}
        >
          ADD TRAINEE
        </Button>
        <AddDialog
          open={open}
          onSubmit={this.handle}
          onClose={this.handleClose}
        />
      </>
    );
  }
}
Trainee.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default withStyles(styles)(Trainee);
