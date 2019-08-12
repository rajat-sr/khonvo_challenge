import React, { Component } from 'react';
import { Dialog, Button } from '@blueprintjs/core';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import classes from './CreateJob.module.css';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { errorToast, successToast } from '../Toast/Toast';

class CreateJob extends Component {
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
    location: '',
    compensation: 0,
    candidatesRequired: 1,
  };

  handleClose = () => {
    this.props.closeCreateJobDialog();
  };

  handleInputChange = ({ target }, field) => {
    const newState = {};
    newState[field] = target.value;
    this.setState(newState);
  };

  handleAddButton = () => {
    const { closeCreateJobDialog } = this.props;
    const url = BASE_URL + '/job';
    const {
      companyName,
      companyDescription,
      jobTitle,
      jobDescription,
      location,
      compensation,
      candidatesRequired,
    } = this.state;
    axios
      .post(url, {
        companyName,
        companyDescription,
        jobTitle,
        jobDescription,
        location,
        compensation,
        candidatesRequired,
      })
      .then(res => {
        successToast('New job created');
        closeCreateJobDialog();
      })
      .catch(e => errorToast(e.message));
  };

  render() {
    const { createJobDialogOpen } = this.props;
    const {
      companyName,
      companyDescription,
      jobTitle,
      jobDescription,
      location,
      compensation,
      candidatesRequired,
    } = this.state;

    return (
      <Dialog
        {...this.state}
        isOpen={createJobDialogOpen}
        onClose={() => this.handleClose()}
        className={classes.create}
      >
        <h2>Add a new job</h2>
        <label>Company Name: </label>
        <input
          type="text"
          value={companyName}
          onChange={event => this.handleInputChange(event, 'companyName')}
        />
        <label>Company Description: </label>
        <input
          type="text"
          value={companyDescription}
          onChange={event => this.handleInputChange(event, 'companyDescription')}
        />
        <label>Job Title: </label>
        <input
          type="text"
          value={jobTitle}
          onChange={event => this.handleInputChange(event, 'jobTitle')}
        />
        <label>Job Description: </label>
        <input
          type="text"
          value={jobDescription}
          onChange={event => this.handleInputChange(event, 'jobDescription')}
        />
        <label>Location: </label>
        <input
          type="text"
          value={location}
          onChange={event => this.handleInputChange(event, 'location')}
        />
        <label>Compensation: </label>
        <input
          type="text"
          value={compensation}
          onChange={event => this.handleInputChange(event, 'compensation')}
        />
        <label>Number of Candidates Required: </label>
        <input
          type="text"
          value={candidatesRequired}
          onChange={event => this.handleInputChange(event, 'candidatesRequired')}
        />
        <Button className={classes.addbutton} onClick={() => this.handleAddButton()}>
          Add
        </Button>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    createJobDialogOpen: state.createJobDialogOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeCreateJobDialog: () => dispatch(actionCreators.closeCreateJobDialog()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateJob);
