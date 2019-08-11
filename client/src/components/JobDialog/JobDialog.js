import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import { Dialog, Card } from '@blueprintjs/core';
import classes from './JobDialog.module.css';
import CandidateList from '../CandidateList/CandidateList';

class JobDialog extends Component {
  state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    isOpen: true,
    usePortal: true,
    round: false,
  };

  handleClose = () => {
    this.setState({ isOpen: false });
    this.props.closeDialog();
  };

  render() {
    const { companyName } = this.props;
    return (
      <Dialog onClose={this.handleClose} className={classes.twocolumns} {...this.state}>
        <div className={classes.jobDescription}>
          <h5>JOB DESCRIPTION</h5>
          <h1>Amazon</h1>
          <p>Biggest ecommerce store in the world</p>
          <h2>SDE1</h2>
          <p>
            We're looking for a candidate with immense talent and coding skills. We'll pay him
            whatever he wants.
          </p>
          <p>addedBy UOU</p>
          <p>Location: ReMOTE</p>
          <p>compenstation: $50000</p>
          <p>candidates required 2</p>
        </div>
        <div className={classes.candidates}>
          <h5>CANDIDATES</h5>
          <CandidateList />
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
