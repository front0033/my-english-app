import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { setError } from 'redux/stores/apiErrors/apiErrorsSlice';

export enum ResponseDataStatus {
  success = 'success',
  error = 'error',
}

export const statusErrors: Record<string | number, string> = {
  401: 'Ошибка авторизации (401)',
  403: 'Ошибка авторизации (403)',
  404: 'Запрашиваемый ресурс не найден',
  502: 'Сервис недоступен (502)',
  503: 'Сервис недоступен (503)',
  504: 'Время ожидания ответа превышено (504)',
  network: 'Сервер не ответил, вероятно, проблемы с сетью',
  default: 'Неизвестная сетевая ошибка',
};

export interface IServerError {
  data?: {
    errors?: Array<{ msg: string }>;
  };
}

const baseApiClient = (
  { baseUrl }: { baseUrl: string } = { baseUrl: '' }
): BaseQueryFn<
  {
    url: string;
    method: any;
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    headers?: AxiosRequestConfig['headers'];
    responseType?: AxiosRequestConfig['responseType'];
    skipError?: boolean;
  },
  unknown,
  unknown
> => async ({ url, method, data, params, headers, responseType, skipError }, api) => {
  try {
    const result = await axios({
      url: baseUrl + url,
      method,
      data,
      params,
      headers,
      responseType,
    });
    return { data: result.data };
  } catch (axiosError) {
    const err = axiosError as AxiosError;
    const errorMessage = statusErrors[err.response?.status || ''] || statusErrors.default;

    if (!skipError) {
      api.dispatch(
        setError({
          error: {
            name: String(err.response?.status) ?? 'server error',
            message: errorMessage,
          },
        })
      );
    }

    return {
      error: { status: err.response?.status, data: err.response?.data },
    };
  }
};

export default baseApiClient;
