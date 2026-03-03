import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { FullOffer, ServerOffer } from '../../types/offer';
import { APIRoute } from '../../const';
import { UserComments, UserComment } from '../../types';
// import { createAppAsyncThunk } from '../../hooks/store-hooks';

export const fetchAllOffers = createAsyncThunk<ServerOffer[], void, { extra: AxiosInstance}>(
  'fetchOffers/all',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<ServerOffer[]>(APIRoute.Offers);
    return data;
  }
);

// export const fetchAllOffers = createAppAsyncThunk<ServerOffer[], void>(
//   'fetchOffers/all',
//   async (_arg, {extra: api}) => {
//     const {data} = await api.get<ServerOffer[]>(APIRoute.Offers);
//     return data;
//   }
// );
// //проблема: Unsafe assignment of an `any` value.  видео 56:53

export const fetchOffer = createAsyncThunk<FullOffer, string, {extra: AxiosInstance}>
(
  'fetchOffers/offer',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  },
);

export const fetchNearby = createAsyncThunk<ServerOffer[], string, {extra: AxiosInstance}>
(
  'fetchOffers/nearby',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<ServerOffer[]>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  },
);

export const fetchComments = createAsyncThunk<UserComments, FullOffer['id'], {extra: AxiosInstance}>
(
  'fetchOffers/comments',
  async (offerId, {extra: api}) => {
    const {data} = await api.get<UserComments>(`${APIRoute.Offers}/${offerId}`);
    return data;
  },
);

interface PostCommentProps {
  body: {
    comment: string;
    rating: number;
  };
  offerId: FullOffer['id'];
}

export const postComment = createAsyncThunk<UserComment, PostCommentProps, {extra: AxiosInstance}>
(
  'comments/post',
  async ({body, offerId}, {extra: api}) => {
    const {data} = await api.post<UserComment>(`${APIRoute.Offers}/${offerId}`, body);
    return data;
  },
);

// export const postComment = createAsyncThunk<UserComment, void, {extra: AxiosInstance}>
// (
//   'fetchOffers/comments',
//   async (_arg, {extra: api}) => {
//     const {data} = await api.get<UserComment>(APIRoute.Offers);
//     return data;
//   },
// );

//createAsyncThunk<ReturnType, ArgType, ConfigType>
// ServerOffer[] — тип возвращаемого значения (payload) при успешном выполнении thunk'а

// void — тип аргумента, который передаётся при вызове thunk'а  void означает "ничего не передаётся"
// Можно вызывать как dispatch(fetchAllOffers()) без параметров

// {extra: AxiosInstance} — конфигурация thunk'аГоворит TypeScript, что в thunkAPI будет поле extra типа AxiosInstance
// Это нужно для типизации {extra: api} в колбэке
/////////////////////////////////////////////////////////////////////////////////////

//ServerOffer[] - возвращаемое значение из функции payload creator(async (_arg, {extra: api}) => {
//   const {data} = await api.get<ServerOffer[]>(APIRoute.Offers);
//   return data;
// },),

// undefined - типизация входящих параметров в функцию fetchAllOffers, ничего не передаём,
// можно писать void вместо undefined, т.е. фактически _arg - вот оно это значение

// {extra: AxiosInstance} - типизация extra reducer


//console.dir(fetchAllOffers)

//функция createAsyncThunk является функцией у которой есть свойства // методы:
//fulfilled
//pending
//rejected
//под этимим свойствами хранятся обычные синхронные экшены actionCreator и автоматически диспатчатся

//2 раза срабатывает, потому что работает strict mode - 2 раза рендерит код компоннета проверяя на то, что он является чистой функцией,
// после этого он 2 раза вызывает useEffect,
//т.к. диспатч этого метода fetchAllOffers происходит в useEffect, поэтому мы видим в консоли 2 раза

//fetchAllOffers функция принимает название асинхронного экшена 'fetchOffers/all' - это название мы будем видеть в reduxDevTools
// и функцию payload creator - ее основная задача вернуть payload (return...) - этот payload будет попадать в обработчики этих синхронных экшенов:
//fulfilled
//pending
//rejected, это будет происходить:
// когда мы описываем срез (slice) мы можем описать блок extraReducers
//createAsyncThunk - это внешняя библиотека, которая работает как middleware, поэтому обработка всех событий, диспатчей происходит в extraReducers и
// обрабатываются с помощью функции builder
//

//fetchAllOffers - возвращает то, что попадает в срезе в переменную state.offers = action.payload;

//поэтому функция async (_arg, {extra: api}) => {
//   const {data} = await api.get<ServerOffer[]>(APIRoute.Offers);
//   return data;
// }, --- называется payload creator - эта функция в качестве первого аргумента получает то,
// что мы передаем во время диспатча функции fetchAllOffers() - в нашем случае она пустая поэтому _arg
//{extra: api} - по умолчанию парметр называется extra но мы при диструктуризации его переименовываем
//в эту переменную extra нам приходят данные из настроек thunk configureStore thunk: {
//   extraArgument: api,
// },

// const {data} = await api.get<ServerOffer[]>(APIRoute.Offers);
//запрос отправляется и ответ вернется с типом, указанным в джененрике <ServerOffer[]> и указываются данные куда отправляем


////////////////////////
// export const fetchAllOffers = createAsyncThunk<void, undefined, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>
// (
//   'data/fetchQuestions',
//   async (_arg, {dispatch, extra: api}) => {
//     const {data} = await api.get<Questions>(APIRoute.Questions);
//     dispatch(loadQuestions(data));
//   },
// );
// export const checkAuthAction = createAsyncThunk<void, undefined, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'user/checkAuth',
//   async (_arg, {dispatch, extra: api}) => {
//     try {
//       await api.get(APIRoute.Login);
//       dispatch(requireAuthorization(AuthorizationStatus.Auth));
//     } catch {
//       dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
//     }
//   },
// );

// export const loginAction = createAsyncThunk<void, AuthData, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'user/login',
//   async ({login: email, password}, {dispatch, extra: api}) => {
//     const {data: {token}} = await api.post<UserData>(APIRoute.Login, {email, password});
//     saveToken(token);
//     dispatch(requireAuthorization(AuthorizationStatus.Auth));
//   },
// );

// export const logoutAction = createAsyncThunk<void, undefined, {
//   dispatch: AppDispatch;
//   state: State;
//   extra: AxiosInstance;
// }>(
//   'user/logout',
//   async (_arg, {dispatch, extra: api}) => {
//     await api.delete(APIRoute.Logout);
//     dropToken();
//     dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
//   },
// );

