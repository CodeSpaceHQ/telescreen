export function navigate(location, params) {
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
  window.history.pushState({}, document.location.origin, document.location.pathname);
}

export function getURLParams() {
  const url = new URL(window.location);

  return [...url.searchParams.entries()];
}
