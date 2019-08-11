import React, { Component } from 'react';
import { Dialog, Button } from '@blueprintjs/core';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import classes from './CreateCandidate.module.css';

class CreateCandidate extends Component {
  state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    usePortal: true,
    round: false,
  };

  handleClose = () => {
    this.props.closeCreateCandidateDialog();
  };

  render() {
    const { createCandidateDialogOpen } = this.props;
    return (
      <Dialog
        {...this.state}
        isOpen={createCandidateDialogOpen}
        onClose={() => this.handleClose()}
        className={classes.create}
      >
        <h2>Add a new candidate</h2>
        <label>Name: </label>
        <input type="text" />
        <label>Email: </label>
        <input type="text" />
        <label>Job Title: </label>
        <input type="text" />
        <label>LinkedIN: </label>
        <input type="text" />
        <label>GitHub: </label>
        <input type="text" />
        <Button>Add</Button>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    createCandidateDialogOpen: state.createCandidateDialogOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeCreateCandidateDialog: () => dispatch(actionCreators.closeCreateCandidateDialog()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateCandidate);
