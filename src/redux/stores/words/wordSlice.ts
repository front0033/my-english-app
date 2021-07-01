import {gql} from 'graphql-request';
import {createApi} from '@reduxjs/toolkit/query/react';
import graphqlBaseQuery, {DEV_API_URL} from 'api/baseQuery';

export interface IWord {
  word: string;
  translate: string;
  expample?: string;
  topicId?: string;
}

export interface GetWordsResponse {
  words: IWord[];
}

interface WordResponse {
  word: IWord;
}

export const wordSlice = createApi({
  baseQuery: graphqlBaseQuery({
    baseUrl: process.env.REACT_APP_WORDS_API_URL || DEV_API_URL,
  }),
  reducerPath: 'apiWords',
  endpoints: builder => ({
    getWords: builder.query<GetWordsResponse, {}>({
      query: () => ({
        document: gql`
          query {
            words {
              id
              word
              translate
            }
          }
        `,
        variables: {},
      }),
    }),
    getWord: builder.query<IWord, string>({
      query: id => ({
        document: gql`
        query ($id: ID!) {
          word(id: ${id}) {
            id
            word
            translate
            example
          }
        }
        `,
      }),
      transformResponse: (response: WordResponse) => response.word,
    }),
  }),
});

// TODO: update typescript
const useGetWordByIdQuery = wordSlice.endpoints.getWord.useQuery;
const useGetWordsByIdQuery = wordSlice.endpoints.getWords.useQuery;

export {useGetWordByIdQuery, useGetWordsByIdQuery};
