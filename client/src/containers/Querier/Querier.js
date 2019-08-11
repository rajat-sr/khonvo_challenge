import React, { Component } from 'react';
import { Button, Card } from '@blueprintjs/core';
import JobCard from '../../components/JobCard/JobCard';
import classes from './Querier.module.css';

class Querier extends Component {
  render() {
    return (
      <div className={classes.querier}>
        <Button type="primary" icon="plus" className={classes.button}>
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

export default Querier;
