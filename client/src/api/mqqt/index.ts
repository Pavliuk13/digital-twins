import { AxiosRequestConfig } from 'axios';

import api from '@@api/rtk';

import { MqqtTask } from '@@types/mqqt';

const mqqtApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      createMqqtTask: build.mutation<void, AxiosRequestConfig<MqqtTask>>({
        query: (config) => {
          return {
            url: '/mqqt',
            method: 'post',
            ...config,
          };
        },
      }),
    };
  },
});

export const { useCreateMqqtTaskMutation } = mqqtApi;

export default mqqtApi;
