const fetch = require('node-fetch');

const getDistributorId = (repId) =>
  fetch('https://lingzhi-global-proxy.netlify.app/api/getdistid', {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify({ rep_id: repId }),
  }).then((response) => response.json().dist_id);

const redirectUrl = (distId) => {
  const url = `${window.location.protocol}//${window.location.host}/?rep=${distId}`;
  window.location.replace(url);
};

const updateStorage = ({ repName, distId }) => {
  sessionStorage.setItem('lg_rep_id', repName);
  sessionStorage.setItem('lg_dist_id', distId);
};

const handleRepName = async () => {
  const repName = window.location.pathname.split('/')[1];

  if (repName.length > 0) {
    const distId = await getDistributorId(repName);

    if (distId) {
      updateStorage({ repName, distId });
      redirectUrl(repName);
    }
  }
};

handleRepName();
