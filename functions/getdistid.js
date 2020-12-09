const axios = require('axios');

const backoffice = axios.create({
  baseURL: 'https://backoffice.lingzhiglobal.com/api/v2/public/users/',
  headers: { 'x-company-code': 'XBU' },
});

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
};

/**
 * Get distributor id from back office
 * @param {*} repId
 */
const getDistributorId = (repId) =>
  backoffice
    .get(repId)
    .then((response) => ({ dist_id: response.data.response.distributorId }));

/**
 * Handle post request
 * @param {*} body
 */
const handlePost = async (body) => {
  const repId = JSON.parse(body).rep_id;
  const response = await getDistributorId(repId);

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(response),
  };
};

/**
 * Handle get request
 */
const handleGet = () => ({
  statusCode: 200,
  headers,
  body: 'Welcome to the Lingzhi Global Proxy API.',
});

/**
 * Handle request error
 * @param {*} error
 */
const handleError = (error) => ({
  statusCode: 500,
  headers,
  body: error.toString(),
});

/**
 * Main event handler
 * @param {*} event
 */
const handler = (event) => {
  try {
    const { body, httpMethod } = event;

    if (httpMethod === 'POST') {
      return handlePost(body);
    }

    if (httpMethod === 'GET') {
      return handleGet();
    }
  } catch (error) {
    return handleError(error);
  }
};

module.exports = { handler };
