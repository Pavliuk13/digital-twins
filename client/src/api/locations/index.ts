import { AxiosRequestConfig } from 'axios';

import api from '@@api/rtk';

import { Organization } from '@@types/organization';
import { LocationArgs, Location } from '@@types/locations';

const locationsApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getLocations: build.query<
        Location[],
        AxiosRequestConfig<{ organizationId: Organization['id'] }>
      >({
        query: (config) => {
          return {
            url: '/location/list',
            method: 'get',
            ...config,
          };
        },
      }),
      createLocation: build.mutation<
        Omit<LocationArgs, 'id'>,
        AxiosRequestConfig
      >({
        query: (config) => {
          return {
            url: '/location',
            method: 'post',
            ...config,
          };
        },
        invalidatesTags: ['Datastream'],
      }),
      updateLocation: build.mutation<
        Location,
        AxiosRequestConfig<
          Omit<LocationArgs, 'id'> & { locationId: Location['id'] }
        >
      >({
        query: (config) => {
          return {
            url: '/location',
            method: 'put',
            ...config,
          };
        },
        invalidatesTags: ['Datastream'],
      }),
      deleteLocation: build.mutation<
        void,
        AxiosRequestConfig<{ locationId: Location['id'] }>
      >({
        query: (config) => {
          return {
            url: '/location',
            method: 'delete',
            ...config,
          };
        },
        invalidatesTags: ['Location'],
      }),
    };
  },
});

export const {
  useGetLocationsQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
  useDeleteLocationMutation,
} = locationsApi;

export default locationsApi;
