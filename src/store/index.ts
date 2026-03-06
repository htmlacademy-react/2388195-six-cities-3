import {combineReducers, configureStore} from '@reduxjs/toolkit';
import { offersSlice } from './slices/offers-slice';
import {createAPI} from '../services/api';
import { offerSlice } from './slices/offer-slice';
import { commentsSlice } from './slices/comments-slice';
import { userSlice } from './slices/user-slice';

const reducer = combineReducers({
  [offersSlice.name]: offersSlice.reducer,
  [offerSlice.name]: offerSlice.reducer,
  [commentsSlice.name]: commentsSlice.reducer,
  [userSlice.name]: userSlice.reducer,
});

export const api = createAPI();

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }),
});
