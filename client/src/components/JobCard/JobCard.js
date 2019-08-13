import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import { Card, H3 } from '@blueprintjs/core';
import classes from './JobCard.module.css';

class JobCard extends Component {
  render() {
    const {
      jobid,
      companyName,
      jobTitle,
      candidatesRequired,
      openDialog,
      candidatesProposed,
    } = this.props;
    return (
      <Card className={classes.jobcard} onClick={() => openDialog(jobid)}>
        <div>
          <H3 className={classes.company}>{companyName}</H3>
          <p className={classes.jobtitle}>{jobTitle}</p>
        </div>
        <div className={classes.numberAvatar}>
          {candidatesProposed ? candidatesProposed.length : 0}/{candidatesRequired}
        </div>
      </Card>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    openDialog: jobid => dispatch(actionCreators.openJobDialog(jobid)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(JobCard);
