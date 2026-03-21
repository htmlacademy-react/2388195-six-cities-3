import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getToken } from './token';
import { REQUEST_TIMEOUT } from '../const';
// import { BACKEND_URL } from '../const';

//через переменную окружения
const BACKEND_URL = import.meta.env.VITE_API_URL;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  return api;
};

///////////////////////////////////////////////////////

//Перехватчики. interceptors
// При отправке запросов некоторые из них требуют заголовка с содержимым токена,
// т.е это запрос на добавление в избранное, и проч которые требуют токен для идентификации пользователя.
//Для удобства перехватываем все запросы и подключаем к заголовку токен сразу для всех запросов.
// Токен забираем с помощью функции getToken()

///////////////////////////////////////////////////////
// В контексте разработки на React и Redux, API (Application Programming Interface)
// обычно представляет собой отдельный слой приложения, отвечающий за взаимодействие с сервером.

// Зачем выносить API в отдельный слой?
// Вынос логики запросов в отдельные файлы позволяет разделять ответственность:
// компоненты или thunk'и не должны знать детали реализации HTTP-запросов
// (например, заголовки, базовый URL или логику обработки ошибок).

// Настройка API с помощью axios
// Обычно в проектах создается экземпляр (instance) с предустановленными настройками:

// // services/api.ts
// import axios, { AxiosInstance } from 'axios';

// const BACKEND_URL = 'https://api.example.com';
// const REQUEST_TIMEOUT = 5000;

// export const createAPI = (): AxiosInstance => {
//   const api = axios.create({
//     baseURL: BACKEND_URL,
//     timeout: REQUEST_TIMEOUT,
//   });

//   // Можно добавить интерцепторы (interceptors)
//   // для автоматической подстановки токена в каждый запрос
//   api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token && config.headers) {
//       config.headers['x-token'] = token;
//     }
//     return config;
//   });

//   return api;
// };

// Передача API в Redux (через extraArgument)
// При настройке хранилища (store) экземпляр API передается в thunkMiddleware. Это позволяет использовать api внутри createAsyncThunk без прямого импорта.

// // store/index.ts
// const api = createAPI();

// export const store = configureStore({
//   reducer: rootReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       thunk: {
//         extraArgument: api, // API прокидывается во все thunk'и
//       },
//     }),
// });

// Использование в createAsyncThunk
// Теперь внутри thunk-функции api доступен во втором аргументе (thunkAPI) в поле extra:

// export const fetchOffersAction = createAsyncThunk<Offer[], undefined, { extra: AxiosInstance }>(
//   'data/fetchOffers',
//   async (_arg, { extra: api }) => {
//     // Выполняем запрос через полученный экземпляр api
//     const { data } = await api.get<Offer[]>('/offers');
//     return data;
//   },
// );

////////////////////////////////////////////////////////////////////////
