import React, { Component } from 'react';

class Producer extends Component {
  render() {
    return (
      <div>
        Points{' '}
        <div style={{ backgroundColor: "green", verticalAlign: 'middle' }} size="large">
          0
        </div>
      </div>
    );
  }
}

export default Producer;
