export function navigate(location, params = []) {
  let url = location;

  if (params.length > 0) {
    url += '?';

    params.forEach((param) => {
      url += `/${param}`;
    });
  }

  window.location = url;
}

export function removeURLParams() {
  const url = new URL(window.location);

  window.history.pushState({}, '', url.toString().replace(/\?.*#/, '#'));
}

export function getURLParams() {
  const url = new URL(window.location);
  const params = {};

  [...url.searchParams.entries()].forEach((param) => {
    params[param[0]] = param[1];
  });

  return params;
}
