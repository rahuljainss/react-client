import React from 'react';
import Button from '@material-ui/core/Button';
import AddDialog from './components/AddDialog/AddDialog';

export default class Trainee extends React.Component {
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
    return (
      <>
        <Button
          variant="outlined"
          onClick={this.handleClickOpen}
          color="primary"
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
