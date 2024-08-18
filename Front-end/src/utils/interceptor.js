import axios from 'axios';

import { refreshToken, logout } from '../store/userSlice';

export const initInterceptors = (store) => {
  axios.interceptors.request.use((config) => {
    // set Authorization header
    const { accessToken } = store.getState().user;

    const conditions = [
      !!accessToken,
      config.url !== '/login',
      config.url !== '/refresh',
      config.url !== '/register',
    ];

    if (conditions.every(value => value === true)) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  });

  axios.interceptors.response.use(
    response => response,
    async (err) => {
    if (axios.isCancel(err)) {
      return false;
    }

    const res = err.response;

    // Expired token interceptor
    if (res.status === 401 && err.config.url !== '/refresh') {
      await store.dispatch(refreshToken());
      const { accessToken } = store.getState().user;

      if (accessToken) {
        const config = { ...err.config };
        config.headers.Authorization = `Bearer ${accessToken}`;
        return axios(config);
      }
    }

    // Expired refresh token interceptor
    if (res.status === 401 && err.config.url === '/refresh') {
      store.dispatch(logout());
    }

    return Promise.reject(err);
  });
};

export default {};
