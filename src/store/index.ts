import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers-slice';
import {createAPI} from '../services/api';
import { offerSlice } from './slices/offer-slice';
import { commentsSlice } from './slices/comments-slice';

export const api = createAPI();
const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [commentsSlice.name]: commentsSlice.reducer,
});

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
