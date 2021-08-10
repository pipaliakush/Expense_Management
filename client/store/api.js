export function request(axios, type, url, data) {
  let request;
  axios.default.withCredentials = true;
  const newUrl = process.env.API_URL + url;
  switch (type) {
    case "get":
      request = axios.get(newUrl, {
        withCredentials: true,
        params: data
      });
      break;
    case "post":
      request = axios.post(newUrl, data, {
        withCredentials: true
      });
      break;
    case "put":
      request = axios.put(newUrl, data, {
        withCredentials: true
      });
      break;
    case "delete":
      request = axios.delete(newUrl, {
        withCredentials: true
      });
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
