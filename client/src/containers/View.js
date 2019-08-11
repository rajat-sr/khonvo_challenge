import React, { Component } from 'react';
import Querier from './Querier/Querier';
import Producer from './Producer/Producer';
import { connect } from 'react-redux';

class View extends Component {
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

export default connect(mapStateToProps)(View);
