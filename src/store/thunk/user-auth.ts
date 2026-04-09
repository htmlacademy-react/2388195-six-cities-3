import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { APIRoute } from '@/const';
import { saveToken, dropToken } from '@/services/token';
import { Login } from '@/types/login';
import { User } from '@/types/user';

export const checkAuth = createAsyncThunk<User, void, { extra: AxiosInstance }>(
  'auth/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<User>(APIRoute.Login);
    return data;
  },
);

export const login = createAsyncThunk<User, Login, { extra: AxiosInstance }>(
  'auth/login',
  async (body, { extra: api }) => {
    const { data } = await api.post<User>(APIRoute.Login, body);
    saveToken(data.token);
    return data;
  },
);

export const logout = createAsyncThunk<unknown, void, { extra: AxiosInstance }>(
  'auth/logout',
  async (_arg, { extra: api }) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
