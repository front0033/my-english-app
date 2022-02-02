import { createApi } from '@reduxjs/toolkit/query/react';
import baseApiClient, { PROXY_URL, ResponseDataStatus } from 'api/baseApiClient';
import { IProfile, setProfile } from './userProfileSlice';

export interface ProfileRequest {
  userId: string;
}

export type PostProfileRequest = Pick<IProfile, 'firstName' | 'lastName' | 'username'>;

export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseApiClient({ baseUrl: PROXY_URL }),
  endpoints: (builder) => ({
    // создаем новый профиль для юзера или обновляем его
    createOrUpdate: builder.mutation<ResponseDataStatus, PostProfileRequest>({
      async queryFn(arg, queryApi, _extraOptions, apiClient) {
        try {
          const result = await apiClient({ url: '/api/profile/', method: 'POST', data: arg });
          queryApi.dispatch(setProfile(result.data as IProfile));
          return { data: ResponseDataStatus.success };
        } catch (error) {
          return { data: ResponseDataStatus.error };
        }
      },
    }),
    // получаем все профили
    getAllProfiles: builder.query<IProfile[], void>({
      query: () => ({
        url: '/api/profile',
        method: 'GET',
      }),
    }),
    // получаем профиль юзера по userId
    getProfileByUserId: builder.query<ResponseDataStatus, ProfileRequest>({
      async queryFn(arg, queryApi, _extraOptions, apiClient) {
        try {
          const result = await apiClient({ url: '/api/profile/me', method: 'GET', params: arg });
          queryApi.dispatch(setProfile(result.data as IProfile));
          return { data: ResponseDataStatus.success };
        } catch (error) {
          return { data: ResponseDataStatus.error };
        }
      },
    }),
    // удаляем профиль юзера по userId
    deleteProfile: builder.query<IProfile, ProfileRequest>({
      query: (data) => ({
        url: '/api/profile',
        method: 'DELETE',
        data,
      }),
    }),
  }),
});

// use with dispatch
export const resetProfileApi = profileApi.util.resetApiState;

export const {
  useCreateOrUpdateMutation,
  useGetAllProfilesQuery,
  useGetProfileByUserIdQuery,
  useLazyGetProfileByUserIdQuery,
  useDeleteProfileQuery,
} = profileApi;
