import React, { Component } from 'react';
import Button from './Button';
import { Text } from '../utils/constants';

export default class Success extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { submitAnotherEmail } = this.props;
    return (
      <div>
        <h2>Thanks for subscribing!</h2>
        <p>Want to subscribe another email?</p>
        <Button
          title={Text.successButtonTitle}
          type='button'
          onClick={() => submitAnotherEmail(false)}
        />
      </div>
    );
  }
}
