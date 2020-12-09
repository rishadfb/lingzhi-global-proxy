const getQueryStringValue = (key) =>
  decodeURIComponent(
    window.location.search.replace(
      new RegExp(
        '^(?:.*[&\\?]' +
          encodeURIComponent(key).replace(/[\.\+\*]/g, '\\$&') +
          '(?:\\=([^&]*))?)?.*$',
        'i'
      ),
      '$1'
    )
  );

const setSignupLink = (distId) => {
  var link = document.getElementById('signup-consultant');
  var linkHref = link.getAttribute('href');
  var newUrl = linkHref + '?sponsor_id=' + distId;
  link.setAttribute('href', newUrl);
};

const retrieveDistId = () => {
  const distId = sessionStorage.getItem('lg_dist_id');

  if (distId) {
    setSignupLink(distId);
  }
};

retrieveDistId();
