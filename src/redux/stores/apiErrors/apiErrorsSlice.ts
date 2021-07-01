import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import moduleName from './constants';
import {IErrorsData, IError} from './types';

const apiErrorsSlice = createSlice({
  name: moduleName,
  initialState: {
    items: {} as IErrorsData['items'],
  },
  reducers: {
    setError(state, {payload}: PayloadAction<{error: IError}>) {
      return {
        items: {...state.items, [payload.error.name]: payload.error.message},
      };
    },
    resetError(state, {payload}: PayloadAction<{errorName: string}>) {
      const newErrors = {...state.items};
      delete newErrors[payload.errorName];

      return {items: newErrors};
    },
    resetErrors() {
      return {items: {}};
    },
  },
});

export const {setError, resetErrors} = apiErrorsSlice.actions;

export default apiErrorsSlice.reducer;
