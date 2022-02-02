import { createApi } from '@reduxjs/toolkit/query/react';
import { gql } from 'graphql-request';
import { ResponseDataStatus } from 'api/baseApiClient';
import baseGraphqlQuery, { DEV_API_URL } from 'api/baseGraphqlQuery';
import { IProfile, setProfile } from './userProfileSlice';

export interface ProfileRequest {
  userId: string;
}

export type PostProfileRequest = Pick<IProfile, 'firstName' | 'lastName' | 'username'>;
// TODO: меняем на graphql
export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: baseGraphqlQuery({ baseUrl: `${process.env.REACT_APP_WORDS_API_URL || DEV_API_URL}/graphql` }),
  endpoints: (builder) => ({
    // создаем новый профиль для юзера или обновляем его
    createOrUpdate: builder.mutation<ResponseDataStatus, PostProfileRequest>({
      async queryFn({ firstName, lastName, username }, queryApi, _extraOptions, apiClient) {
        const { profile } = queryApi.getState() as { profile: IProfile };
        try {
          const result = await apiClient({
            document: gql`
              mutation($userId: ID!, $firstName: String!, $lastName: String!, $username: String!) {
                createProfile(userId: $userId, firstName: $firstName, lastName: $lastName, username: $username) {
                  firstName
                  lastName
                  username
                  user {
                    id
                  }
                }
              }
            `,
            variables: { userId: profile.user.userId, firstName, lastName, username },
          });
          queryApi.dispatch(setProfile(result.data as IProfile));
          return { data: ResponseDataStatus.success };
        } catch (error) {
          return { data: ResponseDataStatus.error };
        }
      },
    }),
    // получаем профиль юзера по userId
    getProfileByUserId: builder.query<ResponseDataStatus, ProfileRequest>({
      async queryFn({ userId }, queryApi, _extraOptions, apiClient) {
        try {
          const result = await apiClient({
            document: gql`
              query($userId: ID!) {
                getMe(userId: $userId) {
                  firstName
                  lastName
                  username
                  user {
                    id
                  }
                }
              }
            `,
            variables: { userId },
          });
          queryApi.dispatch(setProfile(result.data as IProfile));
          return { data: ResponseDataStatus.success };
        } catch (error) {
          return { data: ResponseDataStatus.error };
        }
      },
    }),
    // удаляем профиль юзера по userId
    deleteProfile: builder.query<IProfile, ProfileRequest>({
      query: ({ userId }) => ({
        document: gql`
          mutation($userId: ID!) {
            deleteProfile(userId: $userId) {
              user {
                id
              }
            }
          }
        `,
        variables: { userId },
      }),
    }),
  }),
});

// use with dispatch
export const resetProfileApi = profileApi.util.resetApiState;

export const {
  useCreateOrUpdateMutation,
  useGetProfileByUserIdQuery,
  useLazyGetProfileByUserIdQuery,
  useDeleteProfileQuery,
} = profileApi;
