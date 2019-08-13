import React, { Component } from 'react';
import { H3 } from "@blueprintjs/core";
import classes from './TitleBar.module.css'

class TitleBar extends Component {
  render() {
    return (
      <div className={classes.bar}>
        <H3 className={classes.title}>Khonvo</H3>
      </div>
    );
  }
}

export default TitleBar;
