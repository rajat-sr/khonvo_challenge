import React, { Component } from 'react';
import Querier from './Querier/Querier';
import Producer from './Producer/Producer';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionDispatchers';

class View extends Component {
  componentDidMount() {
    this.props.refreshJobList();
  }
  render() {
    const { userRole } = this.props;
    return <div>{userRole === 'QUERIER' ? <Querier /> : <Producer />}</div>;
  }
}

const mapStateToProps = state => {
  return {
    userRole: state.userRole,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    refreshJobList: () => dispatch(actionCreators.refreshJobList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
