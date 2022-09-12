const findSubscriber = require('./findSubscriber');
const createSubscriber = require('./createSubscriber');
const deleteSubscriber = require('./deleteSubscriber');
const formattedReturn = require('./formattedReturn');

exports.handler = async (event, context) => {
  if (event.httpMethod === 'GET') {
    return await findSubscriber(event);
  } else if (event.httpMethod === 'POST') {
    return await createSubscriber(event);
  } else if (event.httpMethod === 'PUT') {
    return await deleteSubscriber(event);
  } else {
    return formattedReturn(405, {});
  }
};