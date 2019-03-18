import React from 'react';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import PropTypes from 'prop-types';
import * as moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import AddDialog from './components/AddDialog/AddDialog';
import EditDialog from './components/EditDialog/EditDialog';
import RemoveDialog from './components/RemoveDialog/RemoveDialog';
import { SimpleTable } from '../../components/Table';
import callApi from '../../libs/utils/api';

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
    rowsPerPage: 10,
    page: 0,
    opened: false,
    remopen: false,
    name: '',
    email: '',
    data: '',
    limit: 10,
    skip: 0,
    loading: true,
    traineeData: '',
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
    this.setState({ opened: false });
    this.setState({ remopen: false });
  };

  handle = (data) => {
    this.setState({ open: false });
    this.setState({ opened: false });
    this.setState({ remopen: false });
  }

  getDateFormatted = (date) => {
    moment.defaultFormat = 'dddd, MMMM Do YYYY, h:mm:ss a';
    const newDate = moment.utc(date).toDate().toString();
    return (moment(newDate).format(moment.defaultFormat));
  }

  handleSelect = (event, id) => {
    if (!event.target) {
      return;
    }
    const { history } = this.props;
    history.push(`/trainee/${id}`);
  };

  handleChangePage = (event, page) => {
    if(!event.target) {
      return;
    }
    const updatedSkip = 10 * page;
    const updatedLimit = 10;
    this.setState({
      page,
      skip: updatedSkip,
      limit: updatedLimit,
    })
    callApi('get', `/trainee?limit=${updatedLimit}&skip=${updatedSkip}`).then(
      (lists) => {
        if (lists.status) {
          this.setState({
            traineeData: lists.data.data.records,
            loading: false,
          });
        } else {
          this.setState({
            loading: false
          });
        }
      }
    );
  };

  handleEditDialogOpen = (event, rec) => {
    if (!event.target) {
      return;
    }
    event.stopPropagation();
    const { name, email } = rec;
    this.setState({ opened: true, name, email, data:rec });
  };

  componentDidMount() {
    this.setState({ loading: true });
    const { skip, limit } = this.state;
    callApi('get', `/trainee?limit=${limit}&skip=${skip}`).then(
      (lists) => {
        if (lists.status) {
          this.setState({
            traineeData: lists.data.data.records,
            loading: false,
          });
        } else {
          this.setState({
            loading: false
          });
        }
      }
    );
  }

  handleRemoveDialogOpen =(event, rec) => {
    if (!event.target) {
      return;
    }
    event.stopPropagation();
    this.setState({ remopen: true, data: rec });
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
    const {
      open, opened, remopen, order, orderBy, page, rowsPerPage, name, email, data, loading, traineeData
    } = this.state;
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
        <SimpleTable
          id="id"
          data={traineeData}
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
              align: 'center',
              format: value => value && this.getDateFormatted(value),
            },
          ]}
          actions={[
            {
              icon: <EditIcon />,
              handler: this.handleEditDialogOpen,
            },
            {
              icon: <DeleteIcon />,
              handler: this.handleRemoveDialogOpen,
            },
          ]}
          orderBy={orderBy}
          order={order}
          page={page}
          count={100}
          rowsPerPage={rowsPerPage}
          onChangePage={this.handleChangePage}
          Loading={loading}
          dataLen={traineeData.length}
          onSort={this.handleSort}
          onSelect={this.handleSelect}
        />
        <EditDialog
          opened={opened}
          onSubmit={this.handle}
          onClose={this.handleClose}
          name={name}
          email={email}
          data={data}
        />
        <RemoveDialog
          remopen={remopen}
          onSubmit={this.handle}
          onClose={this.handleClose}
          data={data}
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
