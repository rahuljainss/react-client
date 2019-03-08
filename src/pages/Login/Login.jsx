import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { TextField, InputAdornment } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import PersonIcon from '@material-ui/icons/Person';
import CircularProgress from '@material-ui/core/CircularProgress';
import callApi from '../../libs/utils/api';
import { SnackBarConsumer } from '../../contexts/SnackBarProvider/SnackBarProvider';
import * as yup from 'yup';

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

const Schema = yup.object({
  email: yup.string().email().required().label('Email Address'),
  password: yup.string().required('Password is required').label('Password'),
});
class Login extends React.Component {
  state = {
    errors: {},
    touched: {},
    email: '',
    password: '',
    loading: false,
  };

  handleBlur = index => () => {
    const { touched } = this.state;
    touched[index] = true;
    this.setState({
      touched,
    }, () => this.handleValidate());
  }

  handleValidate = () => {
    const {
      email,
      password,
    } = this.state;

    Schema.validate({
      email,
      password,
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

  handleCall = async(email,password,openSnackbar) => {
    this.setState(
      {
        loading: true,
      })
    const token= await callApi('post','/login', email,password);
    console.log(token);
    const{ history }=this.props;
    if(token.data) {
    return(history.push('/trainee'));
    }
    else {
      this.setState({loading: false},() => {openSnackbar(token, 'error');})
    }
  }

  render() {
    const {
      classes,
    } = this.props;

    const {
      email,
      password,
      loading,
    } = this.state;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Log in
          </Typography>
          <TextField
            label="Email-Address"
            style={{ margin: 8 }}
            type="text"
            value={email}
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
            onChange={this.handleChange('email')}
            onBlur={this.handleBlur('email')}
            error={!!this.getError('email')}
            helperText={this.getError('email')}
          />
          <TextField
            label="Password"
            style={{ margin: 8 }}
            type="password"
            value={password}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <VisibilityOffIcon />
                </InputAdornment>
              ),
            }}
            fullWidth
            margin="normal"
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={this.handleChange('password')}
            onBlur={this.handleBlur('password')}
            error={!!this.getError('password')}
            helperText={this.getError('password')}
          />
          <SnackBarConsumer>
          {({ openSnackbar }) => (
          <Button
            className={classes.submit}
            fullWidth
            variant="contained"
            color="primary"
            disabled={this.hasErrors() || !this.isTouched() || loading}
            onClick={() => this.handleCall(email,password,openSnackbar)}
          >
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            Sign in
          </Button>
          )}
          </SnackBarConsumer>
        </Paper>
      </main>
    );
  }
}
Login.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(Login);
