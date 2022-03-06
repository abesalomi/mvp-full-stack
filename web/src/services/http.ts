import axios from 'axios';

export const http = axios.create({
  baseURL: '/api',
});


export const setBearer = (token: string | undefined) => {
  http.defaults.headers.common = token
    ? {
      'Authorization': `bearer ${token}`,
    }
    : {}
}



