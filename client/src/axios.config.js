import axios from 'axios';

const api = axios.create({
  baseURL: `http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`,
});

export default api;
