import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  header: {
    marginBottom: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 3}px 0`,
  },
  base: {
    fontWeight: 'bold',
    variant: 'headline',
    fontSize: '40px',
  },
  base1: {
    fontSize: '20px',
    padding: '10px',
    color: 'grey',
  },
});
function NoMatch(props) {
  const { classes } = props;
  return (
    <header className={classes.header}>
      <Typography className={classes.base} align="center">
        Not Found
      </Typography>
      <Typography className={classes.base1} align="center">
        Seems like the page you are looking after does not exists
      </Typography>
    </header>
  );
}

NoMatch.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(NoMatch);
