import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';

const styles = {
  base: {
    flexGrow: 1,
    marginBottom: '15px',
  },
  grow: {
    flexGrow: 1,
    fontSize: '20px',
  },
  main: {
    fontSize: '13px',
  },
  log: {
    fontSize: '13px',
    marginLeft: '20px',
  },
};

function ButtonAppBar(props) {
  const { classes } = props;
  return (
    <div className={classes.base}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="inline" color="inherit" className={classes.grow}>
            Trainee Portal
          </Typography>
          <Link component={RouterLink} to="/" color="inherit" underline="none">
            <Button color="inherit" className={classes.main}>TRAINEE</Button>
          </Link>
          <Link component={RouterLink} to="/textfield-demo" color="inherit" underline="none">
            <Button color="inherit" className={classes.main}>TEXTFIELD DEMO</Button>
          </Link>
          <Link component={RouterLink} to="/input-demo" color="inherit" underline="none">
            <Button color="inherit" className={classes.main}>INPUT DEMO</Button>
          </Link>
          <Link component={RouterLink} to="/children-demo" color="inherit" underline="none">
            <Button color="inherit" className={classes.main}>CHILDREN DEMO</Button>
          </Link>
          <Button color="inherit" className={classes.log}>LOGOUT</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(ButtonAppBar);
