import React, { Component } from 'react';
import '../assets/styles/components.css';

export default class Container extends Component {
  constructor(props) {
    super(props);
    this.props = props;
  }

  render() {
    const { title, children, isSubscribed, isSearch = false } = this.props;
    const isDisplayed = isSubscribed || isSearch;

    return (
      <>
        {isDisplayed && (
          <div className='container-box--component'>
            <h2>{title}</h2>
            {children}
          </div>
        )}
      </>
    );
  }
}
