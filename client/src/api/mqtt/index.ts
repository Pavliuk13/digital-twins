import { AxiosRequestConfig } from 'axios';

import api from '@@api/rtk';

import { MqttTask } from '@@types/mqtt';

const mqttApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      createMqttTask: build.mutation<void, AxiosRequestConfig<MqttTask>>({
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

export const { useCreateMqttTaskMutation } = mqttApi;

export default mqttApi;
