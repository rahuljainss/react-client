import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Button,
  InputAdornment,
  Grid,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import { SnackBarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

const styles = theme => ({
  base: {
    margin: theme.spacing.unit * 2,
  },
});

class EditDialog extends Component {
  state = {
    Name: '',
    Email: '',
  };


  handleSubmit = () => {
    const { name, email } = this.state;
    const { onSubmit } = this.props;
    onSubmit({ name, email });
  }

  handleOnChange = (newName, newEmail) => {
    this.setState({
      Name: newName,
      Email: newEmail,
    });
  }

  render() {
    const {
      opened,
      classes,
      onClose,
      onSubmit,
      name,
      email,
    } = this.props;

    const {
      Email,
      Name,
    } = this.state;
    return (
      <Dialog
        open={opened}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Edit Trainee</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter your Trainee Details
          </DialogContentText>
          <div className={classes.base}>
            <Grid container spacing={24}>
              <TextField
                label="Name"
                style={{ margin: 8 }}
                type="text"
                defaultValue={name}
                onChange={event => this.handleOnChange(event.target.value, Email)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Email-Address"
                style={{ margin: 8 }}
                type="text"
                onChange={event => this.handleOnChange(Name, event.target.value)}
                defaultValue={email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon />
                    </InputAdornment>
                  ),
                }}
                fullWidth
                margin="normal"
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Cancel
          </Button>
          <SnackBarConsumer>
          {({ openSnackbar }) => (
          <Button
            onClick={() => {onSubmit({ Name, Email }); openSnackbar('Successfully updated', 'success');}}
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
          )}
          </SnackBarConsumer>
        </DialogActions>
      </Dialog>
    );
  }
}
const propTypes = {
  opened: PropTypes.bool.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
};
EditDialog.propTypes = propTypes;
export default withStyles(styles)(EditDialog);
