import { gql } from 'graphql-request';
import { createApi } from '@reduxjs/toolkit/query/react';
import graphqlBaseQuery from 'api/baseGraphqlQuery';
import { API_URL } from 'api/constant';

export interface ITopic {
  id: string;
  name: string;
}

interface IAddResponse {
  addTopic: ITopic;
}

interface IUpdateTopic {
  updateTopic: ITopic;
}

export interface GetTopicsResponse {
  topics: ITopic[];
}

interface TopicResponse {
  topic: ITopic;
}

type UserId = string;

export const topicSlice = createApi({
  baseQuery: graphqlBaseQuery({
    baseUrl: `${API_URL}/graphql`,
  }),
  tagTypes: ['Topic'],
  reducerPath: 'topicsApi',
  endpoints: (builder) => ({
    getTopics: builder.query<GetTopicsResponse['topics'], UserId>({
      query: (userId) => ({
        document: gql`
          query($userId: ID!) {
            topics(userId: $userId) {
              id
              name
            }
          }
        `,
        variables: { userId },
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Topic' as const, id })), { type: 'Topic', id: 'LIST' }]
          : [{ type: 'Topic', id: 'LIST' }],
      transformResponse: (response: GetTopicsResponse): GetTopicsResponse['topics'] =>
        [...(response.topics || [])].reverse(),
    }),
    getTopic: builder.query<ITopic, { id: string; userId: string }>({
      query: ({ id, userId }) => ({
        document: gql`
          query($id: ID!, $userId: ID!) {
            topic(id: $id, userId: $userId) {
              id
              name
            }
          }
        `,
        variables: { id, userId },
      }),
      providesTags: ['Topic'],
      transformResponse: (response: TopicResponse) => response.topic,
    }),
    addTopic: builder.mutation<IAddResponse['addTopic'], { name: string; userId: UserId }>({
      query: ({ name, userId }) => ({
        document: gql`
          mutation($name: String!, $userId: ID!) {
            addTopic(name: $name, userId: $userId) {
              id
              name
            }
          }
        `,
        variables: { name, userId },
      }),
      transformResponse: (response: IAddResponse) => response.addTopic,
      invalidatesTags: [{ type: 'Topic', id: 'LIST' }],
    }),
    updateTopic: builder.mutation<IUpdateTopic['updateTopic'], ITopic & { userId: UserId }>({
      query: ({ id, userId, name }) => ({
        document: gql`
          mutation($id: ID!, $name: String!, $userId: ID!) {
            updateTopic(id: $id, name: $name, userId: $userId) {
              id
              name
            }
          }
        `,
        variables: { id, userId, name },
      }),
      invalidatesTags: ['Topic'],
      transformResponse: (response: IUpdateTopic) => response.updateTopic,
    }),
    deleteTopic: builder.mutation<ITopic, string>({
      query: (id) => ({
        document: gql`
          mutation($id: ID) {
            deleteTopic(id: $id) {
              id
            }
          }
        `,
        variables: { id },
      }),
      invalidatesTags: ['Topic'],
    }),
  }),
});

export const {
  useGetTopicQuery,
  useGetTopicsQuery,
  useLazyGetTopicQuery,
  useLazyGetTopicsQuery,
  useAddTopicMutation,
  useUpdateTopicMutation,
  useDeleteTopicMutation,
} = topicSlice;
