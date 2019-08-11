import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from '@blueprintjs/core';
import JobCard from '../../components/JobCard/JobCard';
import classes from './Producer.module.css';
import JobDialog from '../../components/JobDialog/JobDialog';
import CreateCandidate from '../../components/CreateCandidate/CreateCandidate';

class Producer extends Component {
  render() {
    const { points } = this.props;
    return (
      <div className={classes.producer}>
        {this.props.showJobDetailsDialog ? <JobDialog /> : null}
        {this.props.showCreateCandidateDialog ? <CreateCandidate /> : null}
        <div>Points {points}</div>
        <Card className={classes.producerJobs}>
          <JobCard companyName="Amazon" jobTitle="SDE1" candidatesRequired="2" />
          <JobCard companyName="Amazon" jobTitle="SDE1" candidatesRequired="2" />
          <JobCard companyName="Amazon" jobTitle="SDE1" candidatesRequired="2" />
          <JobCard companyName="Amazon" jobTitle="SDE1" candidatesRequired="2" />
          <JobCard companyName="Amazon" jobTitle="SDE1" candidatesRequired="2" />
          <JobCard companyName="Amazon" jobTitle="SDE1" candidatesRequired="2" />
          <JobCard companyName="Amazon" jobTitle="SDE1" candidatesRequired="2" />
          <JobCard companyName="Amazon" jobTitle="SDE1" candidatesRequired="2" />
          <JobCard companyName="Amazon" jobTitle="SDE1" candidatesRequired="2" />
        </Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showJobDetailsDialog: state.jobDialogOpen,
    showCreateCandidateDialog: state.createCandidateDialogOpen,
  };
};

export default connect(mapStateToProps)(Producer);
