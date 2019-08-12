import React, { Component } from 'react';
import { Card, Button } from '@blueprintjs/core';
import classes from './CandidateCard.module.css';
import axios from 'axios';
import { BASE_URL } from '../../utils';
import { errorToast, successToast } from '../Toast/Toast';

class CandidateCard extends Component {
  handleButtonClick = like => {
    const { jobid } = this.props;
    const candidateid = this.props.candidate._id;
    let url;
    if (like) {
      url = `${BASE_URL}/job/${jobid}/like/${candidateid}`;
    } else {
      url = `${BASE_URL}/job/${jobid}/reject/${candidateid}`;
    }

    axios
      .patch(url)
      .then(() => (like ? successToast('Liked') : successToast('Rejected')))
      .catch(e => errorToast(e.message));
  };

  render() {
    let { buttons, liked } = this.props;
    let likeStatus = null;
    const { name, emailId, jobTitle, linkedin, github } = this.props.candidate;
    if (liked !== 'PENDING') {
      buttons = undefined;
      likeStatus = liked;
    }

    return (
      <Card className={classes.card}>
        <p>{name}</p>
        <p>{emailId}</p>
        <p>{jobTitle}</p>
        <p>{linkedin}</p>
        <p>{github}</p>
        {likeStatus}
        {buttons ? (
          <>
            <Button type="Success" onClick={() => this.handleButtonClick(true)}>
              Like
            </Button>
            <Button type="Danger" onClick={() => this.handleButtonClick(false)}>
              Reject
            </Button>
          </>
        ) : null}
      </Card>
    );
  }
}

export default CandidateCard;
