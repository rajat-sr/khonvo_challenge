import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import { Dialog, Card } from '@blueprintjs/core';

class JobDialog extends Component {
  state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: true,
    usePortal: true,
    round: true,
    commentInputText: '',
    memberName: 'None',
    memberId: '',
  };

  handleClose = () => {
    this.setState({ isOpen: false });
    this.props.closeDialog();
  };

  render() {
    const { companyName } = this.props;
    return (
      <Dialog onClose={this.handleClose} {...this.state}>
        <div>
          <h1>Amazon</h1>
          <h2>SDE1</h2>
          <p>
            We're looking for a candidate with immense talent and coding skills. We'll pay him
            whatever he wants.
          </p>
        </div>
        <div>
          <h5>CANDIDATES</h5>
          <Card />
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    dialogOpen: state.jobDialogOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeDialog: () => dispatch(actionCreators.closeJobDialog()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobDialog);
