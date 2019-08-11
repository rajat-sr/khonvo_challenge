import React, { Component } from 'react';
import { Card, Button } from '@blueprintjs/core';
import classes from './CandidateCard.module.css'

class CandidateCard extends Component {
  render() {
    const { buttons } = this.props;
    return (
      <Card className={classes.card}>
        <p>name</p>
        <p>emailId</p>
        <p>jobTitle</p>
        <p>linkedin</p>
        <p>github</p>
        <p>jobsAppliedTo</p>
        <p>jobsLikedAt</p>
        <p>jobsAcceptedAt</p>
        {buttons ? (
          <>
            <Button type="Success">Like</Button>
            <Button type="Danger">Reject</Button>
          </>
        ) : null}
      </Card>
    );
  }
}

export default CandidateCard;
