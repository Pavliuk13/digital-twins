import { AxiosRequestConfig } from 'axios';

import api from '@@api/rtk';

import {
  CreateDeviceArgs,
  Device,
  DeviceErrorLog,
  DeviceStatLog,
} from '@@types/device';
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
        providesTags: ['Device'],
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
      getDeviceErrorLogs: build.query<DeviceErrorLog[], AxiosRequestConfig>({
        query: (config) => {
          return {
            url: '/device/error-logs',
            method: 'get',
            ...config,
          };
        },
      }),
      getDeviceStatistics: build.query<DeviceStatLog[], AxiosRequestConfig>({
        query: (config) => {
          return {
            url: '/device/stats',
            method: 'get',
            ...config,
          };
        },
      }),
    };
  },
});

export const {
  useGetDevicesQuery,
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
  useDeleteDeviceMutation,
  useGetDeviceErrorLogsQuery,
  useGetDeviceStatisticsQuery,
} = devicesApi;

export default devicesApi;
