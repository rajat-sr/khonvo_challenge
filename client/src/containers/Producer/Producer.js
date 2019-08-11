import React, { Component } from 'react';
import { Card } from "@blueprintjs/core";
import JobCard from '../../components/JobCard/JobCard';
import classes from './Producer.module.css'

class Producer extends Component {
  render() {
    const { points } = this.props;
    return (
      <div className={classes.producer}>
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

export default Producer;
