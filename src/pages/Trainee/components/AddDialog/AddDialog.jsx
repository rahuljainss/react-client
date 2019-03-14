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
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import * as yup from 'yup';
import { SnackBarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

const styles = theme => ({
  base: {
    margin: theme.spacing.unit * 2,
  },
});

const Schema = yup.object({
  name: yup.string().required().label('Name'),
  email: yup.string().email().required().label('Email Address'),
  password: yup.string()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'Must contains 8 characters, at least one uppercase letter, one lowercase letter and one number')
    .required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Must match password')
    .required('Confirm Password is required'),
});

const propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

class AddDialog extends Component {
  state = {
    errors: {},
    touched: {},
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  handleSubmit = () => {
    const {
      name,
      email,
      password,
    } = this.state;

    const { onSubmit } = this.props;
    onSubmit({
      name,
      email,
      password,
    });
  }

  handleBlur = index => () => {
    const { touched } = this.state;
    touched[index] = true;
    this.setState({
      touched,
    }, () => this.handleValidate());
  }

  handleValidate = () => {
    const {
      name,
      email,
      password,
      confirmPassword,
    } = this.state;

    Schema.validate({
      name,
      email,
      password,
      confirmPassword,
    }, { abortEarly: false })
      .then(() => {
        this.handleErrors(null);
      })
      .catch((errors) => {
        this.handleErrors(errors);
      });
  }

  handleErrors = (errors) => {
    const parsedErrors = {};
    if (errors) {
      errors.inner.forEach((error) => {
        parsedErrors[error.path] = error.message;
      });
    }

    this.setState({
      errors: parsedErrors,
    });
  }

  handleChange = field => (e) => {
    this.setState({
      [field]: e.target.value,
    }, this.handleValidate);
  }

  getError = (field) => {
    const { errors, touched } = this.state;

    if (!touched[field]) {
      return null;
    }

    return errors[field] || '';
  }

  hasErrors = () => {
    const { errors } = this.state;
    return Object.keys(errors).length !== 0;
  }

  isTouched = () => {
    const { touched } = this.state;
    return Object.keys(touched).length !== 0;
  }

  render() {
    const {
      open,
      onClose,
      classes,
    } = this.props;

    const {
      email,
      name,
      password,
      confirmPassword,
    } = this.state;

    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
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
                value={name}
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
                onChange={this.handleChange('name')}
                onBlur={this.handleBlur('name')}
                error={!!this.getError('name')}
                helperText={this.getError('name')}
              />
              <TextField
                label="Email-Address"
                style={{ margin: 8 }}
                type="text"
                value={email}
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
                onChange={this.handleChange('email')}
                onBlur={this.handleBlur('email')}
                error={!!this.getError('email')}
                helperText={this.getError('email')}
              />
              <Grid item xs={6}>
                {
                  <TextField
                    label="Password"
                    field="password"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <VisibilityOffIcon />
                        </InputAdornment>
                      ),
                    }}
                    type="password"
                    value={password}
                    variant="outlined"
                    onChange={this.handleChange('password')}
                    onBlur={this.handleBlur('password')}
                    error={!!this.getError('password')}
                    helperText={this.getError('password')}
                  />
                }
              </Grid>
              <Grid item xs={6}>
                <TextField
                  label="Confirm Password"
                  field="confirmPassword"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VisibilityOffIcon />
                      </InputAdornment>
                    ),
                  }}
                  type="password"
                  value={confirmPassword}
                  variant="outlined"
                  onChange={this.handleChange('confirmPassword')}
                  onBlur={this.handleBlur('confirmPassword')}
                  error={!!this.getError('confirmPassword')}
                  helperText={this.getError('confirmPassword')}
                />
              </Grid>
            </Grid>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <SnackBarConsumer>
          {({ openSnackbar }) => (
          <Button
            // onClick={this.handleSubmit}
            onClick={() => { this.handleSubmit(); openSnackbar('Successfully added trainee', 'success'); }}
            color="primary"
            variant="contained"
            disabled={this.hasErrors() || !this.isTouched()}
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

AddDialog.propTypes = propTypes;

export default withStyles(styles)(AddDialog);
