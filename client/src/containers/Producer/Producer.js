import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from '@blueprintjs/core';
import JobCard from '../../components/JobCard/JobCard';
import classes from './Producer.module.css';
import JobDialog from '../../components/JobDialog/JobDialog';
import CreateCandidate from '../../components/CreateCandidate/CreateCandidate';

class Producer extends Component {
  render() {
    const { points, queue } = this.props;

    const populatedQueue = queue.map(job => (
      <JobCard
        companyName={job.companyName}
        jobTitle={job.jobTitle}
        candidatesRequired={job.candidatesRequired}
        key={job._id}
        jobid={job._id}
      />
    ));

    return (
      <div className={classes.producer}>
        {this.props.showJobDetailsDialog ? <JobDialog /> : null}
        {this.props.showCreateCandidateDialog ? <CreateCandidate /> : null}
        <div>Points {points}</div>
        <Card className={classes.producerJobs}>{populatedQueue}</Card>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showJobDetailsDialog: state.jobDialogOpen,
    showCreateCandidateDialog: state.createCandidateDialogOpen,
    queue: state.processingQueue
  };
};

export default connect(mapStateToProps)(Producer);
