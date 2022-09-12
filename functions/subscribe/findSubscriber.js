const axios = require('axios').default;
require('dotenv').config();

const apiUrl = process.env.CONVERTKIT_API_URL;
const apiSecretKey = process.env.CONVERTKIT_API_SECRET_KEY;

async function findSubscriber(event) {
  const subscriberEmail = JSON.parse(event.queryStringParameters.email).email;
  const endpoint = `${apiUrl}/subscribers?api_secret=${apiSecretKey}&email_address=${subscriberEmail}`;

  try {
    const response = await axios.get(endpoint);
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

module.exports = findSubscriber;