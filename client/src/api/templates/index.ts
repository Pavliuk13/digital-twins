import { AxiosRequestConfig } from 'axios';

import api from '@@api/rtk';

import { Template } from '@@types/template';

const templatesApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getUserTemplates: build.query<Template[], AxiosRequestConfig>({
        query: (config) => {
          return {
            url: '/template/current-user-templates',
            method: 'get',
            ...config,
          };
        },
      }),
      createTemplate: build.mutation<Template, AxiosRequestConfig>({
        query: (config) => {
          return {
            url: '/template',
            method: 'post',
            ...config,
          };
        },
        invalidatesTags: ['Template'],
      }),
    };
  },
});

export const { useGetUserTemplatesQuery, useCreateTemplateMutation } =
  templatesApi;

export default templatesApi;
