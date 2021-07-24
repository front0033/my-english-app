/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ITopicState {
  topicId: string | false;
}
const initialState: ITopicState = {
  topicId: false,
};

export const topicReducerName = 'topic';

export const topicSlice = createSlice({
  name: topicReducerName,
  initialState,
  reducers: {
    setTopicId: (state: ITopicState, action: PayloadAction<ITopicState['topicId']>) => {
      state.topicId = action.payload;
    },
  },
});

export const { setTopicId } = topicSlice.actions;

export default topicSlice.reducer;
