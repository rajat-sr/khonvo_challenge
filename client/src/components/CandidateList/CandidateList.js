import React, { Component } from 'react';
import { Card } from '@blueprintjs/core';
import classes from './CandidateList.module.css';

class CandidateList extends Component {
  render() {
    return <Card className={classes.list} />;
  }
}

export default CandidateList;
