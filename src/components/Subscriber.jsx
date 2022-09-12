import React, { Component } from 'react';
import { Text } from '../utils/constants';
import { formattedName, formattedPhoneNumber } from '../utils/formatter';

export default class Subscriber extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    const { email_address, fields, first_name } = this.props.subscriber;
    const { last_name, phone_number } = fields;

    return (
      <div className='subscriber'>
        <ul>
          <li><p>Name:</p> {formattedName(first_name, last_name) ?? Text.dataNotProvided}</li>
          <li><p>Email Address:</p> {email_address ?? Text.dataNotProvided}</li>
          <li><p>Phone Number:</p> {formattedPhoneNumber(phone_number) ?? Text.dataNotProvided}</li>
        </ul>
      </div>
    );
  }
}
