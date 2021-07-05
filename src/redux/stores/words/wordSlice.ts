import {gql} from 'graphql-request';
import {createApi} from '@reduxjs/toolkit/query/react';
import graphqlBaseQuery, {DEV_API_URL} from 'api/baseQuery';

export interface IWord {
  word: string;
  translate: string;
  expample: string;
  topicId: string;
}

export interface GetWordsResponse {
  wordsByTopicId: IWord[];
}

interface WordResponse {
  word: IWord;
}

export const wordSlice = createApi({
  baseQuery: graphqlBaseQuery({
    baseUrl: `${process.env.REACT_APP_WORDS_API_URL || DEV_API_URL}/graphql`,
  }),
  reducerPath: 'apiWords',
  endpoints: builder => ({
    getWordsByTopicId: builder.query<GetWordsResponse, string>({
      query: topicId => ({
        document: gql`
          query($topicId: ID) {
            wordsByTopicId(topicId: $topicId) {
              id
              word
              translate
              example
            }
          }
        `,
        variables: {topicId},
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
    addWord: builder.mutation<IWord, IWord>({
      query: params => {
        const {word, translate, expample, topicId} = params;

        return {
          document: gql`
            mutation($word: String, $translate: String, $example: String, $topicId: String) {
              addWord(word: $word, translate: $translate, example: $example, topicId: $topicId) {
                word
                translate
                example
                topic {
                  name
                }
              }
            }
          `,
          variables: {word, translate, expample, topicId},
        };
      },
    }),
  }),
});

// TODO: update typescript
const useGetWordByIdQuery = wordSlice.endpoints.getWord.useQuery;
const usegetWordsByTopicId = wordSlice.endpoints.getWordsByTopicId.useQuery;
const useAddWordMutation = wordSlice.endpoints.addWord.useMutation;

export {useGetWordByIdQuery, usegetWordsByTopicId, useAddWordMutation};
