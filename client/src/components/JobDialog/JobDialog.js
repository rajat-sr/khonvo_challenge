import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import { Dialog, Divider, H5 } from '@blueprintjs/core';
import classes from './JobDialog.module.css';
import CandidateList from '../CandidateList/CandidateList';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { errorToast } from '../Toast/Toast';

class JobDialog extends Component {
  state = {
    autoFocus: true,
    canEscapeKeyClose: true,
    canOutsideClickClose: true,
    enforceFocus: true,
    usePortal: true,
    round: false,
    companyName: '',
    companyDescription: '',
    jobTitle: '',
    jobDescription: '',
    addedBy: '',
    location: '',
    compensation: '',
    candidatesRequired: '',
    status: '',
    candidatesProposed: [],
  };

  handleClose = () => {
    this.props.closeDialog();
  };

  componentDidMount() {
    const { jobid } = this.props;
    if (!jobid) {
      return;
    }

    const url = BASE_URL + '/job/' + jobid;
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('khonvotoken')}`,
        },
      })
      .then(res => {
        this.setState({
          companyName: res.data.companyName,
          companyDescription: res.data.companyDescription,
          jobTitle: res.data.jobTitle,
          jobDescription: res.data.jobDescription,
          addedBy: res.data.addedBy.name,
          location: res.data.location,
          compensation: res.data.compensation,
          candidatesRequired: res.data.candidatesRequired,
          status: res.data.status,
          candidatesProposed: res.data.candidatesProposed,
        });
      })
      .catch(e => errorToast(e.response.data));
  }

  render() {
    const { dialogOpen, jobid } = this.props;
    const {
      companyName,
      companyDescription,
      jobTitle,
      jobDescription,
      addedBy,
      location,
      compensation,
      candidatesRequired,
      status,
      candidatesProposed,
    } = this.state;
    return (
      <Dialog
        {...this.state}
        onClose={this.handleClose}
        isOpen={dialogOpen}
        className={classes.twocolumns}
      >
        <div className={classes.jobDescription}>
          <H5 style={{ color: '#777' }}>JOB DESCRIPTION</H5>
          <h1>{companyName}</h1>
          <p>{companyDescription}</p>
          <h2>{jobTitle}</h2>
          <p>{jobDescription}</p>
          <p>{addedBy}</p>
          <p>Location: {location}</p>
          <p>${compensation}</p>
          <p>{candidatesRequired} candidate(s) are required</p>
          <p>Job is {status.toLowerCase()}</p>
        </div>
        <Divider />
        <div className={classes.candidates}>
          <H5 style={{ color: '#777' }}>CANDIDATES</H5>
          <CandidateList candidates={candidatesProposed} jobid={jobid} />
        </div>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    dialogOpen: state.jobDialogOpen,
    jobid: state.selectedJobID,
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
