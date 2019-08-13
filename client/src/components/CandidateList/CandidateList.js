import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import { Button } from '@blueprintjs/core';
import classes from './CandidateList.module.css';
import QuerierCard from '../CandidateCard/QuerierCard';
import CandidateCard from '../CandidateCard/CandidateCard';

class CandidateList extends Component {
  handleAddCandidate() {
    const jobid = this.props.jobid;
    this.props.closeJobDialog();
    this.props.openCreateCandidate(jobid);
  }

  render() {
    const { userRole, candidates, jobid } = this.props;
    const candidateList = candidates.map(candidate => {
      if (candidate.status !== 'REJECTED') {
        if (userRole === 'QUERIER') {
          return (
            <QuerierCard
              liked={candidate.status}
              candidate={candidate.candidate}
              key={candidate._id}
              jobid={jobid}
            />
          );
        } else {
          return (
            <CandidateCard
              liked={candidate.status}
              candidate={candidate.candidate}
              key={candidate._id}
              jobid={jobid}
            />
          );
        }
      }
      return null;
    });
    return (
      <div>
        <div className={classes.list}>{candidateList}</div>
        {userRole === 'QUERIER' ? null : (
          <Button style={{ marginTop: '5px' }} onClick={() => this.handleAddCandidate()}>
            Add new candidate
          </Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userRole: state.userRole,
    jobid: state.selectedJobID,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openCreateCandidate: jobid => dispatch(actionCreators.openCreateCandidateDialog(jobid)),
    closeJobDialog: () => dispatch(actionCreators.closeJobDialog()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CandidateList);
