import axios, {AxiosInstance, InternalAxiosRequestConfig} from 'axios';
import {getToken} from './token';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';


//сделать через переменную окружения
export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });


  //Перехватчики. Когда мы будем отправлять запросы...
  // некоторые из этих запросов требуют заголовка с содержимым токена,
  // т.е это запрос на добавление в избранное, и проч которые требуют токен для идентификации пользователя.
  //Чтобы это не делать внутри каждого запроса, мы это делаем сразу для всех запросов
  //т.е. мы перехватываем все запросы и подключаем к заголовку токен. Токен забираем с помощью функции getToken()


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
