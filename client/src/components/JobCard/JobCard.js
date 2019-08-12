import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import { Card } from '@blueprintjs/core';
import classes from './JobCard.module.css';

class JobCard extends Component {
  render() {
    const { jobid, companyName, jobTitle, candidatesRequired, openDialog } = this.props;
    return (
      <Card className={classes.jobcard} onClick={() => openDialog(jobid)}>
        <h3>{companyName}</h3>
        <p>{jobTitle}</p>
        <div className={classes.numberAvatar}>{candidatesRequired}</div>
      </Card>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    openDialog: (jobid) => dispatch(actionCreators.openJobDialog(jobid)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobCard);
