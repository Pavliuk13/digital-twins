import { AxiosRequestConfig } from 'axios';

import api from '@@api/rtk';

import { User } from '@@types/user';

const userApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      createUser: build.mutation<
        void,
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
    };
  },
});

export const { useCreateUserMutation } = userApi;

export default userApi;
