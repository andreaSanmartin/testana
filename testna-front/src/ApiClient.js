import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:5070/",
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;