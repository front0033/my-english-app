import {gql} from 'graphql-request';
import {createApi} from '@reduxjs/toolkit/query/react';
import graphqlBaseQuery, {DEV_API_URL} from 'api/baseQuery';
import {ITopic} from '../topics/topicSlice';

export interface INewWord {
  word: string;
  translate: string;
  example: string;
  topicId: string;
}

export interface IWord {
  id: string;
  word: string;
  translate: string;
  example: string;
  topic: ITopic;
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
  tagTypes: ['Word'],
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
      providesTags: ['Word'],
    }),
    getWord: builder.query<IWord, string>({
      query: id => ({
        document: gql`
          query($id: ID!) {
            word(id: $id) {
              id
              word
              translate
              example
              topic {
                id
              }
            }
          }
        `,
        variables: {id},
      }),
      providesTags: ['Word'],
      transformResponse: (response: WordResponse) => response.word,
    }),
    addWord: builder.mutation<IWord, INewWord>({
      query: params => {
        const {word, translate, example, topicId} = params;

        return {
          document: gql`
            mutation($word: String, $translate: String, $example: String, $topicId: ID) {
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
          variables: {word, translate, example, topicId},
        };
      },
    }),
    updateWord: builder.mutation<IWord, Pick<IWord, 'id' | 'word' | 'example' | 'translate'> & {topicId: string}>({
      query: params => {
        const {id, word, translate, example, topicId} = params;

        return {
          document: gql`
            mutation($id: ID, $word: String, $translate: String, $example: String, $topicId: ID) {
              updateWord(id: $id, word: $word, translate: $translate, example: $example, topicId: $topicId) {
                id
              }
            }
          `,
          variables: {id, word, translate, example, topicId},
        };
      },
      invalidatesTags: ['Word'],
    }),
    deleteWord: builder.mutation<IWord, string>({
      query: id => {
        return {
          document: gql`
            mutation($id: ID) {
              deleteWord(id: $id) {
                id
              }
            }
          `,
          variables: {id},
        };
      },
    }),
  }),
});

// TODO: update typescript
const useGetWordByIdQuery = wordSlice.endpoints.getWord.useQuery;
const useRefetchWord = wordSlice.endpoints.getWord.useQuerySubscription;
const useGetWordsByTopicId = wordSlice.endpoints.getWordsByTopicId.useQuery;
const useAddWordMutation = wordSlice.endpoints.addWord.useMutation;
const useUpdateWordMutation = wordSlice.endpoints.updateWord.useMutation;
const useDeleteWordMutation = wordSlice.endpoints.deleteWord.useMutation;
const useDeleteWordById = wordSlice.endpoints.deleteWord.useMutation;

export {
  useGetWordByIdQuery,
  useGetWordsByTopicId,
  useAddWordMutation,
  useUpdateWordMutation,
  useDeleteWordMutation,
  useRefetchWord,
  useDeleteWordById,
};
