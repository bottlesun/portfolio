import React, { Component } from 'react';

class Try extends Component {
  render() {
    const { tryInfo } = this.props;

    return (
      <li>
        <div>{this.props.v.fruit}</div>
      </li>
    );
  }
}

export default Try;
