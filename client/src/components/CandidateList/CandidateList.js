import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';
import { Button } from '@blueprintjs/core';
import classes from './CandidateList.module.css';
import QuerierCard from '../CandidateCard/QuerierCard';
import CandidateCard from '../CandidateCard/CandidateCard';

class CandidateList extends Component {
  handleAddCandidate() {
    this.props.closeJobDialog();
    this.props.openCreateCandidate();
  }

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
          <Button style={{ marginTop: '5px' }} onClick={() => this.handleAddCandidate()}>
            Add new candidate
          </Button>
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

const mapDispatchToProps = dispatch => {
  return {
    openCreateCandidate: () => dispatch(actionCreators.openCreateCandidateDialog()),
    closeJobDialog: () => dispatch(actionCreators.closeJobDialog()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CandidateList);
