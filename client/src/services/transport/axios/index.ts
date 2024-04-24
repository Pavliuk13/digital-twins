import axios from 'axios';

import {
  DEFAULT_BACKOFF_TIME,
  DEFAULT_RETRIES_COUNT,
} from '@@constants/transport';

export const appInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/${
    import.meta.env.VITE_API_VERSION
  }`,
  // withCredentials: true,
  retry: DEFAULT_RETRIES_COUNT,
  retryDelay: DEFAULT_BACKOFF_TIME,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  },
});
