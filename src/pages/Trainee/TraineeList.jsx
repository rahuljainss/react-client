import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AddDialog from './components/AddDialog/AddDialog';
import trainees from './data/trainee';
import { SimpleTable } from '../../components/Table';
import columns from './data/columns';

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

  render() {
    const { open } = this.state;
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
        <SimpleTable data={trainees} column={columns} />
        {
          trainees.map(trainee => (
            <div key={trainee.id}>
              <Link to={`/trainee/${trainee.id}`}><li>{trainee.name}</li></Link>
            </div>
          ))
        }
      </>
    );
  }
}
TraineeList.propTypes = {
  classes: PropTypes.objectOf(PropTypes.object).isRequired,
};
export default withStyles(styles)(TraineeList);
