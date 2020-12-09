/**
 * Get distributor id from back office
 * @param {*} repId
 */
const getDistributorId = (repId) => {
  const API_URL = '/backoffice/users';
  const options = { headers: { 'x-company-code': 'XBU' } };

  return fetch(`${API_URL}${repId}`, options).then(
    (response) => response.json().distributorId
  );
};

const handler = async (event) => {
  try {
    const { body, method } = event;

    if (method === 'POST') {
      const distId = await getDistributorId(body.rep_id);

      return {
        statusCode: 200,
        body: JSON.stringify({ dist_id: distId }),
      };
    }

    return {
      statusCode: 200,
      body: 'Welcome to the Lingzhi Global Proxy API.',
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};

module.exports = { handler };
