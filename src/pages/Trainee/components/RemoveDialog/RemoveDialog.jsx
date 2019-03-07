import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { SnackBarConsumer } from '../../../../contexts/SnackBarProvider/SnackBarProvider';

class ResponsiveDialog extends React.Component {
  state={};

  render() {
    const {
      fullScreen, remopen, onClose, onSubmit, data,
    } = this.props;
    const Date='2019-02-14T18:15:11.778Z';

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
                <Button onClick={() => { onSubmit(data); (data.createdAt>=Date)?openSnackbar('Successfully deleted', 'success'):openSnackbar('Cannot delete', 'error') }} color="primary" variant="contained">
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

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired,
  remopen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  data: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withMobileDialog()(ResponsiveDialog);
