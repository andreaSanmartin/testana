import axios from 'axios';

const apiClient = axios.create({
  baseURL: "https://localhost:44372/",
  timeout: 50000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;