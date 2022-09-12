import React, { Component } from 'react';

export default class Button extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { title, type, disabled, danger, onClick } = this.props;

    return (
      <button
        className={danger && 'unsubscribe'}
        type={type}
        disabled={disabled}
        onClick={onClick}
      >
        {title}
      </button>
    );
  }
}
