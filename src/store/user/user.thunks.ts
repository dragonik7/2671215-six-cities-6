// src/store/user/user.thunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { AuthorizationStatus } from '../../const';
import {dropToken, saveToken} from '../../services/token';
import { setAuthorizationStatus, setUserInfo, logoutAction } from './user.slice';
import {AuthInfoWithToken, LoginData} from '../../types/types.ts';

export const checkAuth = createAsyncThunk<
    AuthInfoWithToken,
    void,
    { extra: AxiosInstance }
>('user/checkAuth', async (_, { dispatch, extra: api }) => {
  const { data } = await api.get<AuthInfoWithToken>('/six-cities/login');

  saveToken(data.token);

  dispatch(setUserInfo({
    email: data.email,
    avatarUrl: data.avatarUrl,
  }));

  dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));

  return data;
});


export const login = createAsyncThunk<
    AuthInfoWithToken,
    LoginData,
    { extra: AxiosInstance }
>('user/login', async ({ email, password }, { dispatch, extra: api }) => {
  const { data } = await api.post<AuthInfoWithToken>(
    '/six-cities/login',
    { email, password }
  );

  saveToken(data.token);

  dispatch(setUserInfo({
    email: data.email,
    avatarUrl: data.avatarUrl,
  }));

  dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));

  return data;
});

export const logout = createAsyncThunk<
    void,
    void,
    { extra: AxiosInstance }
>('user/logout', async (_, { dispatch, extra: api }) => {
  await api.delete('/six-cities/logout');

  dropToken();

  dispatch(logoutAction());
  dispatch({ type: 'user/setAuthorizationStatus', payload: AuthorizationStatus.NoAuth });
});
