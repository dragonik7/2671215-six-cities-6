// src/store/user/user.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthorizationStatus } from '../../const';

export interface UserState {
  authorizationStatus: AuthorizationStatus;
  email: string | null;
  avatarUrl: string | null;
}

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  email: null,
  avatarUrl: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthorizationStatus(state, action: PayloadAction<AuthorizationStatus>) {
      state.authorizationStatus = action.payload;
    },
    setUserInfo(state, action: PayloadAction<{ email: string; avatarUrl: string }>) {
      state.email = action.payload.email;
      state.avatarUrl = action.payload.avatarUrl;
    },
    logoutAction(state) {
      state.authorizationStatus = AuthorizationStatus.NoAuth;
      state.email = null;
      state.avatarUrl = null;
    },
  },
});

export const {
  setAuthorizationStatus,
  setUserInfo,
  logoutAction,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
