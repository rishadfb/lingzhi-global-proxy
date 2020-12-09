const getDistributorId = async (repId) =>
  fetch('/api/getdistid', {
    method: 'POST',
    body: JSON.stringify({ rep_id: repId }),
  }).then((response) => response.json().dist_id);

const redirectUrl = (distId) => {
  const url = `${window.location.protocol}//${window.location.host}/?rep=${distId}`;
  window.location.replace(url);
};

const updateStorage = ({ repName, distId }) => {
  sessionStorage.setItem('lg_rep_id', repName);
  sessionStorage.setItem('lg_dist_id', distId);
}

const handleRepName = () => {
  const repName = window.location.pathname.split('/')[1];

  if (repName.length > 0) {
    const distId = await getDistributorId(repName);

    if (distId) {
      updateStorage({ repName, distId })
      redirectUrl(repName);
    }
  }
}

handleRepName();
