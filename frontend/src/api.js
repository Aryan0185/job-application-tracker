import axios from 'axios';

const api = axios.create({
  baseURL: 'https://job-application-tracker-qp4s.onrender.com/api'
});

export default api;
