import React, { Component } from 'react';
import { Dialog, Button, FormGroup, InputGroup, H2, Intent, NumericInput, TextArea } from '@blueprintjs/core';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import classes from './CreateJob.module.css';
import { BASE_URL } from '../../utils';
import axios from 'axios';
import { errorToast, successToast } from '../Toast/Toast';

class CreateJob extends Component {
  state = {
    companyName: '',
    companyDescription: '',
    jobTitle: '',
    jobDescription: '',
    location: '',
    compensation: '',
    candidatesRequired: '',
  };

  handleClose = () => {
    this.props.closeCreateJobDialog();
  };

  handleInputChange = ({ target }, field) => {
    const newState = {};
    newState[field] = target.value;
    this.setState(newState);
  };

  handleNumericInput = (value, field) => {
    const newState = {};
    newState[field] = value;
    this.setState(newState);
  };

  handleAddButton = () => {
    const { closeCreateJobDialog, refreshJobList } = this.props;
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

    if (
      !companyName ||
      !companyDescription ||
      !jobTitle ||
      !jobDescription ||
      !location ||
      !compensation ||
      !candidatesRequired
    ) {
      return errorToast('All fields are required');
    }

    axios
      .post(url, {
        companyName,
        companyDescription,
        jobTitle,
        jobDescription,
        location,
        compensation,
        candidatesRequired,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('khonvotoken')}`,
        },
      })
      .then(res => {
        successToast('New job created');
        closeCreateJobDialog();
        refreshJobList();
      })
      .catch(e => errorToast(e.response ? e.response.data : e.message));
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
        autoFocus
        canEscapeKeyClose
        canOutsideClickClose
        enforceFocus
        usePortal
        round={false}
        isOpen={createJobDialogOpen}
        onClose={() => this.handleClose()}
        className={classes.create}
      >
        <H2>Add a new job</H2>
        <FormGroup label="Company Name" labelFor="name" labelInfo="(required)">
          <InputGroup
            id="name"
            value={companyName}
            onChange={event => this.handleInputChange(event, 'companyName')}
            placeholder="Khonvo"
          />
        </FormGroup>
        <FormGroup
          label="Company Description"
          labelFor="company-description"
          labelInfo="(required)"
          type="multi"
        >
          <TextArea
            id="company-description"
            growVertically={false}
            fill
            value={companyDescription}
            onChange={event => this.handleInputChange(event, 'companyDescription')}
            placeholder="Khonvo help recruiters make more placements..."
          />
        </FormGroup>
        <FormGroup label="Job Position" labelFor="job-title" labelInfo="(required)">
          <InputGroup
            id="job-title"
            value={jobTitle}
            onChange={event => this.handleInputChange(event, 'jobTitle')}
            placeholder="Software Engineer/CEO"
          />
        </FormGroup>
        <FormGroup label="Job Description" labelFor="job-description" labelInfo="(required)">
          <TextArea
            id="job-description"
            growVertically={false}
            fill
            value={jobDescription}
            onChange={event => this.handleInputChange(event, 'jobDescription')}
            placeholder="You'll be responsible for deploying..."
          />
        </FormGroup>
        <FormGroup label="Location" labelFor="location" labelInfo="(required)">
          <InputGroup
            id="location"
            value={location}
            onChange={event => this.handleInputChange(event, 'location')}
            placeholder="Remote"
          />
        </FormGroup>
        <FormGroup label="Compensation" labelFor="compensation" labelInfo="(required)">
          <NumericInput
            allowNumericCharactersOnly
            selectAllOnFocus={false}
            buttonPosition="none"
            leftIcon="dollar"
            fill
            onValueChange={number => this.handleNumericInput(number, 'compensation')}
            placeholder="100000"
            value={compensation}
            id="compensation"
          />
        </FormGroup>
        <FormGroup
          label="Number of Candidates Required"
          labelFor="candidates-required"
          labelInfo="(required)"
        >
          <NumericInput
            allowNumericCharactersOnly
            selectAllOnFocus={false}
            fill
            buttonPosition="none"
            onValueChange={number => this.handleNumericInput(number, 'candidatesRequired')}
            placeholder="1"
            value={candidatesRequired}
            id="candidates-required"
          />
        </FormGroup>
        <Button
          intent={Intent.SUCCESS}
          className={classes.addbutton}
          icon="plus"
          onClick={() => this.handleAddButton()}
        >
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
    refreshJobList: () => dispatch(actionCreators.refreshJobList())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateJob);
