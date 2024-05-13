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
      inviteUser: build.mutation<
        User,
        AxiosRequestConfig<Pick<User, 'name' | 'email'>>
      >({
        query: (config) => {
          return {
            url: '/user/invite-user',
            method: 'post',
            ...config,
          };
        },
        invalidatesTags: ['Members'],
      }),
      acceptInvite: build.mutation<
        User,
        AxiosRequestConfig<Pick<User, 'name' | 'invitationCode'>>
      >({
        query: (config) => {
          return {
            url: '/user/accept-invitation',
            method: 'post',
            ...config,
          };
        },
        invalidatesTags: ['Members'],
      }),
      getUserByInvitationCode: build.query<
        User,
        AxiosRequestConfig<Pick<User, 'invitationCode'>>
      >({
        query: (config) => {
          return {
            url: '/user/by-invitation-code',
            method: 'get',
            ...config,
          };
        },
      }),
    };
  },
});

export const {
  useCreateUserMutation,
  useGetUserByInvitationCodeQuery,
  useLazyGetCurrentUserQuery,
  useUpdateUserMutation,
  useInviteUserMutation,
  useAcceptInviteMutation,
} = userApi;

export default userApi;
