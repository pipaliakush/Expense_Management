export function request(axios, type, url, data) {
  let request;
  axios.default.withCredentials = true;
  const newUrl = "http://localhost:3001" + url;
  switch (type) {
    case "get":
      request = axios.get(newUrl, {
        withCredentials: true
      });
      break;
    case "post":
      request = axios.post(url, data);
      break;
    case "put":
      request = axios.put(url, data);
      break;
    case "delete":
      request = axios.delete(url);
      break;
  }
  return request;
}

// export function apiService({
//   url = '',
//   method = 'GET',
//   body = null,
//   authToken = getToken(),
//   headers = {}
// }) {
//   const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

//   // axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:3001/api/v1';
//   if (!headers['Content-Type']) {
//     headers['Content-Type'] = 'application/json';
//   }

//   if (authToken) {
//     headers['x-access-token'] = `${authToken}`;
//   }

//   return axios.request({
//     url,
//     method,
//     headers,
//     [dataOrParams]: body,
//     withCredentials: true
//   });
// }
