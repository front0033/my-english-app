import {DocumentNode} from 'graphql';
import {ClientError, request, gql} from 'graphql-request';
import {BaseQueryFn, createApi} from '@reduxjs/toolkit/query/react';

export interface IWord {
  word: string;
  translate: string;
  expample?: string;
  topicId?: string;
}

export interface GetWordsResponse {
  data: {
    words: IWord[];
  };
}

interface WordResponse {
  data: {
    word: IWord;
  };
}

export const graphqlBaseQuery = ({
  baseUrl,
}: {
  baseUrl: string;
}): BaseQueryFn<{document: string | DocumentNode; variables?: any}, unknown, ClientError> => async ({
  document,
  variables,
}) => {
  try {
    return {data: await request(baseUrl, document, variables)};
  } catch (error) {
    if (error instanceof ClientError) {
      return {error};
    }
    throw error;
  }
};

export const wordSlice = createApi({
  baseQuery: graphqlBaseQuery({
    baseUrl: 'http://localhost:5000/graphql',
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
      transformResponse: (response: WordResponse) => response.data.word,
    }),
  }),
});

// TODO: update typescript
const useGetWordByIdQuery = wordSlice.endpoints.getWord.useQuery;
const useGetWordsByIdQuery = wordSlice.endpoints.getWords.useQuery;

export {useGetWordByIdQuery, useGetWordsByIdQuery};
