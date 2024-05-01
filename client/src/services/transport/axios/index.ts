/* eslint-disable no-param-reassign */
import axios, { AxiosError } from 'axios';

import {
  DEFAULT_BACKOFF_TIME,
  DEFAULT_RETRIES_COUNT,
} from '@@constants/transport';
import { auth } from '@@services/auth/firebase';

export const appInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/${
    import.meta.env.VITE_API_VERSION
  }`,
  withCredentials: true,
  retry: DEFAULT_RETRIES_COUNT,
  retryDelay: DEFAULT_BACKOFF_TIME,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

appInstance.interceptors.request.use(
  async (config) => {
    const token = await auth.currentUser?.getIdToken();

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error: AxiosError<unknown, unknown>) => Promise.reject(error),
);
