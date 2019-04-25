// client.js

import axios from 'axios';
import APP_URL from './config';
export default () => {
  let AxiosInstance =  axios.create({baseURL: APP_URL})
  AxiosInstance.interceptors.response.use(function(response) {
  return response;
}, function (error) {
  //catches if status is 401
  if (error.response.status === 401) {
    localStorage.removeItem("jwtToken");
    window.location.href = "/login";
  }
  return Promise.reject(error);
})
  return AxiosInstance;
}
