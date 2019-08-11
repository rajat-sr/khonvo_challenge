import React, { Component } from 'react';
import { Dialog, Card } from '@blueprintjs/core';

class JobDialog extends Component {
  render() {
    const { companyName } = this.props;
    return (
      <Dialog onClose={this.handleClose} title="Job Details">
        <div>
          <h1>Amazon</h1>
          <h2>SDE1</h2>
          <p>
            We're looking for a candidate with immense talent and coding skills. We'll pay him
            whatever he wants.
          </p>
        </div>
        <div>
          <h5>CANDIDATES</h5>
          <Card>

          </Card>
        </div>
      </Dialog>
    );
  }
}

export default JobDialog;
