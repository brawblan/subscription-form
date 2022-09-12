import './App.css';
import React, { Component } from 'react';
import Container from './components/Container';
import LoadingSpinner from './components/LoadingSpinner';
import SubscribeForm from './components/SubscribeForm';
import Success from './components/Success';
import SearchForm from './components/SearchForm';
import { Text } from './utils/constants';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      isSubscribed: false
    };

    this.setIsLoading = this.setIsLoading.bind(this);
    this.setIsSubscribed = this.setIsSubscribed.bind(this);
  }

  setIsLoading(bool) {
    this.setState({ isLoading: bool });
  }

  setIsSubscribed(bool) {
    this.setState({ isSubscribed: bool });
  }

  render() {
    const { isLoading, isSubscribed } = this.state;

    return (
      <>
        <h1>ConvertKit Subscription Form</h1>
        <div id='container'>
          <Container
            isSubscribed={!isSubscribed}
            title={Text.subscriptionContainerTitle}>
            <SubscribeForm
              setIsLoading={this.setIsLoading}
              setIsSubscribed={this.setIsSubscribed}
            />
          </Container>

          <Container
            isSubscribed={isSubscribed}
            title={Text.successContainerTitle}>
            <Success
              submitAnotherEmail={this.setIsSubscribed}
            />
          </Container>

          <Container
            isSearch={true}
            title={Text.searchContainerTitle}>
            <SearchForm
              setIsLoading={this.setIsLoading}
            />
          </Container>
        </div>

        {isLoading && <LoadingSpinner />}
      </>
    );
  }
}

