import { AxiosRequestConfig } from 'axios';

import api from '@@api/rtk';

import { User } from '@@types/user';

const userApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      createUser: build.mutation<
        User,
        AxiosRequestConfig<Pick<User, 'name' | 'email'>>
      >({
        query: (config) => {
          return {
            url: '/user',
            method: 'post',
            ...config,
          };
        },
      }),
      getCurrentUser: build.query<User, AxiosRequestConfig>({
        query: (config) => {
          return {
            url: '/user/current',
            method: 'get',
            ...config,
          };
        },
      }),
      updateUser: build.mutation<User, AxiosRequestConfig<Pick<User, 'name'>>>({
        query: (config) => {
          return {
            url: '/user',
            method: 'put',
            ...config,
          };
        },
        invalidatesTags: ['Members'],
      }),
    };
  },
});

export const {
  useCreateUserMutation,
  useLazyGetCurrentUserQuery,
  useUpdateUserMutation,
} = userApi;

export default userApi;
