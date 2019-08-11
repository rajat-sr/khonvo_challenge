import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from '@blueprintjs/core';
import classes from './CandidateList.module.css';
import QuerierCard from '../CandidateCard/QuerierCard';
import CandidateCard from '../CandidateCard/CandidateCard';

class CandidateList extends Component {
  render() {
    const { userRole } = this.props;
    return (
      <div>
        <div className={classes.list}>
          {userRole === 'QUERIER' ? (
            <>
              <QuerierCard />
              <QuerierCard />
              <QuerierCard />
              <QuerierCard />
              <QuerierCard />
            </>
          ) : (
            <>
              <CandidateCard />
              <CandidateCard />
              <CandidateCard />
              <CandidateCard />
              <CandidateCard />
              <CandidateCard />
            </>
          )}
        </div>
        {userRole === 'QUERIER' ? null : (
          <Button style={{ marginTop: '5px' }}>Add new candidate</Button>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userRole: state.userRole,
  };
};

export default connect(mapStateToProps)(CandidateList);
