const fetch = require('node-fetch');

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
  fetch(`/backoffice/users${repId}`).then(
    (response) => response.json().distributorId
  );

const handler = async (event) => {
  try {
    const { body, method } = event;

    if (method === 'POST') {
      const distId = await getDistributorId(body.rep_id);

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ dist_id: distId }),
      };
    }

    return {
      statusCode: 200,
      headers,
      body: 'Welcome to the Lingzhi Global Proxy API.',
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
