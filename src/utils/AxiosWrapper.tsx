import axios from 'axios';

export default axios.create({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL,
  responseType: 'json'
});
