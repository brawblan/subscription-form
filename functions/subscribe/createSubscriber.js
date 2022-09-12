const axios = require('axios').default;
require('dotenv').config();

const apiUrl = process.env.CONVERTKIT_API_URL;
const formId = process.env.CONVERTKIT_FORM_ID;
const endpoint = `${apiUrl}/forms/${formId}/subscribe`;
const apiKey = process.env.CONVERTKIT_API_KEY;

async function addSubscriber(event) {
  const eventBody = JSON.parse(event.body);
  const payload = {
    api_key: apiKey,
    email: eventBody.email,
    first_name: eventBody.firstName,
    fields: {
      last_name: eventBody.lastName,
      phone_number: eventBody.phoneNumber
    }
  };

  try {
    const response = await axios.post(endpoint, payload);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 422,
      body: JSON.stringify(error)
    };
  }
};

module.exports = addSubscriber;
