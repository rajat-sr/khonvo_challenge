import React, { Component } from 'react';
import CandidateCard from './CandidateCard';

class QuerierCard extends Component {
  render() {
    return <CandidateCard buttons {...this.props} />;
  }
}

export default QuerierCard;
