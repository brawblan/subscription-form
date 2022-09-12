export const InputErrorHandling = {
  handleEmailErrors(updateErrorState, { name, value }) {
    const emailRegEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const error = !emailRegEx.test(value);
    updateErrorState(error, name);
  },

  handleNameErrors(updateErrorState, { name, value }) {
    const error = (value.length < 1 || value.length > 20);
    updateErrorState(error, name);
  },

  handlePhoneNumberErrors(updateErrorState, { name, value }) {
    const error = (value.length !== 10);
    updateErrorState(error, name);
  }
};
