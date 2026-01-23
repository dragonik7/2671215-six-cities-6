// src/services/api.ts

import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://14.design.htmlacademy.pro',
  timeout: 5000,
});
