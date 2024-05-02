import { AxiosRequestConfig } from 'axios';

import api from '@@api/rtk';

import { UpdateWidgetArgs, Widget } from '@@types/widget';
import { Template } from '@@types/template';
import { Device } from '@@types/device';

const widgetsApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getTemplateWidgets: build.query<
        Widget[],
        AxiosRequestConfig<{ templateId: Template['id'] }>
      >({
        query: (config) => {
          return {
            url: '/widget/template',
            method: 'get',
            ...config,
          };
        },
      }),
      getDeviceWidgets: build.query<
        Widget[],
        AxiosRequestConfig<{ deviceId: Device['id'] }>
      >({
        query: (config) => {
          return {
            url: '/widget/device',
            method: 'get',
            ...config,
          };
        },
        providesTags: ['Widget'],
      }),
      assignWidget: build.mutation<
        Widget,
        AxiosRequestConfig<Omit<Widget, 'id' | 'value'>>
      >({
        query: (config) => {
          return {
            url: '/widget',
            method: 'post',
            ...config,
          };
        },
        invalidatesTags: ['Widget'],
      }),
      updateWidget: build.mutation<
        Widget,
        AxiosRequestConfig<UpdateWidgetArgs>
      >({
        query: (config) => {
          return {
            url: '/widget',
            method: 'put',
            ...config,
          };
        },
        invalidatesTags: ['Widget'],
      }),
      deleteWidget: build.mutation<
        void,
        AxiosRequestConfig<{ widgetId: Widget['id'] }>
      >({
        query: (config) => {
          return {
            url: '/widget',
            method: 'delete',
            ...config,
          };
        },
        invalidatesTags: ['Widget'],
      }),
    };
  },
});

export const {
  useGetTemplateWidgetsQuery,
  useGetDeviceWidgetsQuery,
  useAssignWidgetMutation,
  useUpdateWidgetMutation,
  useDeleteWidgetMutation,
} = widgetsApi;

export default widgetsApi;
