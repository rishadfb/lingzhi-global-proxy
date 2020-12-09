const getDistributorId = async (repId) => {
  const url = 'https://lingzhi-global-proxy.netlify.app/api/getdistid';
  const body = JSON.stringify({ rep_id: repId });
  const options = { method: 'POST', body };

  const response = await fetch(url, options);
  const data = await response.json();

  return data.dist_id;
};

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
