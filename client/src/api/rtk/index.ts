import { createApi } from '@reduxjs/toolkit/query/react';
import type { AxiosBaseQuery, BaseQueryError } from '@@types/api';

import { appInstance } from '@@services/transport/axios';

const axiosBaseQuery = (): AxiosBaseQuery => async (axiosConfig) => {
  try {
    const { data, ...meta } = await appInstance(axiosConfig);

    return { data, meta };
  } catch (axiosError) {
    return {
      error: axiosError as BaseQueryError,
    };
  }
};

const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['Template', 'Device', 'Datastream'],
  endpoints: () => ({}),
});

export default api;
