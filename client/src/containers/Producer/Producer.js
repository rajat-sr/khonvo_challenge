import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card } from '@blueprintjs/core';
import JobCard from '../../components/JobCard/JobCard';
import classes from './Producer.module.css';
import JobDialog from '../../components/JobDialog/JobDialog';
import CreateCandidate from '../../components/CreateCandidate/CreateCandidate';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { errorToast } from '../../components/Toast/Toast';

class Producer extends Component {
  state = {
    queue: [],
  };

  componentDidMount() {
    const url = BASE_URL + '/job';
    axios
      .get(url)
      .then(res => {
        const queue = [];
        res.data.forEach(job => {
          if (job.status === 'INPROCESS') {
            queue.push(job);
          }
        });
        this.setState({ queue });
      })
      .catch(e => errorToast(e.message));
  }
  render() {
    const { points } = this.props;

    const populatedQueue = this.state.queue.map(job => (
      <JobCard
        companyName={job.companyName}
        jobTitle={job.jobTitle}
        candidatesRequired={job.candidatesRequired}
        key={job._id}
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
  };
};

export default connect(mapStateToProps)(Producer);
