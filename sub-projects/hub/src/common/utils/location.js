export function navigate(location, params = []) {
  const URLParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    URLParams.append(key, params[key]);
  });

  window.location = `${location}?${URLParams.toString()}`;
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
