import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import callApi from '../../../../libs/utils/api';
import { SnackBarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

const styles = theme => ({
  base: {
    margin: theme.spacing.unit * 2,
  },
  buttonProgress: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class ResponsiveDialog extends Component {
  state = {
    loading: false,
  };

  handleSubmit = async (event, openSnackbar) => {
    event.preventDefault();
    this.setState({
      // disabled: true,
      loading: true,
    })
    const { data, onSubmit } = this.props;
    const id = data.originalId;
    const Date = '2019-02-14T18:15:11.778Z';
    const token = await callApi('delete', `/trainee/${id}`, { id });
    if (token.data) {
      this.setState({
        loading: false,
        // disabled: false,
      }, () => {
        onSubmit(data);
        if (data.createdAt < Date) {
          openSnackbar('Trainee can not be Deleted', 'error');
        } else {
          openSnackbar(token.data.message, 'success');
        }
      })
    } else {
      this.setState({
        loading: false,
        // disabled: false,
      }, () => { openSnackbar(token, 'error') })
    }
  }

  render() {
    const {
      fullScreen, remopen, onClose, classes,
    } = this.props;
    const { loading } = this.state;

    return (
      <div>
        <SnackBarConsumer>
          {({ openSnackbar }) => (
            <Dialog
              fullScreen={fullScreen}
              open={remopen}
              onClose={this.handleClose}
              aria-labelledby="responsive-dialog-title"
            >
              <DialogTitle id="responsive-dialog-title">Remove Trainee</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Do you really want to remove the trainee ?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose} color="primary">
                  Cancel
                </Button>
                {/* <Button onClick={() => { onSubmit(data); (data.createdAt>=Date)?openSnackbar('Successfully deleted', 'success'):openSnackbar('Cannot delete', 'error') }} color="primary" variant="contained"> */}
                <Button onClick={(event) => this.handleSubmit(event, openSnackbar)}
                  color="primary"
                  variant="contained"
                  disabled={loading}
                >
                  {loading && <CircularProgress size={24} />}
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </SnackBarConsumer>
      </div>
    );
  }
}
const propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  remopen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};
ResponsiveDialog.propTypes = propTypes;
export default withMobileDialog(styles)(ResponsiveDialog);
