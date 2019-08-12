import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import { Button, Card } from '@blueprintjs/core';
import JobCard from '../../components/JobCard/JobCard';
import JobDialog from '../../components/JobDialog/JobDialog';
import CreateJob from '../../components/CreateJob/CreateJob';
import classes from './Querier.module.css';

class Querier extends Component {
  render() {
    const { showJobDetailsDialog, showCreateJobDialog, openCreateJob } = this.props;
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
            <Card className={classes.card}>
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
          <div>
            <p>PROCESSING QUEUE</p>
            <Card className={classes.card}>
              <JobCard companyName="Amazon" jobTitle="SDE1" candidatesRequired="2" />
              <JobCard companyName="Amazon" jobTitle="SDE1" candidatesRequired="2" />
              <JobCard companyName="Amazon" jobTitle="SDE1" candidatesRequired="2" />
              <JobCard companyName="Amazon" jobTitle="SDE1" candidatesRequired="2" />
            </Card>
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
