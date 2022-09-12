import React, { Component } from 'react';

export default class Input extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { label, name, value, type, placeholder, onChange, onBlur, error, errorMsg } = this.props;

    return (
      <>
        <label htmlFor={name}>
          {label}
        </label>
        <input
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          onChange={(e) => onChange(e)}
          onBlur={() => onBlur(name, value)}
        />
        <p className='input-error'>{error && errorMsg}</p>
      </>
    );
  }
}
