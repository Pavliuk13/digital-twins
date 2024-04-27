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
      getTemplate: build.query<
        Template,
        AxiosRequestConfig<{ id: Template['id'] }>
      >({
        query: (config) => {
          return {
            url: '/template',
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
      updateTemplate: build.mutation<Template, AxiosRequestConfig>({
        query: (config) => {
          return {
            url: '/template',
            method: 'put',
            ...config,
          };
        },
        invalidatesTags: ['Template'],
      }),
      deleteTemplate: build.mutation<Template, AxiosRequestConfig>({
        query: (config) => {
          return {
            url: '/template',
            method: 'delete',
            ...config,
          };
        },
        invalidatesTags: ['Template'],
      }),
    };
  },
});

export const {
  useGetUserTemplatesQuery,
  useGetTemplateQuery,
  useCreateTemplateMutation,
  useUpdateTemplateMutation,
  useDeleteTemplateMutation,
} = templatesApi;

export default templatesApi;
