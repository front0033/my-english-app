import { createApi } from '@reduxjs/toolkit/query/react';
import baseApiClient, { ResponseDataStatus } from 'api/baseApiClient';
import { API_URL } from 'api/constant';

import ENGLISH_WORDS_APP_LOCALSTORAGE_USER_KEY from 'components/AccessNavigator/constants';
import { setUser } from '../userProfile/userProfileSlice';

export type UserId = string;

export interface User {
  userId: UserId;
  email: string;
  avatar: string;
  date: string;
  _id: string;
}

export interface UserRequest {
  email: string;
  password: string;
}

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: baseApiClient({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    // создаем нового юзера
    createUser: builder.mutation<ResponseDataStatus, UserRequest>({
      async queryFn(arg, queryApi, _extraOptions, apiClient) {
        try {
          const result = await apiClient({ url: '/api/user', method: 'POST', data: arg });
          const user = result.data as User;
          // eslint-disable-next-line no-underscore-dangle
          const formatedUser = { ...user, _id: user.userId };
          localStorage.setItem(ENGLISH_WORDS_APP_LOCALSTORAGE_USER_KEY, formatedUser.userId);
          queryApi.dispatch(setUser(formatedUser));
          return { data: ResponseDataStatus.success };
        } catch (error) {
          return { data: ResponseDataStatus.error };
        }
      },
    }),
  }),
});

// use with dispatch
export const resetUserApi = userApi.util.resetApiState;

export const { useCreateUserMutation } = userApi;
