import React, { Component } from 'react';
import { H3 } from '@blueprintjs/core';
import classes from './TitleBar.module.css';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/actionDispatchers';

class TitleBar extends Component {
  handleLogout() {
    this.props.logout();
  }

  render() {
    return (
      <div className={classes.bar}>
        <H3 className={classes.title}>Khonvo</H3>
        <div className={classes.button} onClick={() => this.handleLogout()}>
          Logout
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actionCreators.logout()),
  };
};

export default connect(
  null,
  mapDispatchToProps,
)(TitleBar);
