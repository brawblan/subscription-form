const axios = require('axios').default;
require('dotenv').config();

const apiUrl = process.env.CONVERTKIT_API_URL;
const endpoint = `${apiUrl}/unsubscribe`;
const apiSecretKey = process.env.CONVERTKIT_API_SECRET_KEY;

async function deleteSubscriber(event) {
  const subscriberEmail = JSON.parse(event.body).email.email;

  const payload = {
    api_secret: apiSecretKey,
    email: subscriberEmail
  };

  try {
    const response = await axios.put(endpoint, payload);
    return {
      statusCode: 200,
      body: JSON.stringify(response.data)
    };
  } catch (error) {
    return {
      statusCode: 404,
      body: JSON.stringify(error)
    };
  }
};

module.exports = deleteSubscriber;