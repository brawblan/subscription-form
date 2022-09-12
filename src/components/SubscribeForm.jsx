import React, { Component } from 'react';
import Input from './Input';
import Button from './Button';
import { ConvertKitService } from '../services/ConvertKitService';
import { onlyAllowNumbers, validateFormForSubmitButton, updateErrorState } from '../utils/form-helpers';
import { INIT_SUBSCRIBE_STATE, subscribeFormInputs, Text } from '../utils/constants';

const InitState = () => new INIT_SUBSCRIBE_STATE();

export default class SubscribeForm extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    this.state = {
      ...InitState()
    };

    this.handleErrorState = this.handleErrorState.bind(this);
    this.setDisabledStateForSubmitButton = this.setDisabledStateForSubmitButton.bind(this);
    this.handleInputErrors = this.handleInputErrors.bind(this);
    this.updateInputValueState = this.updateInputValueState.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
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
          value: onlyAllowNumbers(name, value),
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

  async handleSubmit(event) {
    event.preventDefault();
    this.props.setIsLoading(true);

    const { email, firstName, lastName, phoneNumber } = this.state.formData;
    const formData = {
      firstName: firstName.value,
      lastName: lastName.value,
      email: email.value,
      phoneNumber: phoneNumber.value
    };

    try {
      await ConvertKitService.AddSubscriber(formData);
      this.resetState();
      this.props.setIsLoading(false);
      this.props.setIsSubscribed(true);
    } catch (error) {
      this.handleFormSubmissionError(error);
      this.props.setIsLoading(false);
    }
  }

  resetState() {
    this.setState({
      ...InitState()
    });
  }

  render() {
    const { formData, formError, disabled } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <p className='form-error'>{formError.error && formError.errorMsg}</p>
        {subscribeFormInputs.map(({ label, name, type, errorMsg, placeholder }, key) => {
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
        <Button
          title={Text.subscriptionButtonTitle}
          type='submit'
          disabled={disabled}
        />
      </form>
    );
  }
}
