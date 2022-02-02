import { gql } from 'graphql-request';
import { createApi } from '@reduxjs/toolkit/query/react';
import graphqlBaseQuery, { DEV_API_URL } from 'api/baseGraphqlQuery';

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

export const topicSlice = createApi({
  baseQuery: graphqlBaseQuery({
    baseUrl: `${DEV_API_URL}/graphql`,
  }),
  tagTypes: ['Topic'],
  reducerPath: 'topicsApi',
  endpoints: (builder) => ({
    getTopics: builder.query<GetTopicsResponse['topics'], {}>({
      query: () => ({
        document: gql`
          query {
            topics {
              id
              name
            }
          }
        `,
        variables: {},
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Topic' as const, id })), { type: 'Topic', id: 'LIST' }]
          : [{ type: 'Topic', id: 'LIST' }],
      transformResponse: (response: GetTopicsResponse): GetTopicsResponse['topics'] =>
        [...(response.topics || [])].reverse(),
    }),
    getTopic: builder.query<ITopic, string>({
      query: (id) => ({
        document: gql`
          query($id: ID!) {
            topic(id: $id) {
              id
              name
            }
          }
        `,
        variables: { id },
      }),
      providesTags: ['Topic'],
      transformResponse: (response: TopicResponse) => response.topic,
    }),
    addTopic: builder.mutation<IAddResponse['addTopic'], string>({
      query: (name) => ({
        document: gql`
          mutation($name: String!) {
            addTopic(name: $name) {
              id
              name
            }
          }
        `,
        variables: { name },
      }),
      transformResponse: (response: IAddResponse) => response.addTopic,
      invalidatesTags: [{ type: 'Topic', id: 'LIST' }],
    }),
    updateTopic: builder.mutation<IUpdateTopic['updateTopic'], ITopic>({
      query: ({ id, name }) => ({
        document: gql`
          mutation($id: ID, $name: String) {
            updateTopic(id: $id, name: $name) {
              id
              name
            }
          }
        `,
        variables: { id, name },
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
