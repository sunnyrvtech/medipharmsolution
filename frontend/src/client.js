// client.js

import axios from 'axios';
import APP_URL from './config';
export default () => {
  return axios.create({baseURL: APP_URL})
}
