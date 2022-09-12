export const InputLabel = {
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'email',
  phoneNumber: 'phoneNumber'
};

export const Text = {
  subscriptionContainerTitle: 'Subscription Form',
  subscriptionButtonTitle: 'Subscribe!',
  successContainerTitle: 'Success!',
  successButtonTitle: 'Submit another email',
  searchContainerTitle: 'Find Subscriber',
  unsubscribeButtonTitle: 'Unsubscribe',
  searchAnotherButtonTitle: 'Search Another Email',
  findDataButtonTitle: 'Find',
  dataNotProvided: 'not provided',
  noSubscribersError: 'There are no subscribers with that email address.',
  successUnsubscribeMsg: 'User was successfully unsubscribed.'
};

class FormDataInput {
  value = '';
  error = false;
  touched = false;
  onUpdate = (cb, { name, value }) => cb(name, value);
}

export const INIT_SUBSCRIBE_FORM = {
  firstName: new FormDataInput(),
  lastName: new FormDataInput(),
  email: new FormDataInput(),
  phoneNumber: new FormDataInput(),
};

export const INIT_SEARCH_FORM = {
  email: new FormDataInput(),
};

export const subscribeFormInputs = [
  { label: 'First Name', name: 'firstName', type: 'input', errorMsg: 'Name must be between 1-20 characters.' },
  { label: 'Last Name', name: 'lastName', type: 'input', errorMsg: 'Name must be between 1-20 characters.' },
  { label: 'Email Address', name: 'email', type: 'email', errorMsg: 'Must be in email address format.' },
  { label: 'Phone Number', name: 'phoneNumber', type: 'tel', errorMsg: 'Phone number must include 3 digit area code followed by your 7 digit number.', placeholder: 'Area Code + Number / 1234567890' }
];

export const searchFormInputs = [
  { label: 'Email Address', name: 'email', type: 'email', errorMsg: 'Must be in email address format.' },
];

class INIT_STATE {
  disabled = true;
  formError = {
    error: false,
    errorMsg: ''
  };
};

export class INIT_SUBSCRIBE_STATE extends INIT_STATE {
  formData = INIT_SUBSCRIBE_FORM;
}

export class INIT_SEARCH_STATE extends INIT_STATE {
  formData = INIT_SEARCH_FORM;
  searched = false;
  deleted = false;
}
