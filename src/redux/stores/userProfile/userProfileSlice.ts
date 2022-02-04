/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface IProfile {
  user: {
    avatar: string;
    email: string;
    userId: string;
    _id: string;
  };
  firstName: string;
  lastName: string;
  username: string;
  date: string;
  _id: string;
}

export const profileReducerPath = 'profile';

const profileSlice = createSlice({
  name: profileReducerPath,
  initialState: { userProfile: null as Partial<IProfile> | null },
  reducers: {
    setUser: (state, { payload }: { payload: IProfile['user'] }) => {
      state.userProfile = { ...state.userProfile, user: payload };
    },
    setProfile: (state, { payload }: { payload: Partial<IProfile> }) => {
      const stateUser = state.userProfile?.user ?? null;
      const userProfile = {
        ...payload,
        user: stateUser || payload.user,
      };
      state.userProfile = userProfile;
    },
    resetProfile: (state) => {
      state.userProfile = null;
    },
  },
});

export const { setUser, setProfile, resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
