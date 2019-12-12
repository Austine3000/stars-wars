function fetchAbsolute(fetch: any) {
  return (baseUrl: any) => (url: string, ...otherParams: any) =>
    url.startsWith('/')
      ? fetch(baseUrl + url, ...otherParams)
      : fetch(url, ...otherParams);
}

const fetchApi = fetchAbsolute(fetch)(process.env.REACT_APP_BACKEND_BASE_URL);

export default fetchApi;
