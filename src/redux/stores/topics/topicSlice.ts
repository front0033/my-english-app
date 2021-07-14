import {gql} from 'graphql-request';
import {createApi} from '@reduxjs/toolkit/query/react';
import graphqlBaseQuery, {DEV_API_URL} from 'api/baseQuery';

export interface ITopic {
  id: string;
  name: string;
}

export interface GetTopicsResponse {
  topics: ITopic[];
}

interface TopicResponse {
  topic: ITopic;
}

export const topicSlice = createApi({
  baseQuery: graphqlBaseQuery({
    baseUrl: `${process.env.REACT_APP_WORDS_API_URL || DEV_API_URL}/graphql`,
  }),
  reducerPath: 'apiTopics',
  endpoints: builder => ({
    getTopics: builder.query<GetTopicsResponse, {}>({
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
    }),
    getTopic: builder.query<ITopic, string>({
      query: id => ({
        document: gql`
          query($id: ID!) {
            topic(id: $id) {
              id
              name
            }
          }
        `,
        variables: {id},
      }),
      transformResponse: (response: TopicResponse) => response.topic,
    }),
    addTopic: builder.mutation<ITopic, string>({
      query: name => ({
        document: gql`
          mutation($name: String!) {
            addTopic(name: $name) {
              id
              name
            }
          }
        `,
        variables: {name},
      }),
    }),
    updateTopic: builder.mutation<ITopic, ITopic>({
      query: ({id, name}) => ({
        document: gql`
          mutation($id: ID, $name: String) {
            updateTopic(id: $id, name: $name) {
              id
              name
            }
          }
        `,
        variables: {id, name},
      }),
    }),
    deleteTopic: builder.mutation<ITopic, string>({
      query: id => ({
        document: gql`
          mutation($id: ID) {
            deleteTopic(id: $id) {
              id
            }
          }
        `,
        variables: {id},
      }),
    }),
  }),
});

// TODO: update typescript
const useGetTopics = topicSlice.endpoints.getTopics.useQuery;
const useGetTopicByIdQuery = topicSlice.endpoints.getTopic.useQuery;
const useAddTopicMutation = topicSlice.endpoints.addTopic.useMutation;

export {useGetTopics, useGetTopicByIdQuery, useAddTopicMutation};
