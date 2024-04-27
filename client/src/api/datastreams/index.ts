import { AxiosRequestConfig } from 'axios';

import api from '@@api/rtk';

import { Template } from '@@types/template';
import { Datastream } from '@@types/datastream';

const datastreamsApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getDatastreams: build.query<
        Datastream[],
        AxiosRequestConfig<{ templateId: Template['id'] }>
      >({
        query: (config) => {
          return {
            url: '/datastream/list',
            method: 'get',
            ...config,
          };
        },
      }),
      createDatastream: build.mutation<
        Omit<Datastream, 'id'>,
        AxiosRequestConfig
      >({
        query: (config) => {
          return {
            url: '/datastream',
            method: 'post',
            ...config,
          };
        },
        invalidatesTags: ['Datastream'],
      }),
      updateDatastream: build.mutation<
        Datastream,
        AxiosRequestConfig<
          Omit<Datastream, 'id'> & { datastreamId: Datastream['id'] }
        >
      >({
        query: (config) => {
          return {
            url: '/datastream',
            method: 'put',
            ...config,
          };
        },
        invalidatesTags: ['Datastream'],
      }),
      deleteDatastream: build.mutation<
        void,
        AxiosRequestConfig<{ datastreamId: Datastream['id'] }>
      >({
        query: (config) => {
          return {
            url: '/datastream',
            method: 'delete',
            ...config,
          };
        },
        invalidatesTags: ['Datastream'],
      }),
    };
  },
});

export const {
  useGetDatastreamsQuery,
  useCreateDatastreamMutation,
  useUpdateDatastreamMutation,
  useDeleteDatastreamMutation,
} = datastreamsApi;

export default datastreamsApi;
