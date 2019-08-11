import React, { Component } from 'react';
import { Card } from '@blueprintjs/core';
import classes from './JobCard.module.css';

class JobCard extends Component {
  render() {
    const { companyName, jobTitle, candidatesRequired } = this.props;
    return (
      <Card className={classes.jobcard}>
        <h3>{companyName}</h3>
        <p>{jobTitle}</p>
        <div className={classes.numberAvatar}>{candidatesRequired}</div>
      </Card>
    );
  }
}

export default JobCard;
