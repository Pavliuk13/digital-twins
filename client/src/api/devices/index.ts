import { AxiosRequestConfig } from 'axios';

import api from '@@api/rtk';

import { CreateDeviceArgs, Device } from '@@types/device';
import { Organization } from '@@types/organization';

const devicesApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getDevices: build.query<
        Device[],
        AxiosRequestConfig<{ organizationId: Organization['id'] }>
      >({
        query: (config) => {
          return {
            url: '/device/list',
            method: 'get',
            ...config,
          };
        },
      }),
      createDevice: build.mutation<
        Device,
        AxiosRequestConfig<CreateDeviceArgs>
      >({
        query: (config) => {
          return {
            url: '/device',
            method: 'post',
            ...config,
          };
        },
        invalidatesTags: ['Device', 'Template'],
      }),
      updateDevice: build.mutation<
        Device,
        AxiosRequestConfig<CreateDeviceArgs>
      >({
        query: (config) => {
          return {
            url: '/device',
            method: 'put',
            ...config,
          };
        },
        invalidatesTags: ['Device', 'Template'],
      }),
      deleteDevice: build.mutation<Device, AxiosRequestConfig>({
        query: (config) => {
          return {
            url: '/device',
            method: 'delete',
            ...config,
          };
        },
        invalidatesTags: ['Device', 'Template'],
      }),
    };
  },
});

export const {
  useGetDevicesQuery,
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation,
} = devicesApi;

export default devicesApi;
