function getDistributorId(repId) {
  var xmlHttp = new XMLHttpRequest();
  var api =
    'https://cors-anywhere.herokuapp.com/https://backoffice.lingzhiglobal.com/api/v2/public/users/';
  var url = api + repId;

  xmlHttp.open('GET', url, false);
  xmlHttp.setRequestHeader('x-company-code', 'XBU');
  xmlHttp.send(null);

  var json = JSON.parse(xmlHttp.responseText);

  if (json.meta.code === 200) {
    return json.response.distributorId;
  } else {
    return undefined;
  }
}

function redirectUrl(distId) {
  var url =
    window.location.protocol + '//' + window.location.host + '/?rep=' + distId;
  window.location.replace(url);
}

function handleRepName() {
  var repName = window.location.pathname.split('/')[1];

  if (repName.length > 0) {
    var distId = getDistributorId(repName);

    if (distId) {
      sessionStorage.setItem('lg_rep_id', repName);
      sessionStorage.setItem('lg_dist_id', distId);
      redirectUrl(repName);
    }
  }
}

handleRepName();
