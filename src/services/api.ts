import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {getToken} from './token';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  return api;
};


// В современных версиях axios (начиная с 1.x) использование типа
// AxiosRequestConfig внутри перехватчика запросов приводит к ошибке типизации,
// так как метод use ожидает тип InternalAxiosRequestConfig.
// Этот тип гарантирует, что объект конфигурации (включая заголовки) уже инициализирован.
