import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import { Button, Card } from '@blueprintjs/core';
import JobCard from '../../components/JobCard/JobCard';
import JobDialog from '../../components/JobDialog/JobDialog';
import CreateJob from '../../components/CreateJob/CreateJob';
import classes from './Querier.module.css';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { errorToast } from '../../components/Toast/Toast';

class Querier extends Component {
  state = {
    jobQueue: [],
    processingQueue: [],
  };

  componentDidMount() {
    const url = BASE_URL + '/job';
    axios
      .get(url)
      .then(res => {
        const jobQueue = [];
        const processingQueue = [];
        res.data.forEach(job => {
          if (job.status === 'OPEN') {
            jobQueue.push(job);
          } else if (job.status === 'INPROCESS') {
            processingQueue.push(job);
          }
        });
        this.setState({ jobQueue, processingQueue });
      })
      .catch(e => errorToast(e.message));
  }

  render() {
    const { showJobDetailsDialog, showCreateJobDialog, openCreateJob } = this.props;

    const jobQueueList = this.state.jobQueue.map(job => (
      <JobCard
        companyName={job.companyName}
        jobTitle={job.jobTitle}
        candidatesRequired={job.candidatesRequired}
        key={job._id}
      />
    ));

    const processingQueueList = this.state.processingQueue.map(job => (
      <JobCard
        companyName={job.companyName}
        jobTitle={job.jobTitle}
        candidatesRequired={job.candidatesRequired}
        key={job._id}
      />
    ));

    return (
      <div className={classes.querier}>
        {showJobDetailsDialog ? <JobDialog /> : null}
        {showCreateJobDialog ? <CreateJob /> : null}
        <Button
          type="primary"
          icon="plus"
          className={classes.button}
          onClick={() => openCreateJob()}
        >
          Create new job
        </Button>
        <div className={classes.querierList}>
          <div>
            <p>JOB QUEUE</p>
            <Card className={classes.card}>{jobQueueList}</Card>
          </div>
          <div>
            <p>PROCESSING QUEUE</p>
            <Card className={classes.card}>{processingQueueList}</Card>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    showJobDetailsDialog: state.jobDialogOpen,
    showCreateJobDialog: state.createJobDialogOpen,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCreateJob: () => dispatch(actionCreators.openCreateJobDialog()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Querier);
