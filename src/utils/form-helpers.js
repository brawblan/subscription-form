import { InputLabel } from './constants';
import { InputErrorHandling } from './error-handling';

export function removeCharInput(input) {
  return input.split('').slice(0, -1).join('');
}

export function onlyAllowNumbers(name, value) {
  if (name === InputLabel.phoneNumber) {
    return !isNaN(value) && value.length < 11
      ? value
      : removeCharInput(value);
  } else {
    return value;
  }
}

export function validateFormForSubmitButton(formData) {
  let touchedArr = [];
  let errorArr = [];
  Object.values(formData).forEach((item) => {
    touchedArr.push(item.touched);
    errorArr.push(item.error);
  });

  const touched = touchedArr.every((bool) => bool === true);
  const error = errorArr.some((bool) => bool === true);

  const disabled = !touched || error;

  return disabled;
}


export function updateErrorState(name, value, handleErrorState) {
  switch (InputLabel[name]) {
    case 'email':
      return InputErrorHandling.handleEmailErrors(handleErrorState, { name, value });
    case 'firstName':
      return InputErrorHandling.handleNameErrors(handleErrorState, { name, value });
    case 'lastName':
      return InputErrorHandling.handleNameErrors(handleErrorState, { name, value });
    case 'phoneNumber':
      return InputErrorHandling.handlePhoneNumberErrors(handleErrorState, { name, value });
    default: return null;
  }
}