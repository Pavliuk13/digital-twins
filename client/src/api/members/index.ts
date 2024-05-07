import { AxiosRequestConfig } from 'axios';

import api from '@@api/rtk';

import { Organization } from '@@types/organization';
import { User } from '@@types/user';

const membersApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getMembers: build.query<
        User[],
        AxiosRequestConfig<{ organizationId: Organization['id'] }>
      >({
        query: (config) => {
          return {
            url: '/user/list',
            method: 'get',
            ...config,
          };
        },
        providesTags: ['Members'],
      }),
    };
  },
});

export const { useGetMembersQuery } = membersApi;

export default membersApi;
