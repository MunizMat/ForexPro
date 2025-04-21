import axios from 'axios';

const api = axios.create({
  baseURL: `https://${process.env.NEXT_PUBLIC_BACKEND_DOMAIN || ''}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
