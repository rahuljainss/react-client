import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  footer: {
    marginBottom: theme.spacing.unit * 8,
    padding: `${theme.spacing.unit * 3}px 0`,
  },
});
function Footer(props) {
  const { classes } = props;
  return (
    <footer className={classes.footer}>
      <Typography variant="inline" align="center" gutterBottom>
        &copy; Successive Technologies
      </Typography>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default withStyles(styles)(Footer);
