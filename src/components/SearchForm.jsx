import React, { Component } from 'react';
import Input from './Input';
import Subscriber from './Subscriber';
import Button from './Button';
import { ConvertKitService } from '../services/ConvertKitService';
import { validateFormForSubmitButton, updateErrorState } from '../utils/form-helpers';
import { INIT_SEARCH_STATE, searchFormInputs, Text } from '../utils/constants';

const InitState = () => new INIT_SEARCH_STATE();

export default class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      ...InitState()
    };
    this.baseState = this.state;
    this.handleErrorState = this.handleErrorState.bind(this);
    this.setDisabledStateForSubmitButton = this.setDisabledStateForSubmitButton.bind(this);
    this.handleInputErrors = this.handleInputErrors.bind(this);
    this.updateInputValueState = this.updateInputValueState.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  handleErrorState(error, name) {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: {
          ...prevState.formData[name],
          error: error,
        }
      }
    }));
  }

  setDisabledStateForSubmitButton() {
    const disabled = validateFormForSubmitButton(this.state.formData);
    this.setState({ disabled: disabled });
  }

  handleInputErrors(name, value) {
    updateErrorState(name, value, this.handleErrorState);
    this.setDisabledStateForSubmitButton();
  }

  updateInputValueState(name, value) {
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: {
          ...prevState.formData[name],
          value: value,
          error: false,
          touched: !!value
        }
      }
    }));
  }

  handleInputChange({ target: { name, value } }) {
    const nameAndValue = { name, value };
    this.state.formData[name].onUpdate(this.updateInputValueState, nameAndValue);
  }

  handleFormSubmissionError(error) {
    this.setState({
      formError: {
        error: true,
        errorMsg: error
      }
    });
  }

  setSearched(bool) {
    this.setState({ searched: bool });
  }

  setDeleted(bool) {
    this.setState({ deleted: bool });
  }

  setSubscriber(subscriber) {
    this.setState({ subscriber });
  }

  async unsubscribe() {
    this.props.setIsLoading(true);
    this.resetState();

    const { email } = this.state.formData;
    const formData = { email: email.value };

    try {
      await ConvertKitService.DeleteSubscriber(formData);
      this.setDeleted(true);
      this.props.setIsLoading(false);
    } catch (error) {
      this.handleFormSubmissionError(error);
      this.props.setIsLoading(false);
    }
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.props.setIsLoading(true);

    const { email } = this.state.formData;
    const formData = { email: email.value };

    try {
      const subscriber = (await ConvertKitService.FindSubscriberByEmail(formData)).subscribers[0];
      this.setSubscriber(subscriber);
      this.setSearched(true);
      this.setDeleted(false);
      this.props.setIsLoading(false);
    } catch (error) {
      this.setDeleted(false);
      this.setSearched(true);
      this.handleFormSubmissionError(error);
      this.props.setIsLoading(false);
    }
  }

  resetState() {
    this.setState({ subscriber: null });
    this.setState(this.baseState);
  }
  render() {
    const { formData, disabled, subscriber, searched, deleted } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        {searched && (
          <p className='search-form-error'>{!!!subscriber && Text.noSubscribersError}</p>
        )}
        {deleted && (
          <p className='search-form-unsub-success'>{Text.successUnsubscribeMsg}</p>
        )}
        {searchFormInputs.map(({ label, name, type, errorMsg, placeholder }, key) => {
          const { value, error } = formData[name];

          return (
            <Input
              key={key}
              label={label}
              name={name}
              value={value}
              type={type}
              placeholder={placeholder}
              onChange={this.handleInputChange}
              onBlur={this.handleInputErrors}
              error={error}
              errorMsg={errorMsg}
            />
          );
        }
        )}
        {subscriber && <Subscriber subscriber={subscriber} />}
        {subscriber ? (
          <>
            <Button
              title={Text.unsubscribeButtonTitle}
              type='button'
              danger={true}
              onClick={this.unsubscribe}
            />
            <Button
              title={Text.searchAnotherButtonTitle}
              type='button'
              onClick={this.resetState}
            />
          </>
        ) : (
          <Button
            title={Text.findDataButtonTitle}
            type='submit'
            disabled={disabled}
          />
        )}
      </form>
    );
  }
}
