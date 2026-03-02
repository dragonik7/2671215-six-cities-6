// src/services/api.ts

import axios from 'axios';
import {dropToken, getToken} from './token.ts';
import {StatusCodes} from 'http-status-codes';

export const api = axios.create({
  baseURL: 'https://14.design.htmlacademy.pro',
  timeout: 5000,
});

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers['X-Token'] = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === StatusCodes.UNAUTHORIZED) {
      dropToken();
    }
    return Promise.reject(error);
  }
);
