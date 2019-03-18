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
import CircularProgress from '@material-ui/core/CircularProgress';
import callApi from '../../../../libs/utils/api';

const styles = theme => ({
  base: {
    margin: theme.spacing.unit * 2,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class EditDialog extends Component {
  state = {
    Name: '',
    Email: '',
    data: '',
    loading: false,
    trainees: '',
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

  handleCall = async (openSnackbar) => {
    this.setState({
    loading: true,
    })
    const { Name, Email } = this.state;
    const { data } = this.props;
    const { originalId } = data;
    const id = originalId;
    const records = { name: Name, email: Email, id };
    const token = await callApi('put', '/trainee', records);

    if (token.status) {
      this.setState({
        loading: false,
      });
      if (token.status === 200) {
        this.handleSubmit({Name,Email});
        openSnackbar(token.data.message, 'success');
      } else {
        this.handleSubmit({});
        openSnackbar(token.message, 'error');
      }
    }
  }

  render() {
    const {
      opened,
      classes,
      onClose,
      name,
      email,
    } = this.props;

    const {
      loading,
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
                onChange={event => this.handleOnChange(event.target.value, email)}
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
                onChange={event => this.handleOnChange(name, event.target.value)}
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
            onClick={() => {this.handleCall(openSnackbar)}}
            color="primary"
            variant="contained"
            disabled={loading}
          >
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
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
  id: PropTypes.number.isRequired,
};
EditDialog.propTypes = propTypes;
export default withStyles(styles)(EditDialog);
