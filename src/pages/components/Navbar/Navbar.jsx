import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

const styles = {
  base: {
    flexGrow: 1,
    marginBottom: '15px',
  },
  grow: {
    flexGrow: 1,
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
          <Typography variant="overline" color="inherit" className={classes.grow}>
            Trainee Portal
          </Typography>
          <Button color="inherit" className={classes.main}>TRAINEE</Button>
          <Button color="inherit" className={classes.main}>TEXTFIELD DEMO</Button>
          <Button color="inherit" className={classes.main}>INPUT DEMO</Button>
          <Button color="inherit" className={classes.main}>CHILDREN DEMO</Button>
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
