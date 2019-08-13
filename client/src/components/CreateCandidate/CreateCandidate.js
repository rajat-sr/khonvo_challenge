import React, { Component } from 'react';
import { Dialog, Button, FormGroup, InputGroup, H2, Intent } from '@blueprintjs/core';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import classes from './CreateCandidate.module.css';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { errorToast, successToast } from '../Toast/Toast';

class CreateCandidate extends Component {
  state = {
    name: '',
    emailId: '',
    jobTitle: '',
    linkedin: '',
    github: '',
  };

  handleClose = () => {
    this.props.closeCreateCandidateDialog();
  };

  handleInputChange = ({ target }, field) => {
    let newState = {};
    newState[field] = target.value;
    this.setState(newState);
  };

  handleButtonClick = () => {
    const { name, emailId, jobTitle, linkedin, github } = this.state;
    const { jobid, refreshJobList } = this.props;
    if (!name || !emailId || !jobTitle) {
      errorToast('Please fill all the required inputs');
      return;
    }

    const url = BASE_URL + '/candidate';
    axios
      .post(url, {
        name,
        emailId,
        jobTitle,
        linkedin,
        github,
        jobid,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('khonvotoken')}`,
        },
      })
      .then(() => {
        successToast('New Candidate Added');
        refreshJobList();
        this.handleClose();
      })
      .catch(e => {
        errorToast(e.response.data);
      });
  };

  render() {
    const { createCandidateDialogOpen } = this.props;
    const { name, emailId, jobTitle, linkedin, github } = this.state;
    return (
      <Dialog
        autoFocus
        canEscapeKeyClose
        canOutsideClickClose
        enforceFocus
        usePortal
        round={false}
        isOpen={createCandidateDialogOpen}
        onClose={() => this.handleClose()}
        className={classes.create}
      >
        <H2>Add a new candidate</H2>
        <FormGroup label="Name" labelFor="name" labelInfo="(required)">
          <InputGroup
            id="name"
            value={name}
            onChange={event => this.handleInputChange(event, 'name')}
            placeholder="Tony Stark"
          />
        </FormGroup>
        <FormGroup label="Email" labelFor="email" labelInfo="(required)">
          <InputGroup
            id="email"
            value={emailId}
            onChange={event => this.handleInputChange(event, 'emailId')}
            placeholder="tony@starkindustries.com"
          />
        </FormGroup>
        <FormGroup label="Job Title" labelFor="job-title" labelInfo="(required)">
          <InputGroup
            id="job-title"
            value={jobTitle}
            onChange={event => this.handleInputChange(event, 'jobTitle')}
            placeholder="Chief Executive Officer"
          />
        </FormGroup>
        <FormGroup label="LinkedIN profile" labelFor="linkedin">
          <InputGroup
            id="linkedin"
            value={linkedin}
            onChange={event => this.handleInputChange(event, 'linkedin')}
            placeholder="www.linkedin.com/in/tonystark"
          />
        </FormGroup>
        <FormGroup label="GitHub profile" labelFor="github">
          <InputGroup
            id="github"
            value={github}
            onChange={event => this.handleInputChange(event, 'github')}
            placeholder="github.com/tonystark"
          />
        </FormGroup>
        <Button
          intent={Intent.SUCCESS}
          onClick={this.handleButtonClick}
          icon="plus"
          className={classes.addbutton}
        >
          Add
        </Button>
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    createCandidateDialogOpen: state.createCandidateDialogOpen,
    jobid: state.selectedJobID,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    closeCreateCandidateDialog: () => dispatch(actionCreators.closeCreateCandidateDialog()),
    refreshJobList: () => dispatch(actionCreators.refreshJobList()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateCandidate);
