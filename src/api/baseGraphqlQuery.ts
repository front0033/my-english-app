import { DocumentNode } from 'graphql';
import { ClientError, request } from 'graphql-request';
import { BaseQueryFn } from '@reduxjs/toolkit/query/react';

export const DEV_API_URL = '/words';

const graphqlBaseQuery = ({
  baseUrl,
}: {
  baseUrl: string;
}): BaseQueryFn<{ document: string | DocumentNode; variables?: any }, unknown, ClientError> => async ({
  document,
  variables,
}) => {
  try {
    return { data: await request(baseUrl, document, variables) };
  } catch (error) {
    if (error instanceof ClientError) {
      return { error };
    }
    throw error;
  }
};

export default graphqlBaseQuery;
