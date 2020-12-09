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
    .then((response) => response.data.response.distributorId);

const handler = async (event) => {
  try {
    const { body, httpMethod } = event;
    const repId = JSON.parse(body).rep_id;

    if (httpMethod === 'POST') {
      const response = await getDistributorId(repId);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ dist_id: response }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: 'Welcome to the Lingzhi Global Proxy API.',
    };
  } catch (error) {
    return { statusCode: 500, headers, body: error.toString() };
  }
};

module.exports = { handler };
