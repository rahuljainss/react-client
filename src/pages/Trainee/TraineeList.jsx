import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import * as moment from 'moment';
// import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AddDialog from './components/AddDialog/AddDialog';
import trainees from './data/trainee';
import { SimpleTable } from '../../components/Table';
// import columns from './data/columns';

const styles = theme => ({
  log: {
    fontSize: '13px',
    marginLeft: theme.spacing.unit * 140,
    marginBottom: '20px',
  },
});
class TraineeList extends React.Component {
  state = {
    open: false,
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handle = () => {
    this.setState({ open: false });
  }

  getDateFormatted = (date) => {
    moment.defaultFormat = 'dddd, MMMM Do YYYY, h:mm:ss a';
    const newDate = moment.utc(date).toDate().toString();
    return (moment(newDate).format(moment.defaultFormat));
  }

  handleSelect = (event, id) => {
    // console.log('??????????????????????????', event.target, id);
    if (!event.target) {
      return;
    }
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$', id);
    const { history } = this.props;
    // console.log('>>>>>>>>>>>>', this.props);
    history.push(`/trainee/${id}`);
  };

  handleSort = (event, property) => {
    if (!event.target) {
      return;
    }
    const newOrderBy = property;
    let direct = 'desc';
    const { order, orderBy } = this.state;
    if (orderBy === property && order === 'desc') {
      direct = 'asc';
    }
    this.setState({ order: direct, orderBy: newOrderBy });
  };

  render() {
    const { open, order, orderBy } = this.state;
    const { classes } = this.props;

    return (
      <>
        <Button
          variant="outlined"
          onClick={this.handleClickOpen}
          color="primary"
          className={classes.log}
        >
          ADD TRAINEE LIST
        </Button>
        <AddDialog
          open={open}
          onSubmit={this.handle}
          onClose={this.handleClose}
        />
        {/* <SimpleTable data={trainees} column={columns} /> */}
        <SimpleTable
          id="id"
          data={trainees}
          column={[
            {
              field: 'name',
              label: 'Name',
              align: 'left',
            },
            {
              field: 'email',
              label: 'Email Address',
              format: value => value && value.toUpperCase(),
            },
            {
              field: 'createdAt',
              label: 'Date',
              align: 'right',
              format: value => value && this.getDateFormatted(value),
            },
          ]}
          orderBy={orderBy}
          order={order}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
        />
      </>
    );
  }
}
TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
  history: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default withStyles(styles)(TraineeList);
