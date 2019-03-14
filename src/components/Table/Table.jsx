import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';
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
  act: {
    display: 'flex',
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});
class SimpleTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      classes,
      column,
      actions,
      data,
      orderBy,
      order,
      onSort,
      onSelect,
      onChangePage,
      page,
      rowsPerPage,
      count,
    } = this.props;
    return (
      <>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead className={classes.base1}>
              <TableRow>
                {column.map(header => (
                  // <TableCell align={header.align}>{header.label}</TableCell>
                  <TableCell align={header.align}>
                    <TableSortLabel
                      active={orderBy === header.field}
                      direction={order}
                      onClick={event => onSort(event, header.field)}
                    >
                      {header.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody stripedRows>
              {data.map(trainee => (
                <TableRow
                  hover
                  className={classes.row}
                  key={trainee.id}
                  onClick={event => onSelect(event, trainee.id)}
                >
                  {column.map(header => (
                    <TableCell
                      className={classes.base}
                      align={header.align}
                    >
                      {header.format
                        ? header.format(trainee[header.field])
                        : trainee[header.field]}
                    </TableCell>
                  ))}
                  {actions.map(header => (
                    <Button
                      onClick={event => header.handler(event, trainee)}
                      className={classes.act}
                      align={header.align}
                    >
                      {header.icon}
                    </Button>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            pageSize={10}
            component="div"
            count={count}
            rowsPerPageOptions={[]}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={onChangePage}
          />
        </Paper>
      </>
    );
  }
}
SimpleTable.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  column: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
  actions: PropTypes.objectOf(PropTypes.string),
  order: PropTypes.string,
  orderBy: PropTypes.string,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  onSort: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
};
SimpleTable.defaultProps = {
  order: 'asc',
  orderBy: '',
  actions: null,
  page: 0,
  rowsPerPage: 100,
};
export default withStyles(styles)(SimpleTable);
