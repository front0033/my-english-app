import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface ITranslateParams {
  q: string;
  source: string;
  target: string;
}

interface ITranslateResponse {
  translatedText: string;
}

const LIBRE_TRANSLATE_URL = 'https://libretranslate.com';

export const translateApi = createApi({
  reducerPath: 'translateApi',
  baseQuery: fetchBaseQuery({ method: 'POST', baseUrl: LIBRE_TRANSLATE_URL }),
  endpoints: (builder) => ({
    getTranslate: builder.query<ITranslateResponse, ITranslateParams>({
      query: (body) => ({
        url: `/translate`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useLazyGetTranslateQuery } = translateApi;
