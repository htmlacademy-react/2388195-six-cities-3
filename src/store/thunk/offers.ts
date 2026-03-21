import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ListOffers } from '../../types/offer';
import { APIRoute } from '../../const';

export const fetchAllOffers = createAsyncThunk<ListOffers, void, { extra: AxiosInstance }>(
  'fetchAllOffers',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<ListOffers>(APIRoute.Offers);
    return data;
  },
);

/////////////////////////////////////
// createAsyncThunk — это функция из библиотеки Redux Toolkit для создания асинхронных thunk'ов (действий).

// Основное назначение:
// Упрощает работу с асинхронными операциями (API-запросы, async/await)
// Автоматически создаёт 3 действия: pending, fulfilled, rejected
// Возвращает готовый thunk для Redux store

// Синтаксис:
// const myThunk = createAsyncThunk<ReturnType, ArgType, ThunkOptions>(
//   'slice/actionName',           // тип действия (строка)
//   async (arg, thunkAPI) => {    // payload creator
//     const response = await api.fetch(arg);
//     return response.data;
//   }
// );

// Что происходит автоматически:

// pending   → состояние загрузки
// fulfilled → успех + данные
// rejected  → ошибка

// API - Application Programming Interface) обычно представляет собой отдельный слой приложения, отвечающий за взаимодействие с сервером.
////////////////////////////////////

//createAsyncThunk<ReturnType, ArgType, ConfigType>
// ListOffer[] — тип возвращаемого значения (payload) при успешном выполнении thunk'а

// void — тип аргумента, который передаётся при вызове thunk'а  void означает "ничего не передаётся"
// Можно вызывать как dispatch(fetchAllOffers()) без параметров

// {extra: AxiosInstance} — конфигурация thunk'аГоворит TypeScript, что в thunkAPI будет поле extra типа AxiosInstance
// Это нужно для типизации {extra: api} в колбэке
/////////////////////////////////////////////////////////////////////////////////////

//ListOffer[] - возвращаемое значение из функции payload creator(async (_arg, {extra: api}) => {
//   const {data} = await api.get<ListOffer[]>(APIRoute.Offers);
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
//   const {data} = await api.get<ListOffer[]>(APIRoute.Offers);
//   return data;
// }, --- называется payload creator - эта функция в качестве первого аргумента получает то,
// что мы передаем во время диспатча функции fetchAllOffers() - в нашем случае она пустая поэтому _arg
//{extra: api} - по умолчанию парметр называется extra но мы при диструктуризации его переименовываем
//в эту переменную extra нам приходят данные из настроек thunk configureStore thunk: {
//   extraArgument: api,
// },

// const {data} = await api.get<ListOffer[]>(APIRoute.Offers);
//запрос отправляется и ответ вернется с типом, указанным в джененрике <ListOffer[]> и указываются данные куда отправляем
////////////////////////
