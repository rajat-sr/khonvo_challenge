import React, { Component } from 'react';
import { Card, H4, Icon, Intent } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
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
    let { name, emailId, jobTitle, linkedin, github } = this.props.candidate;
    if (liked !== 'PENDING') {
      buttons = undefined;
      likeStatus = (
        <Icon
          icon={IconNames.TICK}
          iconSize={Icon.SIZE_LARGE}
          intent={Intent.SUCCESS}
          style={{ marginLeft: '5px' }}
        />
      );
    }

    if (linkedin && !linkedin.substring(0, 3) !== 'http') {
      linkedin = 'http://' + linkedin;
    }
    if (github && !github.substring(0, 3) !== 'http') {
      github = 'http://' + github;
    }

    return (
      <Card className={classes.card}>
        <H4>
          {name}
          {likeStatus}
        </H4>
        <p>{jobTitle}</p>
        <span>
          <a href={`mailto:${emailId}`}>Email</a>
        </span>
        {linkedin ? (
          <span>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={linkedin}
              style={{ marginLeft: '5px' }}
            >
              LinkedIN
            </a>
          </span>
        ) : null}
        {github ? (
          <a rel="noopener noreferrer" target="_blank" href={github} style={{ marginLeft: '5px' }}>
            GitHub
          </a>
        ) : null}
        {buttons ? (
          <div>
            <span className={classes.icon} onClick={() => this.handleButtonClick(true)}>
              <Icon icon={IconNames.TICK} iconSize={Icon.SIZE_LARGE} intent={Intent.SUCCESS} />
              Like
            </span>
            <span className={classes.icon} onClick={() => this.handleButtonClick(false)}>
              <Icon icon={IconNames.CROSS} iconSize={Icon.SIZE_LARGE} intent={Intent.DANGER} />
              Reject
            </span>
          </div>
        ) : null}
      </Card>
    );
  }
}

export default CandidateCard;
