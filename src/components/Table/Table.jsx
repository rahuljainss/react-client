import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginBottom: theme.spacing.unit * 4,
  },
  table: {
    minWidth: 600,
    textSize: 14,
  },
  base1: {
    fontWeight: 'bold',
  },
  base: {
    fontSize: '14px',
  },
});

function SimpleTable(props) {
  const { classes, column, data } = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead className={classes.base1}>
          <TableRow>
            {
              column.map(header => (
                <TableCell align={header.align}>{header.label}</TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(trainee => (
            <TableRow>
              <TableCell align="center" className={classes.base}>{trainee.name}</TableCell>
              <TableCell className={classes.base}>{trainee.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  column: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(SimpleTable);
