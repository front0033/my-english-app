import { createApi } from '@reduxjs/toolkit/query/react';
import baseApiClient, { PROXY_URL, ResponseDataStatus } from 'api/baseApiClient';
import X_CONNECT_LOCALSTORAGE_USER_KEY from 'components/AccessNavigator/constants';
import { User, resetUserApi } from '../user/userApi';
import { resetProfileApi } from '../userProfile/userProfileApi';
import { IProfile, resetProfile, setProfile, setUser } from '../userProfile/userProfileSlice';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface GetUserRequest {
  userId: string;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseApiClient({ baseUrl: PROXY_URL }),
  endpoints: (builder) => ({
    // получаем инфу о user
    getUser: builder.query<ResponseDataStatus, GetUserRequest>({
      async queryFn(arg, queryApi, _extraOptions, apiClient) {
        try {
          const result = await apiClient({ url: '/api/auth', method: 'GET', params: arg });
          const user = result.data as User;
          // eslint-disable-next-line no-underscore-dangle
          const formatedUser = { ...user, userId: user._id };
          const { userId } = formatedUser;
          localStorage.setItem(X_CONNECT_LOCALSTORAGE_USER_KEY, userId);
          queryApi.dispatch(setUser(formatedUser));

          const profileResult = await apiClient({ url: '/api/profile/me', method: 'GET', params: { userId } });
          const profile = profileResult.data as IProfile;

          // eslint-disable-next-line no-underscore-dangle
          const formatedProfile = { ...(profile || {}), user: { ...user, userId: user._id } };
          queryApi.dispatch(setProfile(formatedProfile));
          return { data: ResponseDataStatus.success };
        } catch (error) {
          return { data: ResponseDataStatus.error };
        }
      },
    }),
    // авторизируемся по логину и паролю
    login: builder.query<ResponseDataStatus, LoginRequest>({
      async queryFn(arg, queryApi, _extraOptions, apiClient) {
        try {
          const userResult = await apiClient({ url: '/api/auth', method: 'POST', data: arg });
          const user = userResult.data as User;
          // eslint-disable-next-line no-underscore-dangle
          const formatedUser = { ...user, userId: user._id };
          const { userId } = formatedUser;
          localStorage.setItem(X_CONNECT_LOCALSTORAGE_USER_KEY, userId);
          queryApi.dispatch(setUser(formatedUser));

          const profileResult = await apiClient({ url: '/api/profile/me', method: 'GET', params: { userId } });
          const profile = profileResult.data as IProfile;

          // eslint-disable-next-line no-underscore-dangle
          const formatedProfile = { ...(profile || {}), user: { ...user, userId: user._id } };

          queryApi.dispatch(setProfile(formatedProfile));
          return { data: ResponseDataStatus.success };
        } catch (error) {
          return { data: ResponseDataStatus.error };
        }
      },
    }),
    logout: builder.query<ResponseDataStatus, void>({
      async queryFn(arg, queryApi, _extraOptions, apiClient) {
        try {
          await apiClient({ url: '/api/auth/logout', method: 'GET' });
          localStorage.removeItem(X_CONNECT_LOCALSTORAGE_USER_KEY);
          queryApi.dispatch(resetProfile());
          queryApi.dispatch(resetUserApi());
          queryApi.dispatch(resetProfileApi());

          return { data: ResponseDataStatus.success };
        } catch (error) {
          return { data: ResponseDataStatus.error };
        }
      },
    }),
  }),
});

// use with dispatch
export const resetAuthApi = authApi.util.resetApiState;

export const { useGetUserQuery, useLazyGetUserQuery, useLazyLoginQuery, useLoginQuery, useLazyLogoutQuery } = authApi;
