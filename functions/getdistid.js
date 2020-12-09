exports.handler = async function (event, context) {
  const API_URL = '/api/backoffice/users';
  const options = { headers: { 'x-company-code': 'XBU' } };
  const { method, body } = event;

  // Get distributor id from back office
  const getDistributorId = (repId) =>
    fetch(`${API_URL}${repId}`, options).then((response) => ({
      dist_id: response.json().distributorId,
    }));

  if (method === 'POST') {
    return await getDistributorId(body.dist_id);
  }
};
